package com.devops.app.controller;

import com.devops.app.model.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    private static final Logger logger = LoggerFactory.getLogger(HelloController.class);

    @Value("${app.version:1.0.0}")
    private String appVersion;

    @Value("${app.environment:development}")
    private String appEnvironment;

    @GetMapping("/api/hello")
    public ResponseEntity<ApiResponse> getHello(
            @RequestParam(value = "name", defaultValue = "World") String name) {
        logger.info("Handling GET /api/hello request for name: {}", name);
        String greeting = "Hello, " + name + "! Welcome to the Java Gradle DevOps Application.";
        ApiResponse response = new ApiResponse(greeting, "SUCCESS", appEnvironment, appVersion);
        return ResponseEntity.ok(response);
    }
}
