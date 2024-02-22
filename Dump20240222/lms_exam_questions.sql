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
  `correct_option_index` int NOT NULL,
  `quest_paragraph` varchar(255) DEFAULT NULL,
  `question_text` varchar(255) NOT NULL,
  `wrong_ans_expl` varchar(255) DEFAULT NULL,
  `exam_id` bigint NOT NULL,
  PRIMARY KEY (`exam_question_id`),
  KEY `FK5cd6sjmccb11rrwpyabyc81c0` (`exam_id`),
  CONSTRAINT `FK5cd6sjmccb11rrwpyabyc81c0` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_questions`
--

LOCK TABLES `exam_questions` WRITE;
/*!40000 ALTER TABLE `exam_questions` DISABLE KEYS */;
INSERT INTO `exam_questions` VALUES (4,4,NULL,'The staff understands _______ the company funds for corporate activities cannot be disbursed without prior approval from a director.','해석: 그 직원은 기업 활동을 위한 회사 자금이 임원의 사전 승인 없이는 지출될 수 없다는 것을 알고 있다. 동사 (understand)의 목적어 자리에 온 명사절의 접속사를 채워야 함.a) they = 대명사b) this = 대명사c) what = 접속사 -> what 이 될 수 없는 이유는 what이 명사절로 쓰일 때 what 다음에는 불완전하나 절이 와야 됨.d) that = 접속사 -> 완전한 절이 왔기 때문에',10),(5,4,'','_______ exits the building last is required to set the office alarm system and lock the main entrance doors.','해석: 건물을 마지막으로 나가는 사람은 누구든지 사무실 경보장치를 설정하고 중앙 출입문을 잠가야 한다.주어 자리에 온 절 (exits the builiding last) 앞에는 명사절 접속사가 와야 함.a) anyone = 대명사 -> 명사절을 이끌 수 없음b) whomever = 명사절 접속사 -> 목적격c) someone = 대명사 -> 명사절을 이끌 수 없음d) whoever = 명사절 접속사 -> 주격 (주어 자리이기 때문에 주격이 답이 됨',10),(6,2,'','The board of directors is of the opinion _______ the newly appointed chairman will increase the company\'s fortunes.','이사회는 새로 임명된 회장이 기업의 재산을 증식시켜 줄 것이라는 의견을 갖고 있다. 명사절 접속사가 와야함\"opion\"은 동격절을 취하는 명사 임a) which = 동격절 못 만듬b) that = 동격절 만듬c) why = 동격절 못 만듬d) when = 동격절 못 만듬',10),(7,2,'본문이요','문제요','이변없이 이번',11),(8,3,'두 번째 본문입니다.','두 번째 문제입니다.','문제에 답이 이따',11),(9,4,'세 번째 본문입니다.','세 번째 문제입니다.','문제에 답이 이따',11),(10,1,'3','3','3',12),(11,1,'4','4','4',13),(12,1,'5','5','5',14),(13,1,'6','6','6',15),(14,1,'7','7','7',17),(15,1,'8','8','8',16),(16,1,'9','9','9',18),(17,1,'10','10','10',19);
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

-- Dump completed on 2024-02-22 16:52:40
