package com.studenthub.logic;

import com.studenthub.data.repositories.FileRepository;
import com.studenthub.models.File;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class ZipService {
    private final FileRepository fileRepository;

    @Autowired
    ZipService(FileRepository fileRepository, Logger logger) {
        this.fileRepository = fileRepository;
    }

    public void zipTree(ZipOutputStream zipOut, String treeReferenceId) throws IOException {
        List<File> files = fileRepository.findFileByTreeReferenceIdOrderById(treeReferenceId);
        for (File file : files) {
                ZipEntry entry = new ZipEntry(file.getRealPath());
                zipOut.putNextEntry(entry);
                if(file.getType().equals("tree")) {
                    zipOut.closeEntry();
                    zipTree(zipOut, file.getSha());
                }
                if(!file.getType().equals("tree")) {
                    entry.setSize(file.getData().length);
                    zipOut.write(file.getData());
                    zipOut.closeEntry();
                }
        }
    }
}
