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
  `is_active` bit(1) DEFAULT NULL,
  `join_date` datetime(6) DEFAULT NULL,
  `login_id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `nationality` enum('Domestic','Foreigner') NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_num` varchar(20) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `uk_member_loginId` (`login_id`),
  UNIQUE KEY `uk_member_email` (`email`),
  UNIQUE KEY `uk_member_phoneNum` (`phone_num`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'1983-01-01','admin@email.com','WOMAN',_binary '','2024-02-13 09:19:57.906328','admin','관리자','Domestic','$2a$10$TdfmVP7O2NonUqxdwwFMiuMoEtNBtChOrvI4YQEGHAAJRZqGlq7Ai','010-0000-0000',NULL,NULL),(2,'1989-01-01','instructor@email.com','MAN',_binary '','2024-02-13 09:20:32.311876','instructor','서형원','Foreigner','$2a$10$oWLehXPlIrYmhc74cd0gyuzD8TJrHc9PTFvPniNTSykWLN281CSvu','010-1234-5678',NULL,NULL),(4,'1989-01-01','instructor02@email.com','WOMAN',_binary '','2024-02-13 09:21:30.073937','instructor02','김철수','Domestic','$2a$10$HerBH3cnqvaihJVqs8YbYOzHCmdiACOvQfyeY4TiPCyVOxbqTyAPi','010-2345-6789',NULL,NULL),(5,'1993-01-01','instructor03@email.com','WOMAN',_binary '','2024-02-13 09:22:01.418045','instructor03','이훈이','Domestic','$2a$10$Oy.7jeiodd3xcn/mlo2.KO3jn65RYL1d9maJ/Xkc8rUPMPGj1dSWq','010-9876-5432',NULL,NULL),(6,'1993-01-01','instructor04@email.com','MAN',_binary '','2024-02-13 09:22:31.662742','instructor04','한유리','Domestic','$2a$10$OSEAB59x9.MNklJ3edKGluNh2b/Ah/Tt0JvdTdOTez9TxZD9SXQTu','010-1111-1111',NULL,NULL),(7,'1993-01-01','instructor05@email.com','WOMAN',_binary '','2024-02-13 09:22:58.359397','instructor05','김맹구','Foreigner','$2a$10$XJ0kHXwnY7jxln0IV9frpeIbnxD3eFld1q2S2ozVEmqH3rFr5sZki','010-2222-2222',NULL,NULL),(8,'1986-01-01','instructor06@email.com','MAN',_binary '','2024-02-13 09:23:30.410693','instructor06','이상혁','Domestic','$2a$10$ZUMO68wLKmzUuoZyMqtZ0.iwv/i1ZP.ZrSTL8lEJGhSOn0IeX4yI6','010-3333-3333',NULL,NULL),(9,'1983-01-01','instructor07@email.com','WOMAN',_binary '','2024-02-13 09:24:10.977307','instructor07','최우제','Domestic','$2a$10$xrd68XacOXdOFB6Ss0plheZJvWDdrI9AbJQQRikEtLfM.QM5Sr5fW','010-4444-4444',NULL,NULL),(10,'1986-01-01','instructor08@email.com','WOMAN',_binary '','2024-02-13 09:24:38.496600','instructor08','김민석','Foreigner','$2a$10$2eCmpZDOKgewxfJiOt0ehen4JdUPWBLwIjCtLHoDJOHFhx4y0OC4i','010-5555-5555',NULL,NULL),(11,'1983-01-01','instructor09@email.com','WOMAN',_binary '','2024-02-13 09:25:19.128859','instructor09','이민형','Foreigner','$2a$10$UJpktyqB2RpN8SO19cmASOUNhEJSCE3EOapwoI47KbIcXemRTyXte','010-6666-6666',NULL,NULL),(12,'1981-01-01','instructor10@email.com','WOMAN',_binary '','2024-02-13 09:26:42.449416','instructor10','문현준','Domestic','$2a$10$utVehxlN0npr7YUlYvRaeOD7WYV81wKYW82QeemYUMiGxooZgNHgm','010-7777-7777',NULL,NULL),(13,'1993-01-01','instructor11@email.com','MAN',_binary '','2024-02-13 09:27:26.497397','instructor11','김보라','Domestic','$2a$10$7gUw.RcSx37LymVIdmboy.SeYgHwbacPqEH757VIBByYrIPxEoZGy','010-8888-8888',NULL,NULL),(14,'1993-01-01','instructor12@email.com','MAN',_binary '','2024-02-13 09:27:50.168604','instructor12','박정호','Foreigner','$2a$10$MAE1vBASj0nzMtMlDbP/re656qIk9sLtrA/rbChICL011DzxqLdk6','010-9999-9999',NULL,NULL),(15,'1997-01-19','iridescentu@email.com','WOMAN',_binary '','2024-02-13 09:39:48.707149','iridescentu','윤지희','Domestic','$2a$10$ymifiZJ6KoGfOGx/e4MYLusS6K0stBmkH1XxJ8vKfsLB9QMJmoYJW','010-0101-0101',NULL,NULL),(16,'1996-09-07','ghkt2535@email.com','WOMAN',_binary '','2024-02-13 10:56:48.973831','ghkt2535','김다혜','Domestic','$2a$10$xkK/g02vT2ohNFoD2rxrgOxCaAoJYuZlaM2.t7Ma3CJquNq.Ti0pW','010-9898-9898',NULL,NULL),(17,'1996-09-07','ghkt25351@email.com','WOMAN',_binary '','2024-02-13 10:59:13.640300','ghkt25351','김다혜','Domestic','$2a$10$WNNQXXkgArSvF6fhfhvzCehMrGGl/WgDWaQ/LyGJA4EUXwJKiDxA2','010-9876-9876',NULL,NULL),(18,'1996-05-07','faker@email.com','MAN',_binary '','2024-02-13 11:02:56.206072','faker','이상혁','Domestic','$2a$10$9JDqX.g0pSr7zXkuFII9Q.QnzuKf2zlfj2mz7.DifONWfpHxoOO7C','010-8887-8887',NULL,NULL),(19,'2004-01-31','zeus@email.com','MAN',_binary '','2024-02-13 11:46:50.739959','zeus','최우제','Domestic','$2a$10$KDO/oamOekktv1mzc.rGf.a1xKApG7xIKfu9WS.NROPv8Ehpyq6oa','010-9877-9877',NULL,NULL),(20,'2002-10-14','keria@email.com','MAN',_binary '','2024-02-13 11:49:34.301354','keria','김민석','Domestic','$2a$10$WY9Dwe5tMBnjUTCNmNroW.0IcOSDfqKF/0EtovSgPtPNl5DaSyAHW','010-9988-9988',NULL,NULL),(21,'2002-02-06','gumayusi@email.com','MAN',_binary '','2024-02-13 11:56:31.926791','gumayusi','이민형','Domestic','$2a$10$omTCQaU/bwxEI9q83fKRiOVV7CQwB0jMSjSoiGgGpV5mzOQFH5nWu','010-3322-3322',NULL,NULL),(22,'2005-05-05','zzanggu@email.com','MAN',_binary '','2024-02-13 11:59:50.710181','zzanggu','신짱구','Domestic','$2a$10$JgDCbKHOaEW3fiR0A6WDXOJnyq4NrETF1MXoNsk0Lt2dmWXjnoWNu','010-8899-9988',NULL,NULL),(23,'1991-09-05','ryujehong@email.com','MAN',_binary '','2024-02-13 12:05:41.700092','ryujehong','류제홍','Domestic','$2a$10$rQ/a4HuVovxjF1QJ9vqv0O5zCElymQO3Hke0ZrTjobsQEbK7Q3wvm','010-7898-7898',NULL,NULL),(24,'1996-01-01','teletobi@email.com','MAN',_binary '','2024-02-13 12:08:17.395129','teletobi','양진모','Domestic','$2a$10$aqki8gF6PkHnXJemDzJVMu2ymZtEKj5l6kpsyfNVKD2Q2cvr2n2MO','010-6565-5656',NULL,NULL),(25,'1996-08-08','mirozzang@email.com','MAN',_binary '','2024-02-13 12:11:10.600733','mirozzang','공진혁','Domestic','$2a$10$Ms4wezzt15TiZUpNE1C9.OTYrU2Zfh1dO4r9C5i7Fuuhz6oAINaAW','010-0808-0808',NULL,NULL),(26,'1991-01-01','escazzang@email.com','MAN',_binary '','2024-02-13 12:13:23.175578','escazzang','김인재','Domestic','$2a$10$noKaGfEt9zQqTOuzmwVAx.Dc5HJRxEAhJ65qn2W/q.YERf3lomlZC','010-8798-8798',NULL,NULL),(27,'1976-07-07','overwatch@email.com','MAN',_binary '','2024-02-13 12:18:26.765188','overwatch','카플란','Foreigner','$2a$10$YT0A6QkwAtmZgIjrf8ED5.WREqdFRRLSTgiOyFpN2z55OmWK0NLK.','010-7876-6787',NULL,NULL),(28,'2001-10-10','riotlol@email.com','WOMAN',_binary '','2024-02-13 12:21:06.248536','riotlol','라이엇','Foreigner','$2a$10$ZEay.0WRrkBPaKKjS1ILo.0nOoyTAbcufZi5P4Xt9TGGAWToTFZj.','010-4564-4564',NULL,NULL),(29,'2003-10-15','cherryp1x@email.com','WOMAN',_binary '','2024-02-13 12:24:14.135821','cherryp1x','김체리','Domestic','$2a$10$PTZy4SAaaUxC0xMb4nuK7uK2mzIXAxfxHEQNmYbqfOSRfzawHz6wC','010-0026-0026',NULL,NULL);
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

-- Dump completed on 2024-02-13 12:54:12
