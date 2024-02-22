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
-- Table structure for table `content_history`
--

DROP TABLE IF EXISTS `content_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_history` (
  `content_history_id` bigint NOT NULL AUTO_INCREMENT,
  `is_completed` bit(1) NOT NULL,
  `last_accessed` datetime(6) NOT NULL,
  `content_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`content_history_id`),
  KEY `FKt4fu94n7vpacujc7hwv8jx06x` (`content_id`),
  KEY `FKehcc7al1fuxw81pyw1jhav9ne` (`member_id`),
  CONSTRAINT `FKehcc7al1fuxw81pyw1jhav9ne` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKt4fu94n7vpacujc7hwv8jx06x` FOREIGN KEY (`content_id`) REFERENCES `contents` (`content_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_history`
--

LOCK TABLES `content_history` WRITE;
/*!40000 ALTER TABLE `content_history` DISABLE KEYS */;
INSERT INTO `content_history` VALUES (1,_binary '','2024-02-13 11:29:28.155625',1,15),(2,_binary '\0','2024-02-13 11:29:37.380617',2,15),(3,_binary '\0','2024-02-13 11:30:03.780546',3,15),(4,_binary '','2024-02-17 20:25:22.223761',2,2),(5,_binary '','2024-02-21 13:36:06.363913',3,17),(6,_binary '','2024-02-21 13:41:18.269009',1,17),(7,_binary '','2024-02-21 13:41:23.436104',2,17),(8,_binary '','2024-02-21 19:01:50.682957',1,19),(9,_binary '','2024-02-22 10:48:55.895325',4,17),(10,_binary '','2024-02-22 10:48:58.940582',5,17),(11,_binary '','2024-02-22 10:49:01.725335',6,17),(12,_binary '','2024-02-22 10:49:04.668340',7,17),(13,_binary '','2024-02-22 10:49:07.293445',8,17),(14,_binary '','2024-02-22 10:49:10.252371',9,17),(15,_binary '','2024-02-22 10:49:12.900478',10,17),(16,_binary '','2024-02-22 11:45:39.008131',11,17),(17,_binary '','2024-02-22 12:32:42.392120',1,30),(18,_binary '','2024-02-22 12:34:05.312191',2,30),(19,_binary '','2024-02-22 12:34:52.119213',3,30),(20,_binary '','2024-02-22 13:32:43.875893',11,32),(21,_binary '','2024-02-22 13:32:47.963884',12,32);
/*!40000 ALTER TABLE `content_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-22 16:52:41
