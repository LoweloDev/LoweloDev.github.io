package com.studenthub;

import com.studenthub.data.repositories.FileRepository;
import com.studenthub.logic.ZipService;
import com.studenthub.models.File;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.util.List;
import java.util.zip.ZipOutputStream;


@RestController
public class FileController {
    // TODO Learn outputstreams
    private final FileRepository fileRepository;
    private final Logger logger;
    private final ZipService zipService;

    @Autowired
    FileController(FileRepository fileRepository, Logger logger, ZipService zipService) {
        this.fileRepository = fileRepository;
        this.logger = logger;
        this.zipService = zipService;
    }

    @GetMapping("/tree/{treeReferenceId}")
    List<File> getFilesByTree(@PathVariable String treeReferenceId){
        return fileRepository.getFileByTreeReferenceIdOrderById(treeReferenceId);
    }

    @GetMapping(value = "/file/{id}")
    ResponseEntity<byte[]> downloadFile(@PathVariable long id) throws FileNotFoundException {
        File file = fileRepository.findById(id).orElse(null);
        if(file == null) throw new FileNotFoundException();

        // TODO Learn about Response Entity and http headers
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName())
                .body(file.getData());
    }

    @GetMapping(value = "/files/{treeReferenceId}")
    ResponseEntity<byte[]> downloadFilesByTree(@PathVariable String treeReferenceId) {
        ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
        BufferedOutputStream buffOut = new BufferedOutputStream(byteOut);
        ZipOutputStream zipOut = new ZipOutputStream(buffOut);

        try {
            zipService.zipTree(zipOut, treeReferenceId);
            zipOut.close();
        } catch (IOException e) {
            logger.warn("IO Exception", e);
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "download.zip")
                .body(byteOut.toByteArray());
    }
}

