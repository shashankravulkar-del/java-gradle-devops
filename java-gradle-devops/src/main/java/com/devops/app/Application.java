package com.devops.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        logger.info("Initializing Java Gradle DevOps Application...");
        SpringApplication.run(Application.class, args);
        logger.info("Java Gradle DevOps Application started successfully on port 8080");
    }
}
