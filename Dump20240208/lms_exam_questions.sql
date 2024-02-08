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
-- Table structure for table `exam_questions`
--

DROP TABLE IF EXISTS `exam_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_questions` (
  `exam_question_id` bigint NOT NULL AUTO_INCREMENT,
  `exam_id` bigint NOT NULL,
  `correct_option_index` int NOT NULL,
  `options` varbinary(255) NOT NULL,
  `question_text` varchar(255) NOT NULL,
  `quest_paragraph` varchar(255) DEFAULT NULL,
  `wrong_ans_expl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`exam_question_id`),
  KEY `FK5cd6sjmccb11rrwpyabyc81c0` (`exam_id`),
  CONSTRAINT `FK5cd6sjmccb11rrwpyabyc81c0` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_questions`
--

LOCK TABLES `exam_questions` WRITE;
/*!40000 ALTER TABLE `exam_questions` DISABLE KEYS */;
INSERT INTO `exam_questions` VALUES (1,1,3,_binary '고채영,윤지희,이상혁,김다혜','이 것은 테스트 문제입니다. 세최미(세계 최강 미드)는 누구일까요?',NULL,NULL),(2,1,3,_binary '고채영,윤지희,이상혁,김다혜','이 것은 테스트 문제입니다. 세최미(세계 최강 미녀)는 누구일까요?',NULL,NULL),(3,1,1,_binary '고채영,윤지희,이상혁,김다혜','이 것은 테스트 문제입니다. 세최미(세계 최강 미남)는 누구일까요?',NULL,NULL),(5,1,3,_binary '됐으면,좋겄는디,과연,될까요?','수정중',NULL,NULL),(6,1,1,_binary 'ㄴㅇㄹ,ㄴㅇㄹ,ㄴㅇㄹ,ㄴㄹ','ㄴㅇㄹ',NULL,NULL),(7,1,1,_binary '그만 하고,싶어,제발,되라','시험 문제 이제',NULL,NULL),(8,1,1,_binary '선생님,문제 쉽게,내주세요,제발','수정할게요',NULL,NULL),(10,1,1,_binary '열심히,할게요,재밌어요,어려워요','제발 되어라',NULL,NULL),(11,2,1,_binary '잘 되길,바라요,열심히,삽시다','이번에도',NULL,NULL),(12,1,1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0sdft\0sdft\0sdft\0sdfx','dsf',NULL,NULL);
/*!40000 ALTER TABLE `exam_questions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-08 20:04:21
