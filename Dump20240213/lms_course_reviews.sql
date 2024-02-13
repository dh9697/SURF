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
-- Table structure for table `course_reviews`
--

DROP TABLE IF EXISTS `course_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_reviews` (
  `review_id` bigint NOT NULL AUTO_INCREMENT,
  `comment` varchar(2000) DEFAULT NULL,
  `rating` int NOT NULL,
  `review_date` datetime(6) DEFAULT NULL,
  `course_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `FK799g8dfcye3g51ru63bfdhyb1` (`course_id`),
  KEY `FKlrpaadw9mi16mpm88uum9bdhm` (`member_id`),
  CONSTRAINT `FK799g8dfcye3g51ru63bfdhyb1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  CONSTRAINT `FKlrpaadw9mi16mpm88uum9bdhm` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_reviews`
--

LOCK TABLES `course_reviews` WRITE;
/*!40000 ALTER TABLE `course_reviews` DISABLE KEYS */;
INSERT INTO `course_reviews` VALUES (1,'선생님이 재미있어서 강의 들을 때 지루하지 않아요. 추천합니당.',5,'2024-02-13 10:54:28.671029',1,15),(2,'강의가 재미있긴 한데 starter 강의라고 하기에는 강의 내용이 조금 어렵네요. 그래도 나쁘지 않습니다.',4,'2024-02-13 11:00:56.955493',1,17),(3,'\"Yammy\"',5,'2024-02-13 11:04:04.015386',1,18),(4,'강의 내용 자체가 재미있습니다. 추천해요.',5,'2024-02-13 11:48:00.622151',1,19),(5,'강의가 지루하지 않고 재미있어용. 게임하다 질리면 강의 들으러 오겠습니당.',5,'2024-02-13 11:57:20.854701',1,21),(6,'제가 듣기엔 어려운 강의인 것 같아요. 진도 따라가기 힘듭니다.',3,'2024-02-13 12:04:18.325228',1,22),(7,'강의 재미있네요. ^^ 다들 한 번씩 들어 보시길 추천합니다. ^^7',5,'2024-02-13 12:06:30.181546',1,23),(8,'게임만 하던 저도 토익 자격증을 딸 수 있다는 걸 강의를 들으며 느꼈습니다!',5,'2024-02-13 12:09:26.972882',1,24),(9,'윈스턴을 플레이하는 것보다 쉬운 강의였어요. 추천합니다!',5,'2024-02-13 12:12:16.131962',1,25),(10,'강의 내용은 탄탄하지만 강의 동영상 자체가 저에게는 조금 지루했어요. 그래도 나쁘지 않았습니다.',4,'2024-02-13 12:14:22.988710',1,26),(11,'외국인인 제가 듣기에도 좋은 강의네요. 추천.',5,'2024-02-13 12:19:38.052732',1,27),(12,'카플란의 추천으로 수강했는데 괜찮네요.',4,'2024-02-13 12:21:50.874619',1,28),(13,'토익 자격증 준비하며 수강한 강의인데 너무 좋았어요. 재미있당.',5,'2024-02-13 12:25:21.347753',1,29);
/*!40000 ALTER TABLE `course_reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-13 12:54:10
