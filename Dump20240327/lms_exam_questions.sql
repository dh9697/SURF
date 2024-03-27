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
-- Table structure for table `exam_questions`
--

DROP TABLE IF EXISTS `exam_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam_questions` (
  `exam_question_id` bigint NOT NULL AUTO_INCREMENT,
  `correct_option_index` int NOT NULL,
  `quest_paragraph` varchar(500) DEFAULT NULL,
  `question_text` varchar(255) NOT NULL,
  `wrong_ans_expl` varchar(500) NOT NULL,
  `exam_id` bigint NOT NULL,
  PRIMARY KEY (`exam_question_id`),
  KEY `FK5cd6sjmccb11rrwpyabyc81c0` (`exam_id`),
  CONSTRAINT `FK5cd6sjmccb11rrwpyabyc81c0` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_questions`
--

LOCK TABLES `exam_questions` WRITE;
/*!40000 ALTER TABLE `exam_questions` DISABLE KEYS */;
INSERT INTO `exam_questions` VALUES (4,4,NULL,'The staff understands _______ the company funds for corporate activities cannot be disbursed without prior approval from a director.','그 직원은 기업 활동을 위한 회사 자금이 임원의 사전 승인 없이는 지출될 수 없다는 것을 알고 있다. 동사 (understand)의 목적어 자리에 온 명사절의 접속사를 채워야 함.a) they = 대명사b) this = 대명사c) what = 접속사 -> what 이 될 수 없는 이유는 what이 명사절로 쓰일 때 what 다음에는 불완전하나 절이 와야 됨.d) that = 접속사 -> 완전한 절이 왔기 때문에',10),(5,4,'','_______ exits the building last is required to set the office alarm system and lock the main entrance doors.','건물을 마지막으로 나가는 사람은 누구든지 사무실 경보장치를 설정하고 중앙 출입문을 잠가야 한다.주어 자리에 온 절 (exits the builiding last) 앞에는 명사절 접속사가 와야 함.a) anyone = 대명사 -> 명사절을 이끌 수 없음b) whomever = 명사절 접속사 -> 목적격c) someone = 대명사 -> 명사절을 이끌 수 없음d) whoever = 명사절 접속사 -> 주격 (주어 자리이기 때문에 주격이 답이 됨)',10),(6,2,'','The board of directors is of the opinion _______ the newly appointed chairman will increase the company\'s fortunes.','이사회는 새로 임명된 회장이 기업의 재산을 증식시켜 줄 것이라는 의견을 갖고 있다. 명사절 접속사가 와야함\"opion\"은 동격절을 취하는 명사 임a) which = 동격절 못 만듬b) that = 동격절 만듬c) why = 동격절 못 만듬d) when = 동격절 못 만듬',10),(7,4,NULL,'Seldom does Ms. Lerner\'s attention to detail _______ her ability to see the whole picture when making management decisions.','Ms. Lerner의 세부 사항에 대한 주의는 경영상의 결정을 내릴 때 전체 그림을 보는 그녀의 능력에 거의 영향을 미치지 않는다. A) affectedB) to affectC) affectingD) affect부정어 seldom (거의~않은)이 앞에 나와서 도치가 된 문장이라는 것을 알 수 있음. \"does\" (조동사) 가 문장앞에 나가 있음으로 동사원형이 와야 됨.* 도치 = 특정한 단어를 강조하기 위해서 문장 앞으로 나오는 것* 조동사 + 동사원형',11),(8,2,NULL,'Retailers expanding into _______ and competitive markets must develop effective advertising methods to differentiate their products from those of other companies.','안정되고 경재적인 시장으로 사업을 확장시키려는 소매업자들은 그들의 상품을 다른 회사의 상품들과 구분 짓기 위해 효과적인 광고 방법들을 개발해야 한다. A) establish (동사)B) established (형용사)C) establishes (동사)D) establishing (동사)등위접속사 (and) 뒤에 competitive (형용사) 가 있음으로 and 앞에도 형용사가 와야됨',11),(9,4,NULL,'Unless _______ stated, the contact information in this database is up-to-date as of June 30.','달리 명시되어 있지 않은 한, 이 데이터베이스에 있는 연락처 정보는 6월 30일 현재 최신입니다. A) meaniwhile = 그 동안B) otherwise = 그렇지 않으면C) also = 또한D) however = 하지만*unless otherwise는 그 외에 별다른 게 없으면 이라는 표현입니다. 주로 같이 오니까 외우면 편할 거에요',11),(10,4,NULL,'According to the hotel cleaning staff, guests have a tendency to leave their mobile phones and other _______ when checking out.','호텔 청소부 직원에 따르면, 투숙객들이 체크아웃 할 때 그들의 휴대전화 및 다른 소지품들을 두고 가는 경향이 있다.A) belong = ~에 속하다 (동사)B) belongs = ~에 속하다 (동사)C) belonging = 소속감, 속성 (명사)D) belongings = 소지품 (명사)*other 뒤에는 명사가 들어와야 됨으로 A) 와 B) 탈락.*belonging은 불가산 명사로 쓰일 경우 소속감, 속성이라는 뜻이라 문맥에 맞지 않음*belongings은 가산 명사로 쓰일 경우 소지품이기 때문에 문맥이랑 잘 맞음.',12),(11,1,'4','4','4',13),(12,1,'5','5','5',14),(13,1,'6','6','6',15),(14,1,'7','7','7',17),(15,1,'8','8','8',16),(16,1,'9','9','9',18),(17,1,'10','10','10',19),(20,1,'1','1','1',22),(24,3,NULL,' _______ stock runs out during the sale, a customer will be issued a rain check for the item that has sold out.','할인 판매 중 재고가 다 떨어진 경우에, 고객은 품절된 품목의 후일 구매권을 지급 받을 것이다. A) Except that = ~을 제외하고 (부사절 접속사)B) In exchange for = ~의 대신으로 (전치사)C) In the event that = ~할 경우에 (부사절 접속사)D) By means of = ~의 수단으로 (전치사)*_______ stock runs out of during the sale 은 부사절 접속사임으로 A) 또는 C)가 답이다. C)가 문맥상 적합함.',12),(25,3,'','The increased reliability of the subway system, which reopened to the public recently, will impact _______ every commuter who uses it.','최근 대중에게 다시 개방된 지하철에 대한 상승한 신뢰도는 그것을 이용하는 거의 모든 통근자에게 영향을 미칠 것이다.A) any = 어떤B) many = 많은C) almost = 거의D) always = 항상* 어떤 모든 통근자 / 많은 모든 통근자 / 거의 모든 통근자 / 항상 모든 통근자.... 거의 모든 통근자가 맥락에 맞음.',12);
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

-- Dump completed on 2024-03-27 17:12:35
