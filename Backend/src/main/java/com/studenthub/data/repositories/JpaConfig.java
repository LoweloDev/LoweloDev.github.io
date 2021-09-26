package com.studenthub.data.repositories;

import com.studenthub.logic.FetchService;
import com.studenthub.logic.tasks.FetchTask;
import com.studenthub.logic.IFetchService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.io.FileNotFoundException;

@Configuration
@EnableJpaRepositories(basePackages = "com.studenthub.data.repositories")
public class JpaConfig {
    @Autowired
    FetchService fetchService;
    @Autowired
    Logger logger;
    @Autowired
    FileRepository fileRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void initDatabase() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.initialize();
        new FetchTask(executor).executeTask(new IFetchService() {
            @Override
            public void fetch() {
                try {
                    fetchService.fetchFileTree("971d844519b800f2b3e5a2474551c39806e82168", "");
                    fileRepository.saveAll(fetchService.getFetchBuffer());
                } catch (FileNotFoundException e) {
                    logger.warn("File not found", e);
                }
            }
        });
    }
}
