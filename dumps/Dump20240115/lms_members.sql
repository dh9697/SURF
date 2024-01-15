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
  `activated` bit(1) DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `uk_member_loginId` (`login_id`),
  UNIQUE KEY `uk_member_email` (`email`),
  UNIQUE KEY `uk_member_phoneNum` (`phone_num`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'1990-05-15','johndoe@example.com','MAN',_binary '','2023-12-28 08:00:00.000000','user123','John Doe','Foreigner','password123','1234567890',NULL),(4,'1990-05-15','johndoe1@example.com','MAN',_binary '\0','2023-12-28 08:00:00.000000','test123','John Doed','Foreigner','password1234','1234567230',NULL),(7,'1996-09-07','ghkt2535@example.com','WOMAN',_binary '\0',NULL,'ghkt2535','Kim dahye','Domestic','dusek5381!','01024166504',NULL),(8,'1996-09-07','ghkt2511@example.com','WOMAN',_binary '\0',NULL,'ghkt44','Kim dahye','Domestic','dusek5382!','01024166511',NULL),(9,'1996-09-07','ghkt2211@example.com','WOMAN',_binary '\0',NULL,'ghkt4455','Kim dahye','Domestic','dusek5382!','01024122511',NULL),(11,'1996-09-07','ghkt3211@example.com','WOMAN',_binary '\0',NULL,'ghkt4355','Kim dahye','Domestic','dusek5382!','01024122513',NULL),(12,'1996-09-07','ghkt2535@nate.com','WOMAN',_binary '\0',NULL,'test0110','김다혜','Domestic','dusek5381!','010-1234-5678',NULL),(13,'2024-01-11','dwAcademy@google.com','WOMAN',_binary '',NULL,'admin2024','Kimadmin','Domestic','$2a$10$OIAdpkHankGLttegXt2XLuM/OKEMi/ATjrXYA9COA3p3YMXLWnpPS','010-1111-2222',NULL),(14,'2024-01-11','dwAcademy1@google.com','WOMAN',_binary '',NULL,'member2024','Kimadmin','Domestic','$2a$10$yiaAy9I6vgBT7kGRgcFxKeD0.Ik4FZUmBECysagJCZnrTrIL3Ega.','010-1111-3333',NULL),(15,'2024-01-11','dwAcademy2@google.com','WOMAN',_binary '',NULL,'user2024','Kimadmin','Domestic','$2a$10$DG9f3e4.aHv9Y4YpTX5jzOtdoN1kp6BQs/EWrFgO59j2y/5ptP8be','010-1111-5555',NULL),(16,'2024-01-11','dwAcademy3@google.com','WOMAN',_binary '',NULL,'instructor2024','Kimteach','Domestic','$2a$10$wrHouGC5a6LpgdBNSg4eKupH21KgB0FCygaMj1tUaPksef4TNq5e6','010-1111-9999',NULL),(17,'2024-01-11','dwAcademy0@admin.com','WOMAN',_binary '',NULL,'surfAdmin','surfAdmin','Domestic','$2a$10$OnC2JgfPmFzX.PnzpUujAOlP009GLdIsdZYSe0EoEs/Nt7PMxWl/O','010-1004-1004',NULL),(18,'1996-09-07','ghkt2535@ndfs.com','WOMAN',_binary '','2024-01-15 11:46:29.544083','today0115','김다혜','Domestic','$2a$10$KzeIG/yW70z1C.uNUfGG3uK5Mjyj373x.OVrKf5gjWzhfR8zDLfjG','010-1212-8989',NULL);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-15 16:51:07
