package com.studenthub;

import com.studenthub.data.consts.GithubAuth;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

//TODO check @component necessary
@Component
@Configuration
public class Config {
    @Autowired
    Logger logger;

    @Bean
    public Logger logger() {
        return LoggerFactory.getLogger("StudentHub");
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplateBuilder().basicAuthentication(GithubAuth.username, GithubAuth.token).build();
    }
}
