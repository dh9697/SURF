-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: lms
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
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `course_id` bigint NOT NULL AUTO_INCREMENT,
  `announcement` varchar(255) DEFAULT NULL,
  `content_level` varchar(255) NOT NULL,
  `course_name` varchar(150) NOT NULL,
  `course_thumbnail` blob,
  `description` varchar(500) DEFAULT NULL,
  `duration_mins` int NOT NULL,
  `price` int NOT NULL,
  `subject_id` bigint DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `FK5tckdihu5akp5nkxiacx1gfhi` (`subject_id`),
  CONSTRAINT `FK5tckdihu5akp5nkxiacx1gfhi` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'토익 입문자를 위한 코스입니다. 기본을 탄탄히 다져보세요.','초급','토익 Starter',NULL,'토익 기초를 다지는데 초점을 맞춘 코스입니다. 기본적인 어휘와 문법을 쌓아가며 토익의 기본적인 구조를 이해합니다.',360,200000,1),(2,'중급 토익 학습자를 위한 코스입니다. 실전 문제로 실력을 쌓아보세요.','중급','토익 Challenger',NULL,'토익 점수를 한 단계 끌어올리려는 학습자를 위한 코스입니다. 실전 문제를 통해 문제 해결 능력을 키웁니다.',480,250000,1),(3,'고득점을 목표로 하는 학습자를 위한 코스입니다. 전략적인 학습으로 고득점을 향해 도전하세요.','고급','토익 Master',NULL,'고득점을 목표로 하는 학습자를 위한 코스입니다. 전략적인 문제 풀이와 시간 관리를 배웁니다.',600,300000,1),(4,'토플 입문자를 위한 코스입니다. 기본을 탄탄히 다져보세요.','초급','토플 Essential',NULL,'토플의 기본적인 구조와 문제 유형을 이해하는 코스입니다.',360,200000,10),(5,'토플 점수를 한 단계 끌어올리려는 학습자를 위한 코스입니다.','중급','토플 Advanced',NULL,'심화된 문법과 어휘를 학습하며 토플 고득점을 위한 전략을 배우는 코스입니다.',480,250000,10),(6,'고득점을 목표로 하는 학습자를 위한 코스입니다. 전략적인 학습으로 고득점을 향해 도전하세요.','고급','토플 Intensive',NULL,'고득점을 목표로 하는 학습자를 위한 코스입니다. 문제 풀이 전략과 시간 관리를 중점으로 학습합니다.',600,300000,10),(7,'텝스 입문자를 위한 코스입니다. 기본을 탄탄히 다져보세요.','초급','텝스 Foundation',NULL,'텝스의 기본적인 구조와 문제 유형을 이해하는 코스입니다.',360,200000,11),(8,'텝스 점수를 한 단계 끌어올리려는 학습자를 위한 코스입니다.','중급','텝스 Progress',NULL,'심화된 문법과 어휘를 학습하며 텝스 고득점을 위한 전략을 배우는 코스입니다.',480,250000,11),(9,'고득점을 목표로 하는 학습자를 위한 코스입니다. 전략적인 학습으로 고득점을 향해 도전하세요.','고급','텝스 Accelerate',NULL,'고득점을 목표로 하는 학습자를 위한 코스입니다. 문제 풀이 전략과 시간 관리를 중점으로 학습합니다.',600,300000,11),(10,'오픽 입문자를 위한 코스입니다. 기본을 탄탄히 다져보세요.','초급','오픽 Basic',NULL,'오픽의 기본적인 구조와 문제 유형을 이해하는 코스입니다.',360,200000,12),(11,'오픽 점수를 한 단계 끌어올리려는 학습자를 위한 코스입니다.','중급','오픽 Intermediate',NULL,'심화된 대화 주제와 표현을 학습하며, 오픽 점수 향상을 위한 전략을 배우는 코스입니다.',480,250000,12),(12,'고득점을 목표로 하는 학습자를 위한 코스입니다. 전략적인 학습으로 고득점을 향해 도전하세요.','고급','오픽 Advanced',NULL,'고득점을 목표로 하는 학습자를 위한 코스입니다. 실전 대화와 시험 전략을 중점으로 학습합니다.',600,300000,12);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-13 12:54:13
