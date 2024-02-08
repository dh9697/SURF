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
  `content_level` varchar(255) NOT NULL,
  `course_thumbnail` blob,
  `price` int NOT NULL,
  `subject_id` bigint DEFAULT NULL,
  `announcement` varchar(255) DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `FK5tckdihu5akp5nkxiacx1gfhi` (`subject_id`),
  KEY `FKt5xmr80n47i42bfd9lgwxqx23` (`member_id`),
  CONSTRAINT `FK5tckdihu5akp5nkxiacx1gfhi` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`),
  CONSTRAINT `FKt5xmr80n47i42bfd9lgwxqx23` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (2,'test','test',60,'test','',10000,1,'test',16),(3,'englishUpdate2','helloworld',60,'','',100,1,'꺅',24),(4,'test','test',60,'test','',10000,3,'test',16),(5,'test','test',60,'test','',10000,3,'test',16),(6,'english','helloworld',60,'600',_binary 'url',10000,1,NULL,16),(8,'test','test',60,'test','',10000,3,'test',16),(9,'ㄴㅇㄹ','ㄴㅇㄹ',100,'ㅇㄹ',NULL,1000,1,'ㄴㅇㄹ',16),(11,'선생님 테스트','이ㅏㅣ라',60,'ㅇㄴㄹ',NULL,60,1,'ㅇㄴㄹ',16),(12,'ㅇㄴㄹ','ㄴㅇㄹ',0,'ㄴㅇ',NULL,0,1,'ㄴㅇㄹ',16),(13,'ㅇㄴㄹ','ㄴㅇㄹ',0,'ㄴㅇ',NULL,0,1,'ㄴㅇㄹ',16),(14,'fds','sdf',0,'sdf',NULL,0,1,'sdf',16),(15,'fds','sdf',0,'sdf',NULL,0,1,'sdf',16),(16,'ㅇ리ㅏ','ㅇ나ㅣ',41315,'ㄴㅇㄹ',NULL,0,1,'ㅇㄴㄹ',16),(17,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(18,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(19,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(20,'test','test',60,'test','',10000,3,'test',16),(21,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(22,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(23,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(24,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(25,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(26,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(27,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(28,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(29,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(30,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(31,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(32,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(33,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(34,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(35,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(36,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(37,'Test Course','This is a test course.',60,'Beginner','',10000,1,'Welcome to the test course!',16),(38,'Test Course','This is a test course.',60,'Beginner','',10000,2,'Welcome to the test course!',24),(39,'Test Course','This is a test course.',60,'Beginner','',10000,2,'Welcome to the test course!',24),(40,'Test Course','This is a test course.',60,'Beginner','',10000,2,'Welcome to the test course!',24),(49,'test','test',60,'test','',10000,1,'test',NULL),(67,'리액트로','등록',0,'제발',NULL,0,NULL,'되어라',NULL),(70,'리액트로','등록',0,'제발',NULL,0,NULL,'되어라',NULL);
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

-- Dump completed on 2024-02-08 20:04:23
