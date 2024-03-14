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
-- Table structure for table `exam_history`
--

DROP TABLE IF EXISTS `exam_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_history` (
  `exam_history_id` bigint NOT NULL AUTO_INCREMENT,
  `exam_completion_status` bit(1) NOT NULL,
  `exam_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`exam_history_id`),
  KEY `FK1uur8qwrxn80nhe5v63phkwf6` (`exam_id`),
  KEY `FKp7pbhtcgx7ejm733vydwilsrs` (`member_id`),
  CONSTRAINT `FK1uur8qwrxn80nhe5v63phkwf6` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`),
  CONSTRAINT `FKp7pbhtcgx7ejm733vydwilsrs` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_history`
--

LOCK TABLES `exam_history` WRITE;
/*!40000 ALTER TABLE `exam_history` DISABLE KEYS */;
INSERT INTO `exam_history` VALUES (1,_binary '',10,17),(2,_binary '\0',11,17);
/*!40000 ALTER TABLE `exam_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-14 19:19:54
