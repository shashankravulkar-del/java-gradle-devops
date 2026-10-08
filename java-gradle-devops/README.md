# Java Gradle DevOps Application

A production-ready, beginner-friendly DevOps reference application built with Java 17 and Spring Boot 3. It demonstrates industry-standard development and operations practices: automated dependency management with Gradle, robust RESTful APIs with centralized error handling, unit testing with JUnit 5, containerization with Docker multi-stage builds, and continuous integration with GitHub Actions.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technologies](#technologies)
4. [Project Structure](#project-structure)
5. [Understanding Gradle](#understanding-gradle)
   - [What Gradle Is](#what-gradle-is)
   - [How Gradle Dependencies Work](#how-gradle-dependencies-work)
6. [Windows PowerShell Quick Commands](#windows-powershell-quick-commands)
7. [Step-by-Step Developer Guide](#step-by-step-developer-guide)
   - [1. Check Java Environment](#1-check-java-environment)
   - [2. Build using Gradle Wrapper](#2-build-using-gradle-wrapper)
   - [3. Run Tests](#3-run-tests)
   - [4. Start the Application](#4-start-the-application)
   - [5. Test the REST APIs](#5-test-the-rest-apis)
   - [6. Create and Run the Executable JAR](#6-create-and-run-the-executable-jar)
8. [Docker Containerization](#docker-containerization)
   - [Build the Docker Image](#build-the-docker-image)
   - [Run the Docker Container](#run-the-docker-container)
   - [Check Status and Logs](#check-status-and-logs)
   - [Stop and Clean Up](#stop-and-clean-up)
9. [GitHub Actions CI/CD Pipeline](#github-actions-cicd-pipeline)
10. [Common Troubleshooting](#common-troubleshooting)

---

## Project Overview

The **Java Gradle DevOps Application** serves as a clean, self-contained template for modern Java backend deployment workflows. It showcases:
- Clean modular Spring Boot architecture with separation of models, controllers, and exception handlers.
- Safe automated builds via the Gradle Wrapper without needing a global Gradle installation.
- Deterministic container creation with an optimized multi-stage `Dockerfile`.
- Automated build validation and test reporting in GitHub Actions on every commit and pull request.

---

## Architecture

```
                  +----------------------------------------------+
                  |               Developer Machine              |
                  |  - Java 17 / OpenJDK                         |
                  |  - Gradle Wrapper (./gradlew or gradlew.bat) |
                  +-----------------------+----------------------+
                                          |
                git push                  |  ./gradlew bootJar
                   v                      v
    +------------------------------+   +------------------------------+
    |      GitHub Actions CI       |   |       Docker Engine          |
    |  - Checkout repository       |   |  - Stage 1: Build JAR        |
    |  - Setup OpenJDK 17          |   |  - Stage 2: Minimal JRE 17   |
    |  - Run JUnit 5 tests         |   |  - Non-root user execution   |
    |  - Package executable JAR    |   +--------------+---------------+
    |  - Upload test artifacts     |                  |
    +------------------------------+                  v
                                       +------------------------------+
                                       |   Containerized App (:8080)  |
                                       |  - GET /api/hello            |
                                       |  - GET /health               |
                                       +------------------------------+
```

---

## Technologies

- **Java 17 (LTS)**: Core programming language utilizing modern LTS features.
- **Spring Boot 3.3.4**: Framework for REST services, Actuator health endpoints, and JSON serialization.
- **Gradle 8.10.2**: High-performance build tool with incremental execution and dependency cache.
- **JUnit 5 & MockMvc**: Testing engine for unit tests and controller integration tests.
- **Docker**: Multi-stage containerization with Eclipse Temurin JRE base images.
- **GitHub Actions**: Continuous integration workflow validating code quality, compilation, and tests.

---

## Project Structure

```
java-gradle-devops/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── devops/
│   │   │           └── app/
│   │   │               ├── Application.java
│   │   │               ├── controller/
│   │   │               │   ├── HelloController.java
│   │   │               │   └── HealthController.java
│   │   │               ├── model/
│   │   │               │   ├── ApiResponse.java
│   │   │               │   └── HealthResponse.java
│   │   │               └── exception/
│   │   │                   └── GlobalExceptionHandler.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/
│           └── com/
│               └── devops/
│                   └── app/
│                       ├── ApplicationTests.java
│                       ├── HelloControllerTest.java
│                       └── HealthControllerTest.java
├── gradle/
│   └── wrapper/
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── .github/
│   └── workflows/
│       └── build.yml
├── Dockerfile
├── .dockerignore
├── build.gradle
├── settings.gradle
├── gradlew
├── gradlew.bat
├── .gitignore
└── README.md
```

---

## Understanding Gradle

### What Gradle Is
Gradle is a modern, extensible build automation tool designed for multi-language software development. Unlike legacy build tools, Gradle uses a directed acyclic graph (DAG) to determine task execution order. It supports incremental builds: if inputs and outputs of a task have not changed, Gradle skips the task with `UP-TO-DATE`, dramatically speeding up build cycles.

The **Gradle Wrapper** (`gradlew` and `gradlew.bat`) bundles a small launcher that downloads the exact specified Gradle version automatically. Developers and CI pipelines do not need Gradle pre-installed on their machines.

### How Gradle Dependencies Work
Dependencies are declared in `build.gradle` within the `dependencies { ... }` block:
- **`implementation`**: Libraries required to compile and run the application (e.g., `spring-boot-starter-web`). They are not exposed to downstream consumers.
- **`testImplementation`**: Libraries only needed during test compilation and execution (e.g., `spring-boot-starter-test`).
- **`repositories`**: Instructs Gradle where to resolve binary artifacts, such as `mavenCentral()`.

When you run a build, Gradle resolves transitive dependencies, verifies checksums, and caches them in your local user directory (`~/.gradle/caches`).

---

## Windows PowerShell Quick Commands

Here is the exact reference list of commands for Windows PowerShell:

### 1. Check Java
```powershell
java -version
```

### 2. Build using Gradle Wrapper
```powershell
.\gradlew.bat build
```

### 3. Run tests
```powershell
.\gradlew.bat test
```

### 4. Start the application
```powershell
.\gradlew.bat bootRun
```

### 5. Test the API
```powershell
# Test greeting endpoint
Invoke-RestMethod -Uri "http://localhost:8080/api/hello?name=Developer"

# Test health check endpoint
Invoke-RestMethod -Uri "http://localhost:8080/health"
```

### 6. Create the JAR
```powershell
.\gradlew.bat bootJar
```

### 7. Run the JAR
```powershell
java -jar build/libs/java-gradle-devops-1.0.0.jar
```

### 8. Build Docker image
```powershell
docker build -t java-gradle-devops:latest .
```

### 9. Run Docker container
```powershell
docker run -d --name java-devops-container -p 8080:8080 java-gradle-devops:latest
```

### 10. Check Docker status
```powershell
docker ps --filter "name=java-devops-container"
```

### 11. View Docker logs
```powershell
docker logs -f java-devops-container
```

### 12. Stop the container
```powershell
docker stop java-devops-container
docker rm java-devops-container
```

---

## Step-by-Step Developer Guide

### 1. Check Java Environment
Ensure JDK 17 or higher is installed and present in your system PATH:
```bash
# On Linux/macOS
java -version

# On Windows PowerShell
java -version
```
Expected output:
```
openjdk version "17.0.x" ...
OpenJDK Runtime Environment ...
```

### 2. Build using Gradle Wrapper
Compile classes and execute all verification checks:
```bash
# Linux/macOS
./gradlew build

# Windows PowerShell
.\gradlew.bat build
```

### 3. Run Tests
Execute the JUnit 5 test suite:
```bash
# Linux/macOS
./gradlew test

# Windows PowerShell
.\gradlew.bat test
```
HTML test reports will be generated at:
`build/reports/tests/test/index.html`

### 4. Start the Application
Run the embedded Tomcat server on port 8080:
```bash
# Linux/macOS
./gradlew bootRun

# Windows PowerShell
.\gradlew.bat bootRun
```

### 5. Test the REST APIs
Open a separate terminal or web browser:

#### Greeting Endpoint (`GET /api/hello`)
```bash
curl -X GET "http://localhost:8080/api/hello?name=DevOps"
```
Response:
```json
{
  "message": "Hello, DevOps! Welcome to the Java Gradle DevOps Application.",
  "status": "SUCCESS",
  "timestamp": "2026-10-08T12:00:00.000Z",
  "environment": "production",
  "version": "1.0.0"
}
```

#### Health Status Endpoint (`GET /health`)
```bash
curl -X GET "http://localhost:8080/health"
```
Response:
```json
{
  "status": "UP",
  "appName": "java-gradle-devops",
  "version": "1.0.0",
  "timestamp": "2026-10-08T12:00:00.000Z",
  "systemMetrics": {
    "status": "UP",
    "uptimeSeconds": 42,
    "availableProcessors": 8,
    "usedMemoryMB": 64,
    "totalMemoryMB": 128,
    "maxMemoryMB": 2048
  }
}
```

### 6. Create and Run the Executable JAR
To produce an executable fat JAR with all runtime dependencies packaged inside:
```bash
# Linux/macOS
./gradlew bootJar

# Windows PowerShell
.\gradlew.bat bootJar
```
Run the JAR directly:
```bash
java -jar build/libs/java-gradle-devops-1.0.0.jar
```

---

## Docker Containerization

The repository includes a multi-stage `Dockerfile`:
- **Stage 1 (Builder)**: Uses `eclipse-temurin:17-jdk-jammy` to compile the app and generate the bootable JAR.
- **Stage 2 (Runner)**: Uses minimal `eclipse-temurin:17-jre-jammy`, drops root privileges to user `devops`, and configures automatic health probing.

### Build the Docker Image
```bash
docker build -t java-gradle-devops:latest .
```

### Run the Docker Container
```bash
docker run -d --name java-devops-container -p 8080:8080 java-gradle-devops:latest
```

### Check Status and Logs
```bash
# Check if container is running and healthy
docker ps

# Stream application logs
docker logs -f java-devops-container
```

### Stop and Clean Up
```bash
docker stop java-devops-container
docker rm java-devops-container
```

---

## GitHub Actions CI/CD Pipeline

The workflow defined in `.github/workflows/build.yml` runs on every `push` and `pull_request` to `main`:
1. **Checkout**: Retrieves source code using `actions/checkout@v4`.
2. **Setup JDK**: Installs Eclipse Temurin JDK 17 and enables automatic Gradle caching via `actions/setup-java@v4`.
3. **Wrapper Validation**: Verifies that `gradle-wrapper.jar` matches official Gradle checksums.
4. **Execute Tests**: Runs `./gradlew test --no-daemon` and uploads JUnit reports.
5. **Assemble Boot JAR**: Packages the production application artifact.
6. **Container Verification**: Validates Docker image build integrity via `docker/build-push-action@v5`.

---

## Common Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| `JAVA_HOME is not set` | Missing or unconfigured JDK path | Install JDK 17 and set the `JAVA_HOME` environment variable to your JDK directory. |
| `Permission denied: ./gradlew` | Execute permission bit missing on Unix | Run `chmod +x gradlew` before executing. |
| `Port 8080 already in use` | Another service is using port 8080 | Stop the conflicting process, or set `server.port=8081` in `application.properties`. |
| `Docker daemon not running` | Docker Desktop is closed | Start Docker Desktop or enable the systemd `docker` service. |
