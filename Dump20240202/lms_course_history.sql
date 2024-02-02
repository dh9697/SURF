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
-- Table structure for table `course_history`
--

DROP TABLE IF EXISTS `course_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_history` (
  `course_history_id` bigint NOT NULL AUTO_INCREMENT,
  `start_date` date DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  `content_status` bit(1) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
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
INSERT INTO `course_history` VALUES (1,'2023-12-28',NULL,NULL,NULL,NULL),(2,'2023-12-28',NULL,NULL,NULL,NULL),(3,'2023-12-28',2,1,NULL,NULL),(4,'2023-12-29',2,1,NULL,NULL),(5,'2023-12-25',NULL,NULL,NULL,NULL),(6,'2023-12-25',NULL,NULL,NULL,NULL),(7,'2023-12-25',NULL,NULL,NULL,NULL),(8,'2023-12-25',NULL,NULL,NULL,NULL),(9,'2023-12-25',NULL,NULL,NULL,NULL),(10,'2023-12-25',2,1,NULL,NULL);
/*!40000 ALTER TABLE `course_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-02 12:16:52
