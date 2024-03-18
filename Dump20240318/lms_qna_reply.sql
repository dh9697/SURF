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
-- Table structure for table `qna_reply`
--

DROP TABLE IF EXISTS `qna_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qna_reply` (
  `reply_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `reply_text` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `member_id` bigint NOT NULL,
  `qna_id` bigint NOT NULL,
  PRIMARY KEY (`reply_id`),
  KEY `FKf89wlc5ik3r7wcms0j7aku03b` (`member_id`),
  KEY `FKc8dygxmdmhmvie5gthdne0h28` (`qna_id`),
  CONSTRAINT `FKc8dygxmdmhmvie5gthdne0h28` FOREIGN KEY (`qna_id`) REFERENCES `qna_board` (`qna_id`),
  CONSTRAINT `FKf89wlc5ik3r7wcms0j7aku03b` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qna_reply`
--

LOCK TABLES `qna_reply` WRITE;
/*!40000 ALTER TABLE `qna_reply` DISABLE KEYS */;
INSERT INTO `qna_reply` VALUES (1,'2024-02-13 11:12:04.458824','2 번 문제는 본문을 잘 읽으면 충분히 해결할 수 있는 문제입니다. 본문을 다시 한번 잘 읽어 본 뒤에도 이해가 되지 않으면 그때 다시 질문해 주세요.','2024-02-13 11:12:04.458824',2,1),(2,'2024-02-22 15:05:08.245308','답변 테스트','2024-02-22 15:05:08.245308',2,15);
/*!40000 ALTER TABLE `qna_reply` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-18 21:34:42
