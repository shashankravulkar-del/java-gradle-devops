package com.devops.app.model;

import java.time.Instant;

public class ApiResponse {
    private String message;
    private String status;
    private String timestamp;
    private String environment;
    private String version;

    public ApiResponse() {
        this.timestamp = Instant.now().toString();
    }

    public ApiResponse(String message, String status, String environment, String version) {
        this.message = message;
        this.status = status;
        this.timestamp = Instant.now().toString();
        this.environment = environment;
        this.version = version;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
