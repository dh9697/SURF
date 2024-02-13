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
-- Table structure for table `qna_board`
--

DROP TABLE IF EXISTS `qna_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qna_board` (
  `qna_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `question_text` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `course_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`qna_id`),
  KEY `FKlwkn03noudiqds4i8v8ohmoqr` (`course_id`),
  KEY `FK55pw91v2ctmq6ecm2o7d4iopa` (`member_id`),
  CONSTRAINT `FK55pw91v2ctmq6ecm2o7d4iopa` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`),
  CONSTRAINT `FKlwkn03noudiqds4i8v8ohmoqr` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qna_board`
--

LOCK TABLES `qna_board` WRITE;
/*!40000 ALTER TABLE `qna_board` DISABLE KEYS */;
INSERT INTO `qna_board` VALUES (1,'2024-02-13 10:55:16.791399','토익의 구조 이해 부분에서 2 번 문제가 잘 이해되지 않아요.','2024-02-13 12:52:31.570417',1,15),(2,'2024-02-13 11:01:25.564875','강의 내용이 조금 어려운 것 같은데 기본 어휘 및 문법 강의의 3 번 문제에 대해 설명해 주실 수 있을까요?','2024-02-13 11:01:25.564875',1,17),(3,'2024-02-13 11:04:21.575353','잘 외우고 열심히 공부하면 됩니다.','2024-02-13 11:04:21.575353',1,18),(4,'2024-02-13 11:11:01.922461','과제 1 번의 정답이 왜 satisfied인가요? 자세히 설명해 주시면 감사하겠습니다.','2024-02-13 11:11:01.922461',1,15),(5,'2024-02-13 11:48:42.231401','토익 리스닝 기본 전략 강의에서 강의 동영상 4 분 30 초 정도에 나오는 문제가 이해되지 않습니다. 조금 더 자세하게 설명해 주셔야 할 것 같아요.','2024-02-13 11:48:42.231401',1,19),(6,'2024-02-13 11:58:11.241651','리딩 실전 문제 풀이 강의 내용 중 1 번 문제가 잘 이해되지 않아 어렵습니다. 1 번 문제에 대해 조금 더 자세히 설명해 주실 수 있을까요?','2024-02-13 11:58:11.241651',1,21),(7,'2024-02-13 12:04:55.532917','첫 강의부터 이해가 잘 안 돼요. 어려워요.','2024-02-13 12:04:55.532917',1,22),(8,'2024-02-13 12:07:22.125566','강의는 전반적으로 재미있는데 리딩 기본 전략 강의의 9 번 예제의 본문을 해석하는 데 어려움을 느낍니다. 어떻게 공부하면 좋을까요?','2024-02-13 12:07:22.125566',1,23),(9,'2024-02-13 12:10:28.148670','종합 복습 및 모의 시험 강의의 4 번 문제가 어려워요. 왜 문제에 대한 답이 had가 아닌 have been인가요?','2024-02-13 12:10:28.148670',1,24),(10,'2024-02-13 12:12:43.588004','리스닝 실전 문제 풀이 강의에 대한 강의 내용이 전반적으로 어려워요. 리스닝 스킬을 늘리려면 어떻게 해야 할까요?','2024-02-13 12:12:43.588004',1,25),(11,'2024-02-13 12:15:12.139480','토익 어휘 확장 강의에서 3 번 문제의 답이 왜 1 번 haven\'t seen인가요?','2024-02-13 12:15:12.139480',1,26),(12,'2024-02-13 12:20:17.613118','토익 문법 확장 강의의 4 번 문제 본문이 잘못된 것 같습니다. Double check please.','2024-02-13 12:20:17.613118',1,27),(13,'2024-02-13 12:22:17.636346','카플란의 질문 내용과 동일한 질문입니다. 토익 문법 확장 강의의 4 번 문제 본문 다시 한번 확인해 주세요.','2024-02-13 12:22:17.636346',1,28),(14,'2024-02-13 12:26:09.619729','토익의 구조 이해 부분에서 2 번 문제가 잘 이해되지 않아요. 2 번 문제를 풀기 위해서는 어떤 방식으로 접근해야 할까요?','2024-02-13 12:26:09.619729',1,29);
/*!40000 ALTER TABLE `qna_board` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-13 12:54:11
