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
-- Table structure for table `contents`
--

DROP TABLE IF EXISTS `contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contents` (
  `content_id` bigint NOT NULL AUTO_INCREMENT,
  `content_duration` int NOT NULL,
  `content_img` varchar(255) DEFAULT NULL,
  `content_status` bit(1) DEFAULT NULL,
  `content_title` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `course_id` bigint NOT NULL,
  PRIMARY KEY (`content_id`),
  KEY `FK26ra050idh8wetyhulbictirv` (`course_id`),
  CONSTRAINT `FK26ra050idh8wetyhulbictirv` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contents`
--

LOCK TABLES `contents` WRITE;
/*!40000 ALTER TABLE `contents` DISABLE KEYS */;
INSERT INTO `contents` VALUES (1,40,NULL,_binary '\0','토익의 구조 이해','토익 시험의 전체적인 구조와 각 파트별 특징에 대해 학습합니다.',1),(2,40,NULL,_binary '\0','토익의 기본 어휘 및 문법','토익 시험에 자주 나오는 기본 어휘와 문법을 학습합니다.',1),(3,40,NULL,_binary '\0','토익 실전 문제 풀이','배운 내용을 활용하여 실전 문제를 풀어봅니다.',1),(4,40,NULL,_binary '\0','토익 리스닝 기본 전략','토익 리스닝 파트에 필요한 기본적인 전략과 문제 풀이 방법을 배웁니다.',1),(5,40,NULL,_binary '\0','토익 리딩 기본 전략','토익 리딩 파트에 필요한 기본적인 전략과 문제 풀이 방법을 배웁니다.',1),(6,40,NULL,_binary '\0','토익 어휘 확장','토익 시험에 자주 나오는 중요한 어휘를 추가로 학습하고 익힙니다.',1),(7,40,NULL,_binary '\0','토익 문법 확장','토익 시험에 자주 나오는 중요한 문법을 추가로 학습하고 익힙니다.',1),(8,40,NULL,_binary '\0','토익 리스닝 실전 문제 풀이','배운 리스닝 전략을 활용하여 실전 문제를 풀어봅니다.',1),(9,40,NULL,_binary '\0','토익 리딩 실전 문제 풀이','배운 리딩 전략을 활용하여 실전 문제를 풀어봅니다.',1),(10,40,NULL,_binary '\0','토익 종합 복습 및 모의 시험','배운 내용을 종합적으로 복습하고, 실제 시험과 유사한 환경에서 모의 시험을 통해 준비 상태를 점검합니다.',1),(11,40,NULL,_binary '\0','토익 중급 어휘 및 문법','중급 수준의 어휘와 문법을 학습하고, 이를 문제에 적용하는 방법을 배웁니다.',2),(12,40,NULL,_binary '\0','토익 실전 문제 전략','실전 문제를 풀이하는 데 필요한 전략과 팁에 대해 배웁니다.',2),(13,40,NULL,_binary '\0','토익 모의 시험','실제 시험과 유사한 환경에서 모의 시험을 통해 실력을 점검합니다.',2);
/*!40000 ALTER TABLE `contents` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-13 12:54:11
