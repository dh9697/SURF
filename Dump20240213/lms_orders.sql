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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `delivery_message` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `order_date` datetime(6) NOT NULL,
  `payment_date` datetime(6) DEFAULT NULL,
  `payment_method` varchar(255) NOT NULL,
  `payment_status` bit(1) NOT NULL,
  `phone_num` varchar(255) NOT NULL,
  `recipient` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_amount` decimal(38,2) DEFAULT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK2vq7lo4gkknrmghj3rqpqqg6s` (`member_id`),
  CONSTRAINT `FK2vq7lo4gkknrmghj3rqpqqg6s` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'대전 서구','','iridescentu@email.com','2024-02-13 10:42:29.589197','2024-02-13 10:42:29.596193','TossPay',_binary '','010-1234-5678','윤지희','결제 완료',400000.00,15),(2,'대전광역시 동구','','','2024-02-13 11:00:16.790840','2024-02-13 11:00:16.796821','신용/체크카드',_binary '','010-9876-9876','김다혜','결제 완료',200000.00,17),(3,'서울특별시 페이커타워','','faker@email.com','2024-02-13 11:03:43.519432','2024-02-13 11:03:43.522432','Kakao Pay',_binary '','010-9887-9887','이상혁','결제 완료',200000.00,18),(4,'대전 선화동','','vlonipl@sdfa','2024-02-13 11:25:53.343663','2024-02-13 11:25:53.348659','무통장입금',_binary '','010-5575-5286','윤지희','결제 완료',250000.00,15),(5,'','','','2024-02-13 11:27:21.884802','2024-02-13 11:27:21.887800','',_binary '','','','결제 완료',300000.00,15),(6,'서울특별시 T1 숙소','','','2024-02-13 11:47:34.555883','2024-02-13 11:47:34.561879','',_binary '','010-9877-9877','최우제','결제 완료',750000.00,19),(7,'','','','2024-02-13 11:50:16.962735','2024-02-13 11:50:16.969731','',_binary '','','','결제 완료',700000.00,20),(8,'서울특별시 T1 숙소','','','2024-02-13 11:51:22.780835','2024-02-13 11:51:22.787841','TossPay',_binary '','010-9989-9989','김민석','결제 완료',950000.00,20),(9,'서울특별시 T1 숙소','','','2024-02-13 11:57:04.132687','2024-02-13 11:57:04.141682','무통장입금',_binary '','010-3322-3322','이민형','결제 완료',450000.00,21),(10,'떡잎마을','','','2024-02-13 12:00:27.486753','2024-02-13 12:00:27.494749','Kakao Pay',_binary '','010-9987-7899','신짱구','결제 완료',400000.00,22),(11,'인천광역시 부천','','','2024-02-13 12:06:12.268514','2024-02-13 12:06:12.271502','신용/체크카드',_binary '','010-7898-9878','류제홍','결제 완료',200000.00,23),(12,'루나틱하이 숙소','','','2024-02-13 12:08:52.668440','2024-02-13 12:08:52.671438','휴대폰',_binary '','010-8998-8998','양진모','결제 완료',200000.00,24),(13,'루나틱하이 숙소','','','2024-02-13 12:11:41.114447','2024-02-13 12:11:41.118444','N Pay',_binary '','010-9876-6789','공진혁','결제 완료',200000.00,25),(14,'루나틱하이 숙소','','','2024-02-13 12:13:49.834379','2024-02-13 12:13:49.837377','무통장입금',_binary '','010-9878-9878','김인재','결제 완료',200000.00,26),(15,'미국 캘리포니아 블리자드 컴퍼니','','','2024-02-13 12:19:12.545214','2024-02-13 12:19:12.549210','무통장입금',_binary '','010-9898-6565','카플란','결제 완료',200000.00,27),(16,'미국 캘리포니아 라이엇 본사','','','2024-02-13 12:21:32.569049','2024-02-13 12:21:32.571037','무통장입금',_binary '','010-6589-6589','라이엇','결제 완료',200000.00,28),(17,'인천광역시 부천','','','2024-02-13 12:24:54.465538','2024-02-13 12:24:54.468536','N Pay',_binary '','010-0026-0026','김체리','결제 완료',200000.00,29);
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

-- Dump completed on 2024-02-13 12:54:09
