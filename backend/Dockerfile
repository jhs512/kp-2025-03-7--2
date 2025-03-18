# 첫 번째 스테이지: 빌드 스테이지
FROM gradle:jdk-21-and-23-graal-jammy AS builder

# 작업 디렉토리 설정
WORKDIR /app

# Gradle 캐시 활용을 위해 Gradle 관련 파일 먼저 복사
COPY settings.gradle.kts build.gradle.kts gradle gradlew ./

# Gradle 실행 권한 부여
RUN chmod +x gradlew

# 종속성만 먼저 다운로드하여 캐싱 유지
RUN ./gradlew build --no-daemon --refresh-dependencies || true

# 소스 코드 복사
COPY src src

# 애플리케이션 빌드 (캐싱된 종속성 활용)
RUN ./gradlew build --no-daemon --offline

# 두 번째 스테이지: 실행 스테이지
FROM container-registry.oracle.com/graalvm/jdk:23

# 작업 디렉토리 설정
WORKDIR /app

# 첫 번째 스테이지에서 빌드된 JAR 파일 복사
COPY --from=builder /app/build/libs/*.jar app.jar

# 실행할 JAR 파일 지정
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "app.jar"]