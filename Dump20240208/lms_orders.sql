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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `order_date` datetime(6) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_amount` decimal(38,2) DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `delivery_message` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `phone_num` varchar(255) NOT NULL,
  `recipient` varchar(255) NOT NULL,
  `payment_date` datetime(6) DEFAULT NULL,
  `payment_status` bit(1) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK2vq7lo4gkknrmghj3rqpqqg6s` (`member_id`),
  CONSTRAINT `FK2vq7lo4gkknrmghj3rqpqqg6s` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2024-02-01 15:22:29.395279','결제 완료',10000.00,25,'캘리포니아인데요','없어요','ghkt2535@naver.com','계좌이체','010-2416-6504','김다혜','2024-02-01 15:22:29.405273',_binary ''),(2,'2024-02-01 17:25:02.731005','결제 완료',40000.00,25,'','','','TossPay','','','2024-02-01 17:25:02.734992',_binary ''),(3,'2024-02-01 17:44:54.025465','결제 완료',0.00,25,'dgf','없어요','ghkt2535@naver.com','Kakao Pay','010-2416-6504','김다혜','2024-02-01 17:44:54.028473',_binary ''),(4,'2024-02-05 10:34:57.761634','결제 완료',10000.00,25,'dgf','없어요','ghkt2535@naver.com','계좌이체','010-2416-6504','김다혜','2024-02-05 10:34:57.768630',_binary ''),(5,'2024-02-05 10:36:54.766557','결제 완료',10000.00,26,'dgf','없어요','ghkt2535@naver.com','계좌이체','010-2416-6504','김다혜','2024-02-05 10:36:54.771544',_binary ''),(6,'2024-02-05 15:04:11.549904','결제 완료',10000.00,26,'dgf','없어요','ghkt2535@naver.com','계좌이체','010-2416-6504','김다혜','2024-02-05 15:04:11.559548',_binary ''),(7,'2024-02-07 11:51:30.635527','결제 완료',10000.00,27,'dgf','','ghkt2535@naver.com','무통장입금','010-2416-6504','김다혜','2024-02-07 11:51:30.641524',_binary ''),(8,'2024-02-07 21:41:56.079037','결제 완료',10000.00,13,'dgf','없어요','ghkt2535@naver.com','휴대폰','010-2416-6504','김다혜','2024-02-07 21:41:56.087030',_binary ''),(9,'2024-02-08 11:43:06.777109','결제 완료',0.00,27,'dgf','','ghkt2535@naver.com','계좌이체','010-2416-6504','김다혜','2024-02-08 11:43:06.787101',_binary '');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-08 20:04:24
