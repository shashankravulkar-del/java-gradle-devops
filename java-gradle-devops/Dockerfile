# Multi-stage Dockerfile for Java Gradle DevOps Application
# Stage 1: Build the Spring Boot application using Gradle
FROM eclipse-temurin:17-jdk-jammy AS builder

WORKDIR /build

# Copy Gradle wrapper and configuration files first to leverage Docker layer caching
COPY gradlew settings.gradle build.gradle ./
COPY gradle/ ./gradle/

# Ensure the Gradle wrapper has execution permissions
RUN chmod +x gradlew

# Download dependencies (cached layer unless build files change)
RUN ./gradlew dependencies --no-daemon || true

# Copy project source code
COPY src/ ./src/

# Compile, run unit tests, and assemble the executable JAR
RUN ./gradlew bootJar --no-daemon

# ==============================================================================
# Stage 2: Minimal, secure JRE runtime container
# ==============================================================================
FROM eclipse-temurin:17-jre-jammy AS runner

# Create a non-privileged user and group for security
RUN groupadd -r devops && useradd -r -g devops -m -d /app devops

WORKDIR /app

# Install curl/wget for health checking
RUN apt-get update && apt-get install -y --no-install-recommends wget && rm -rf /var/lib/apt/lists/*

# Copy only the compiled fat JAR from the builder stage
COPY --from=builder /build/build/libs/java-gradle-devops-1.0.0.jar ./app.jar

# Enforce secure ownership
RUN chown -R devops:devops /app

# Switch to non-root user
USER devops:devops

# Expose Spring Boot web port
EXPOSE 8080

# Configure health check against the application's /health endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:8080/health || exit 1

# Optimize JVM settings for containerized execution
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -Djava.security.egd=file:/dev/./urandom"

ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]
