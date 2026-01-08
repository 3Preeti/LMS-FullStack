# Use lightweight Java runtime
FROM eclipse-temurin:17-jre

# App directory
WORKDIR /app

# Copy JAR from Maven build
COPY target/*.jar app.jar

# Expose Spring Boot port
EXPOSE 8080
# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]
