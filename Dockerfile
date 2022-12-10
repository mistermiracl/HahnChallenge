FROM openjdk:19-jdk-alpine as builder

RUN apk add --update nodejs npm

WORKDIR /opt/build/front
COPY front/package.json ./
COPY front/package-lock.json ./
RUN npm ci
COPY front/src src
COPY front/index.html ./
COPY front/postcss.config.cjs ./
COPY front/tailwind.config.cjs ./
COPY front/tsconfig.json ./
COPY front/tsconfig.node.json ./
COPY front/vite.config.ts ./
# RUN npm run build -- --outDir ../back/src/main/resources/static/
ARG API_URL
ENV VITE_API_URL=$API_URL
RUN npm run build

WORKDIR /opt/build/back
COPY back/pom.xml ./
COPY back/.mvn .mvn
COPY back/mvnw ./
RUN ./mvnw clean verify --fail-never
COPY back/src src
RUN cp -r /opt/build/front/dist/. /opt/build/back/src/main/resources/static/
RUN ./mvnw clean package

FROM openjdk:19-jdk-alpine AS runner

WORKDIR /opt/app
COPY --from=builder /opt/build/back/target/hahn-challenge-0.0.1-SNAPSHOT.jar ./hahn-challenge.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "hahn-challenge.jar"]