FROM adoptopenjdk/openjdk11:jre-11.0.6_10-alpine

WORKDIR /app

COPY ./target/eureka-service-0.0.1-SNAPSHOT.jar .

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "eureka-service-0.0.1-SNAPSHOT.jar"]