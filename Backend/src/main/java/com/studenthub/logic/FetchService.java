package com.studenthub.logic;

import com.studenthub.models.EncodedBlob;
import com.studenthub.models.File;
import com.studenthub.data.repositories.FileRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

@Service
public class FetchService {
    private final Logger logger;
    private final FileRepository fileRepository;
    private final RestTemplate restTemplate;
    private final DecodeService decodeService;
    private final ArrayList<File> fetchBuffer;

    //TODO remove
    private int kill;

    @Autowired
    FetchService(FileRepository fileRepository, DecodeService decodeService, RestTemplate restTemplate, Logger logger) {
        this.fileRepository = fileRepository;
        this.restTemplate = restTemplate;
        this.logger = logger;
        this.decodeService = decodeService;
        this.fetchBuffer = new ArrayList<>();
    }

    private EncodedBlob fetchBlob(String url) {
        return restTemplate.getForObject(url, EncodedBlob.class);
    }

    private void initBlob(File leaf, String path) {
        EncodedBlob encodedBlob = fetchBlob(leaf.getUrl());
            try {
                leaf.setData(decodeService.decodeBlob(encodedBlob));
            } catch (UnsupportedEncodingException e) {
                logger.warn("Unsupported encoding", e);
            }
            leaf.setRealPath(path + leaf.getName());
    }

    public ArrayList<File> getFetchBuffer() {
        return fetchBuffer;
    }

    public void fetchFileTree(String sha, String path) throws FileNotFoundException {
        File file = restTemplate.getForObject("https://api.github.com/repos/LoweloDev/University/git/trees/" + sha, File.class);

        if(file == null) throw new FileNotFoundException();

        String treeReferenceID = file.getSha();

        file.getTree().forEach( arm -> {
            arm.setTreeReferenceId(treeReferenceID);

            if(arm.getType().equals("tree")) {
                arm.setRealPath(path + arm.getName() + "/");
            } else {
                initBlob(arm, path);
            }

            fetchBuffer.add(arm);

            if (arm.getType().equals("tree")) {
                try {
                    //TODO remove
                    if(kill == 10) return;
                    kill++;
                    //
                    fetchFileTree(arm.getSha(), arm.getRealPath());
                } catch (FileNotFoundException e) {
                    logger.warn("File not found", e);
                }
            }
        });
    }
}
