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
-- Table structure for table `exam_question_options`
--

DROP TABLE IF EXISTS `exam_question_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_question_options` (
  `exam_question_exam_question_id` bigint NOT NULL,
  `options` varchar(255) NOT NULL,
  KEY `FKb7lx1ei1yj1xddcsyb1nndiqo` (`exam_question_exam_question_id`),
  CONSTRAINT `FKb7lx1ei1yj1xddcsyb1nndiqo` FOREIGN KEY (`exam_question_exam_question_id`) REFERENCES `exam_questions` (`exam_question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_question_options`
--

LOCK TABLES `exam_question_options` WRITE;
/*!40000 ALTER TABLE `exam_question_options` DISABLE KEYS */;
INSERT INTO `exam_question_options` VALUES (5,'anyone'),(5,'whomever'),(5,'someone'),(5,'whoever'),(4,'they'),(4,'this'),(4,'what'),(4,'that'),(6,'which'),(6,'that'),(6,'why'),(6,'when'),(11,'4'),(11,'4'),(11,'4'),(11,'4'),(12,'5'),(12,'5'),(12,'5'),(12,'5'),(13,'6'),(13,'6'),(13,'6'),(13,'6'),(14,'7'),(14,'7'),(14,'7'),(14,'7'),(15,'8'),(15,'8'),(15,'8'),(15,'8'),(16,'9'),(16,'9'),(16,'9'),(16,'9'),(17,'10'),(17,'10'),(17,'10'),(17,'10'),(20,'1'),(20,'1'),(20,'1'),(20,'1'),(7,'affected'),(7,'to affect'),(7,'affecting'),(7,'affect'),(8,'establish'),(8,'established'),(8,'establishes'),(8,'establishing'),(9,'meaniwhile'),(9,'otherwise'),(9,'also'),(9,'however'),(10,'belong'),(10,'belongs'),(10,'belonging'),(10,'belongings'),(24,'Except that'),(24,'In exchange for'),(24,'In the event that'),(24,'By means of'),(25,'any'),(25,'many'),(25,'almost'),(25,'always');
/*!40000 ALTER TABLE `exam_question_options` ENABLE KEYS */;
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
