-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lms
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assignment_history`
--

DROP TABLE IF EXISTS `assignment_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment_history` (
  `assignment_history_id` bigint NOT NULL AUTO_INCREMENT,
  `exam_completion_status` bit(1) DEFAULT NULL,
  `score` int DEFAULT NULL,
  `submission_time` datetime(6) DEFAULT NULL,
  `assignment_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`assignment_history_id`),
  KEY `FKdw9lk13y01y5x4uxnx8tpff0d` (`assignment_id`),
  KEY `FK9ja035yxv95nnw5t65rhelskx` (`member_id`),
  CONSTRAINT `FK9ja035yxv95nnw5t65rhelskx` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKdw9lk13y01y5x4uxnx8tpff0d` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`assignment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment_history`
--

LOCK TABLES `assignment_history` WRITE;
/*!40000 ALTER TABLE `assignment_history` DISABLE KEYS */;
INSERT INTO `assignment_history` VALUES (1,_binary '\0',55,'2024-01-04 08:00:00.000000',1,1);
/*!40000 ALTER TABLE `assignment_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignment_results`
--

DROP TABLE IF EXISTS `assignment_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment_results` (
  `assignment_result_id` bigint NOT NULL AUTO_INCREMENT,
  `correct_answer` varchar(255) DEFAULT NULL,
  `is_correct` bit(1) DEFAULT NULL,
  `submission_time` datetime(6) DEFAULT NULL,
  `submitted_answer` varchar(255) DEFAULT NULL,
  `wrong_ans_expl` varchar(255) DEFAULT NULL,
  `assignment_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`assignment_result_id`),
  KEY `FKq94b2bpplwj24ft0l1wmh1hyl` (`assignment_id`),
  KEY `FKpqmg3xhno75gmxtet42ku61f2` (`member_id`),
  CONSTRAINT `FKpqmg3xhno75gmxtet42ku61f2` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKq94b2bpplwj24ft0l1wmh1hyl` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`assignment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment_results`
--

LOCK TABLES `assignment_results` WRITE;
/*!40000 ALTER TABLE `assignment_results` DISABLE KEYS */;
INSERT INTO `assignment_results` VALUES (1,'test',_binary '\0','2024-01-04 08:00:00.000000','test','test',1,1);
/*!40000 ALTER TABLE `assignment_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignments`
--

DROP TABLE IF EXISTS `assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignments` (
  `assignment_id` bigint NOT NULL AUTO_INCREMENT,
  `assignment_title` varchar(200) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `due_date` datetime(6) NOT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `content_id` bigint DEFAULT NULL,
  `passing_score` int NOT NULL,
  PRIMARY KEY (`assignment_id`),
  KEY `FK6gmtw9veb1p14acuq9esy50k8` (`content_id`),
  CONSTRAINT `FK6gmtw9veb1p14acuq9esy50k8` FOREIGN KEY (`content_id`) REFERENCES `contents` (`content_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignments`
--

LOCK TABLES `assignments` WRITE;
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
INSERT INTO `assignments` VALUES (1,'240104TOEIC','helloworld','2024-01-04 08:00:00.000000',_binary '\0',1,60);
/*!40000 ALTER TABLE `assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `benefits`
--

DROP TABLE IF EXISTS `benefits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `benefits` (
  `benefit_id` bigint NOT NULL AUTO_INCREMENT,
  `completion` enum('COURSE_COMPLETION','EXAM_COMPLETION') DEFAULT NULL,
  `coupon_code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `expiration_date` datetime(6) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  PRIMARY KEY (`benefit_id`),
  KEY `FK79a07hf7qj2yxvichy8bnxcaq` (`course_id`),
  CONSTRAINT `FK79a07hf7qj2yxvichy8bnxcaq` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benefits`
--

LOCK TABLES `benefits` WRITE;
/*!40000 ALTER TABLE `benefits` DISABLE KEYS */;
INSERT INTO `benefits` VALUES (1,'COURSE_COMPLETION','d234s5k3f','description','2023-12-28 08:00:00.000000',_binary '\0',6);
/*!40000 ALTER TABLE `benefits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_id` bigint NOT NULL AUTO_INCREMENT,
  `author_name` varchar(255) DEFAULT NULL,
  `book_thumnail` varchar(255) DEFAULT NULL,
  `book_title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isbn` varchar(255) DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  PRIMARY KEY (`book_id`),
  KEY `FKqt8ahb820calhgdenuh25ajm2` (`course_id`),
  CONSTRAINT `FKqt8ahb820calhgdenuh25ajm2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'author','url','Toeic800','description','isbn','2024-01-05','publisher',6);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `cart_id` bigint NOT NULL AUTO_INCREMENT,
  `create_date` datetime(6) DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  `quanity` int NOT NULL,
  `course_id` bigint DEFAULT NULL,
  `total_price` int NOT NULL,
  `total_quanity` int NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `FKr82uc2e12g45wtitmrq51wsmy` (`member_id`),
  KEY `FKm17vvrdg59e9or41oe43p0ph7` (`course_id`),
  CONSTRAINT `FKm17vvrdg59e9or41oe43p0ph7` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  CONSTRAINT `FKr82uc2e12g45wtitmrq51wsmy` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contents`
--

DROP TABLE IF EXISTS `contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contents` (
  `content_id` bigint NOT NULL AUTO_INCREMENT,
  `content_data` varchar(255) DEFAULT NULL,
  `content_type` varchar(50) NOT NULL,
  `course_id` bigint NOT NULL,
  `content_title` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`content_id`),
  KEY `FK26ra050idh8wetyhulbictirv` (`course_id`),
  CONSTRAINT `FK26ra050idh8wetyhulbictirv` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contents`
--

LOCK TABLES `contents` WRITE;
/*!40000 ALTER TABLE `contents` DISABLE KEYS */;
INSERT INTO `contents` VALUES (1,'testString','video',2,'','');
/*!40000 ALTER TABLE `contents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_history`
--

DROP TABLE IF EXISTS `course_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_history` (
  `course_history_id` bigint NOT NULL AUTO_INCREMENT,
  `start_date` datetime(6) DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`course_history_id`),
  KEY `FKxce0gxyb0ouqgs5ydokexl7w` (`course_id`),
  KEY `FKfmrhqu7xt09nelubfh62m97j0` (`member_id`),
  CONSTRAINT `FKfmrhqu7xt09nelubfh62m97j0` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKxce0gxyb0ouqgs5ydokexl7w` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_history`
--

LOCK TABLES `course_history` WRITE;
/*!40000 ALTER TABLE `course_history` DISABLE KEYS */;
INSERT INTO `course_history` VALUES (1,'2023-12-28 15:30:00.000000',NULL,NULL),(2,'2023-12-28 15:30:00.000000',NULL,NULL),(3,'2023-12-28 15:30:00.000000',2,1),(4,'2023-12-29 15:30:00.000000',2,1),(5,'2023-12-25 15:30:00.000000',NULL,NULL),(6,'2023-12-25 15:30:00.000000',NULL,NULL),(7,'2023-12-25 15:30:00.000000',NULL,NULL),(8,'2023-12-25 15:30:00.000000',NULL,NULL),(9,'2023-12-25 15:30:00.000000',NULL,NULL),(10,'2023-12-25 15:30:00.000000',2,1);
/*!40000 ALTER TABLE `course_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_reviews`
--

DROP TABLE IF EXISTS `course_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_reviews` (
  `review_id` bigint NOT NULL AUTO_INCREMENT,
  `comment` varchar(2000) DEFAULT NULL,
  `rating` int NOT NULL,
  `review_date` datetime(6) NOT NULL,
  `course_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `FKlrpaadw9mi16mpm88uum9bdhm` (`member_id`),
  KEY `FK799g8dfcye3g51ru63bfdhyb1` (`course_id`),
  CONSTRAINT `FK799g8dfcye3g51ru63bfdhyb1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  CONSTRAINT `FKlrpaadw9mi16mpm88uum9bdhm` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_reviews`
--

LOCK TABLES `course_reviews` WRITE;
/*!40000 ALTER TABLE `course_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `course_id` bigint NOT NULL AUTO_INCREMENT,
  `course_name` varchar(500) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `duration_mins` int NOT NULL,
  `end_date` date NOT NULL,
  `start_date` date NOT NULL,
  `content_level` varchar(255) NOT NULL,
  `course_thumbnail` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `subject_id` bigint DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `FK5tckdihu5akp5nkxiacx1gfhi` (`subject_id`),
  CONSTRAINT `FK5tckdihu5akp5nkxiacx1gfhi` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (2,'english','helloworld',60,'2023-12-28','2023-12-28','','',0,NULL),(3,'english','helloworld',60,'2023-12-28','2023-12-28','','',0,NULL),(4,'english','helloworld',60,'2023-12-28','2023-12-28','','',0,NULL),(5,'english','helloworld',60,'2023-12-28','2023-12-28','','',0,NULL),(6,'english','helloworld',60,'2023-12-28','2023-12-28','600','url',10000,1);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_history`
--

DROP TABLE IF EXISTS `exam_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_history` (
  `exam_history_id` bigint NOT NULL AUTO_INCREMENT,
  `exam_completion_status` bit(1) DEFAULT NULL,
  `exam_submission_time` datetime(6) DEFAULT NULL,
  `score` int DEFAULT NULL,
  `exam_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`exam_history_id`),
  KEY `FK1uur8qwrxn80nhe5v63phkwf6` (`exam_id`),
  KEY `FKp7pbhtcgx7ejm733vydwilsrs` (`member_id`),
  CONSTRAINT `FK1uur8qwrxn80nhe5v63phkwf6` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`),
  CONSTRAINT `FKp7pbhtcgx7ejm733vydwilsrs` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_history`
--

LOCK TABLES `exam_history` WRITE;
/*!40000 ALTER TABLE `exam_history` DISABLE KEYS */;
INSERT INTO `exam_history` VALUES (1,_binary '','2024-01-05 08:00:00.000000',80,1,1);
/*!40000 ALTER TABLE `exam_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_results`
--

DROP TABLE IF EXISTS `exam_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_results` (
  `exam_result_id` bigint NOT NULL AUTO_INCREMENT,
  `correct_answer` varchar(255) DEFAULT NULL,
  `is_correct` bit(1) DEFAULT NULL,
  `subminssion_time` datetime(6) DEFAULT NULL,
  `submitted_answer` varchar(255) DEFAULT NULL,
  `wrong_ans_expl` varchar(255) DEFAULT NULL,
  `exam_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  `submission_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`exam_result_id`),
  KEY `FKtf85ht7yquiorwjx2xbdx3fxw` (`exam_id`),
  KEY `FK8doilcruh6jchd3nhodr7kaix` (`member_id`),
  CONSTRAINT `FK8doilcruh6jchd3nhodr7kaix` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKtf85ht7yquiorwjx2xbdx3fxw` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_results`
--

LOCK TABLES `exam_results` WRITE;
/*!40000 ALTER TABLE `exam_results` DISABLE KEYS */;
INSERT INTO `exam_results` VALUES (1,NULL,_binary '\0',NULL,NULL,'틀린 문제 설명',1,1,NULL),(2,'정답 답안',_binary '\0',NULL,'제출 답안','틀린 문제 설명',1,1,NULL),(3,'정답 답안',_binary '\0',NULL,'제출 답안','틀린 문제 설명',1,1,'2024-01-05 08:00:00.000000');
/*!40000 ALTER TABLE `exam_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exams`
--

DROP TABLE IF EXISTS `exams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exams` (
  `exam_id` bigint NOT NULL AUTO_INCREMENT,
  `duration_mins` int NOT NULL,
  `exam_date` datetime(6) NOT NULL,
  `exam_is_active` bit(1) DEFAULT NULL,
  `num_questions` int NOT NULL,
  `passing_score` int NOT NULL,
  `content_id` bigint NOT NULL,
  `correct_ans` varchar(255) NOT NULL,
  PRIMARY KEY (`exam_id`),
  KEY `FKaqugi5glqghsa5q91c8utngpp` (`content_id`),
  CONSTRAINT `FKaqugi5glqghsa5q91c8utngpp` FOREIGN KEY (`content_id`) REFERENCES `contents` (`content_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exams`
--

LOCK TABLES `exams` WRITE;
/*!40000 ALTER TABLE `exams` DISABLE KEYS */;
INSERT INTO `exams` VALUES (1,60,'2024-01-05 08:00:00.000000',_binary '\0',25,70,1,'정답 답안');
/*!40000 ALTER TABLE `exams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_history`
--

DROP TABLE IF EXISTS `login_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_history` (
  `log_id` bigint NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(50) NOT NULL,
  `login_time` datetime(6) NOT NULL,
  `member_id` bigint NOT NULL,
  `status` bit(1) NOT NULL,
  PRIMARY KEY (`log_id`),
  KEY `FKq2swtm0wd8kuwki103rgvmh6t` (`member_id`),
  CONSTRAINT `FKq2swtm0wd8kuwki103rgvmh6t` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_history`
--

LOCK TABLES `login_history` WRITE;
/*!40000 ALTER TABLE `login_history` DISABLE KEYS */;
INSERT INTO `login_history` VALUES (1,'ipAddress','2024-01-05 08:00:00.000000',1,_binary '');
/*!40000 ALTER TABLE `login_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_benefits`
--

DROP TABLE IF EXISTS `member_benefits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_benefits` (
  `member_benefit_id` bigint NOT NULL AUTO_INCREMENT,
  `date_received` datetime(6) DEFAULT NULL,
  `is_used` bit(1) DEFAULT NULL,
  `benefit_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`member_benefit_id`),
  KEY `FK9lk5tlv91vqb2r5ytsujhniku` (`benefit_id`),
  KEY `FKrs2k3s7djqqdkwv3dv42am6hb` (`member_id`),
  CONSTRAINT `FK9lk5tlv91vqb2r5ytsujhniku` FOREIGN KEY (`benefit_id`) REFERENCES `benefits` (`benefit_id`),
  CONSTRAINT `FKrs2k3s7djqqdkwv3dv42am6hb` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_benefits`
--

LOCK TABLES `member_benefits` WRITE;
/*!40000 ALTER TABLE `member_benefits` DISABLE KEYS */;
INSERT INTO `member_benefits` VALUES (1,'2024-01-05 08:00:00.000000',_binary '\0',1,1);
/*!40000 ALTER TABLE `member_benefits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `birth_date` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `gender` enum('MAN','WOMAN') NOT NULL,
  `is_active` bit(1) NOT NULL,
  `join_date` datetime(6) DEFAULT NULL,
  `login_id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `nationality` enum('Domestic','Foreigner') NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_num` varchar(20) NOT NULL,
  `role_id` bigint DEFAULT NULL,
  `activated` bit(1) DEFAULT NULL,
  `membership_id` bigint DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `uk_member_loginId` (`login_id`),
  UNIQUE KEY `uk_member_email` (`email`),
  UNIQUE KEY `uk_member_phoneNum` (`phone_num`),
  UNIQUE KEY `UK_n1pu1gnljn8tgf3jexfuafmea` (`membership_id`),
  KEY `FKcwm27b0f1gqp3bcvq1d0muqtk` (`role_id`),
  CONSTRAINT `FKcwm27b0f1gqp3bcvq1d0muqtk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'1990-05-15','johndoe@example.com','MAN',_binary '','2023-12-28 08:00:00.000000','user123','John Doe','Foreigner','password123','1234567890',NULL,NULL,NULL),(4,'1990-05-15','johndoe1@example.com','MAN',_binary '\0','2023-12-28 08:00:00.000000','test123','John Doed','Foreigner','password1234','1234567230',NULL,NULL,NULL),(7,'1996-09-07','ghkt2535@example.com','WOMAN',_binary '\0',NULL,'ghkt2535','Kim dahye','Domestic','dusek5381!','01024166504',NULL,NULL,NULL),(8,'1996-09-07','ghkt2511@example.com','WOMAN',_binary '\0',NULL,'ghkt44','Kim dahye','Domestic','dusek5382!','01024166511',NULL,NULL,NULL),(9,'1996-09-07','ghkt2211@example.com','WOMAN',_binary '\0',NULL,'ghkt4455','Kim dahye','Domestic','dusek5382!','01024122511',NULL,NULL,NULL),(11,'1996-09-07','ghkt3211@example.com','WOMAN',_binary '\0',NULL,'ghkt4355','Kim dahye','Domestic','dusek5382!','01024122513',NULL,NULL,NULL);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members_group`
--

DROP TABLE IF EXISTS `members_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members_group` (
  `group_id` bigint NOT NULL AUTO_INCREMENT,
  `description` text,
  `group_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `UK_gid8hsmgfxjb32ns6hsqybo27` (`group_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members_group`
--

LOCK TABLES `members_group` WRITE;
/*!40000 ALTER TABLE `members_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `members_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `order_detail_id` bigint NOT NULL AUTO_INCREMENT,
  `price` decimal(38,2) NOT NULL,
  `quantity` int NOT NULL,
  `course_id` bigint DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  PRIMARY KEY (`order_detail_id`),
  KEY `FKtc2uxybe6r9ak6sd66whjd27` (`course_id`),
  KEY `FKjyu2qbqt8gnvno9oe9j2s2ldk` (`order_id`),
  CONSTRAINT `FKjyu2qbqt8gnvno9oe9j2s2ldk` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `FKtc2uxybe6r9ak6sd66whjd27` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `order_date` datetime(6) NOT NULL,
  `status` varchar(255) NOT NULL,
  `total_amount` decimal(38,2) NOT NULL,
  `member_id` bigint DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `delivery_message` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `phone_num` varchar(255) NOT NULL,
  `recipient` varchar(255) NOT NULL,
  `payment_date` datetime(6) NOT NULL,
  `payment_status` bit(1) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK2vq7lo4gkknrmghj3rqpqqg6s` (`member_id`),
  CONSTRAINT `FK2vq7lo4gkknrmghj3rqpqqg6s` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qna_board`
--

DROP TABLE IF EXISTS `qna_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qna_board` (
  `qna_board_id` bigint NOT NULL AUTO_INCREMENT,
  `content` text,
  `created_at` datetime(6) NOT NULL,
  `description` text,
  `title` varchar(200) NOT NULL,
  `course_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`qna_board_id`),
  KEY `FKlwkn03noudiqds4i8v8ohmoqr` (`course_id`),
  KEY `FK55pw91v2ctmq6ecm2o7d4iopa` (`member_id`),
  CONSTRAINT `FK55pw91v2ctmq6ecm2o7d4iopa` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKlwkn03noudiqds4i8v8ohmoqr` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qna_board`
--

LOCK TABLES `qna_board` WRITE;
/*!40000 ALTER TABLE `qna_board` DISABLE KEYS */;
/*!40000 ALTER TABLE `qna_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qna_board_reviews`
--

DROP TABLE IF EXISTS `qna_board_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qna_board_reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` text,
  `created_at` datetime(6) DEFAULT NULL,
  `member_id` bigint NOT NULL,
  `qna_board_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsk8xaomq67wsmxrxh8gkl4m87` (`member_id`),
  KEY `FKk1t6lb9bdi4jf3jtc35jfphal` (`qna_board_id`),
  CONSTRAINT `FKk1t6lb9bdi4jf3jtc35jfphal` FOREIGN KEY (`qna_board_id`) REFERENCES `qna_board` (`qna_board_id`),
  CONSTRAINT `FKsk8xaomq67wsmxrxh8gkl4m87` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qna_board_reviews`
--

LOCK TABLES `qna_board_reviews` WRITE;
/*!40000 ALTER TABLE `qna_board_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `qna_board_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` bigint NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `uk_role_role_name` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `subject_id` bigint NOT NULL AUTO_INCREMENT,
  `description` text,
  `subject_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'description','Toeic');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdrawal`
--

DROP TABLE IF EXISTS `withdrawal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `withdrawal` (
  `withdrawal_id` bigint NOT NULL AUTO_INCREMENT,
  `reason` varchar(255) DEFAULT NULL,
  `withdrawal_time` datetime(6) NOT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`withdrawal_id`),
  KEY `FKjy0789uood48lwb0ocetjcvha` (`member_id`),
  CONSTRAINT `FKjy0789uood48lwb0ocetjcvha` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdrawal`
--

LOCK TABLES `withdrawal` WRITE;
/*!40000 ALTER TABLE `withdrawal` DISABLE KEYS */;
INSERT INTO `withdrawal` VALUES (1,'reason','2024-01-05 08:00:00.000000',1);
/*!40000 ALTER TABLE `withdrawal` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-05 15:58:51
