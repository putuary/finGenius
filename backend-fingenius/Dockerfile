FROM maven:3.8.8 AS build

ARG APP_PORT=8081
ARG HOST_DB=db
ARG PORT_DB=5432
ARG DB_NAME=fingenius_db
ARG USERNAME_DB=postgres
ARG PASSWORD_DB=postgres

WORKDIR /app

LABEL version="0.0.1-SNAPSHOT"

COPY pom.xml .

COPY src ./src

RUN mvn clean package -DskipTests \
  -DAPP_PORT=${APP_PORT} \
  -DHOST_DB=${HOST_DB} \
  -DPORT_DB=${PORT_DB} \
  -DDB_NAME=${DB_NAME} \
  -DUSERNAME_DB=${USERNAME_DB} \
  -DPASSWORD_DB=${PASSWORD_DB}

FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY --from=build /app/target/starter-0.0.1-SNAPSHOT.jar ./starter-0.0.1-SNAPSHOT.jar

CMD [ "java", "-jar", "./starter-0.0.1-SNAPSHOT.jar" ]

EXPOSE 8081
