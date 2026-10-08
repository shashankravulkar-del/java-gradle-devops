package com.devops.app.controller;

import com.devops.app.model.HealthResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.management.ManagementFactory;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class HealthController {

    private static final Logger logger = LoggerFactory.getLogger(HealthController.class);

    @Value("${spring.application.name:java-gradle-devops}")
    private String appName;

    @Value("${app.version:1.0.0}")
    private String appVersion;

    @GetMapping("/health")
    public ResponseEntity<HealthResponse> getHealth() {
        logger.debug("Health check probe requested");

        Runtime runtime = Runtime.getRuntime();
        long totalMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();
        long usedMemory = totalMemory - freeMemory;
        long maxMemory = runtime.maxMemory();
        long uptimeMs = ManagementFactory.getRuntimeMXBean().getUptime();

        Map<String, Object> metrics = new LinkedHashMap<>();
        metrics.put("status", "UP");
        metrics.put("uptimeSeconds", uptimeMs / 1000);
        metrics.put("availableProcessors", runtime.availableProcessors());
        metrics.put("usedMemoryMB", usedMemory / (1024 * 1024));
        metrics.put("totalMemoryMB", totalMemory / (1024 * 1024));
        metrics.put("maxMemoryMB", maxMemory / (1024 * 1024));

        HealthResponse response = new HealthResponse("UP", appName, appVersion, metrics);
        return ResponseEntity.ok(response);
    }
}
