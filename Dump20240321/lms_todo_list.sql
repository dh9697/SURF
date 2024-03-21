-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: lms
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `todo_list`
--

DROP TABLE IF EXISTS `todo_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo_list` (
  `task_id` bigint NOT NULL AUTO_INCREMENT,
  `completion_date` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `due_date` datetime(6) DEFAULT NULL,
  `is_completed` bit(1) DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `task_name` varchar(255) DEFAULT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`task_id`),
  KEY `FK3x6rbqoxekyny3cnvvcb9tp9y` (`member_id`),
  CONSTRAINT `FK3x6rbqoxekyny3cnvvcb9tp9y` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_list`
--

LOCK TABLES `todo_list` WRITE;
/*!40000 ALTER TABLE `todo_list` DISABLE KEYS */;
INSERT INTO `todo_list` VALUES (5,NULL,NULL,NULL,_binary '\0',NULL,'유저 - 작성한 게시글 스타일링',17),(6,NULL,NULL,NULL,_binary '\0',NULL,'유저 - 물결 바구니 스타일링',17),(7,NULL,NULL,NULL,_binary '\0',NULL,'유저 - 계정정보, 구매내역 스타일링',17),(8,NULL,NULL,NULL,_binary '\0',NULL,'유저 - 수료증 스타일링 및 기능 구현',17),(9,NULL,NULL,NULL,_binary '',NULL,'유저 - 대시보드 기능 넣기',17),(43,NULL,NULL,NULL,_binary '',NULL,'선생님 - 학생 강의 진도율, 시험 진도율',17),(44,NULL,NULL,NULL,_binary '\0',NULL,'선생님 - 시험 관리 스타일링',17),(45,NULL,NULL,NULL,_binary '\0',NULL,'선생님 - 시험 문제 관리 스타일링',17),(46,NULL,NULL,NULL,_binary '\0',NULL,'선생님 - qna 관리 스타일링',17),(47,NULL,NULL,NULL,_binary '\0',NULL,'선생님 - 메인 대시보드 ',17);
/*!40000 ALTER TABLE `todo_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-21 17:19:16
