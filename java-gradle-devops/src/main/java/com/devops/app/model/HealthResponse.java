package com.devops.app.model;

import java.time.Instant;
import java.util.Map;

public class HealthResponse {
    private String status;
    private String appName;
    private String version;
    private String timestamp;
    private Map<String, Object> systemMetrics;

    public HealthResponse() {
        this.timestamp = Instant.now().toString();
    }

    public HealthResponse(String status, String appName, String version, Map<String, Object> systemMetrics) {
        this.status = status;
        this.appName = appName;
        this.version = version;
        this.timestamp = Instant.now().toString();
        this.systemMetrics = systemMetrics;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public Map<String, Object> getSystemMetrics() {
        return systemMetrics;
    }

    public void setSystemMetrics(Map<String, Object> systemMetrics) {
        this.systemMetrics = systemMetrics;
    }
}
