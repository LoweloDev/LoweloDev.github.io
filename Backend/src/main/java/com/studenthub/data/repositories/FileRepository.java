package com.studenthub.data.repositories;

import com.studenthub.models.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    List<File> getFileByTreeReferenceIdOrderById(String referenceID);
    List<File> findFileByTreeReferenceIdOrderById(String referenceID);
}
