-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: resort
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `room_id` int NOT NULL,
  `check_in` date NOT NULL,
  `check_out` date NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,9,2,'2025-06-22','2025-06-25',450.00,'pending','2025-06-22 15:36:00'),(2,9,2,'2025-06-22','2025-06-24',300.00,'pending','2025-06-22 15:55:14'),(3,9,3,'2025-06-15','2025-06-23',1600.00,'pending','2025-06-22 18:27:56'),(4,9,4,'2025-06-22','2025-06-24',500.00,'pending','2025-06-22 18:29:04'),(5,9,1,'2025-06-24','2025-06-25',120.00,'pending','2025-06-22 18:32:51'),(6,9,1,'2025-06-23','2025-06-24',120.00,'pending','2025-06-22 18:41:29');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'Classic Room','classic','/assets/rooms/classic1.avif',120.00),(2,'Corner Room','corner','/assets/rooms/corner2.avif',150.00),(3,'Superior Room','superior','/assets/rooms/superior1.jfif',200.00),(4,'Terrace Room','terrace','/assets/rooms/terrace1.jfif',250.00),(5,'Lakeside Villa','luxury_villa','/assets/gallery5.jpg',450.00),(6,'Forest Suite','forest_suite','/assets/gallery2.jfif',350.00),(7,'Executive Room','executive_room','/assets/gallery3.jfif',275.00);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `address` varchar(255) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test','test@example.com','$2b$10$rD71ZaxyI1si3GpOXiczkubC7rIhCyiIaKhJiZRDyf6XsO78X4YXm','user','2025-06-21 17:30:27',NULL,NULL,NULL,NULL),(2,'nisanth ','nis@gmail.com','$2b$10$yW8GhdseSqErpOixNUZ5AuJaTlG6ldMCYpEMRK/VN2BrR5vt3ioXm','user','2025-06-21 17:32:48',NULL,NULL,NULL,NULL),(3,'Nisanth ','nish@gmail.com','$2b$10$7t.RnZKG8Br2HRJleQLLlek/KXTFwb2kw2UZ28TfHLRrYakFmEaGK','user','2025-06-21 17:56:40',NULL,NULL,NULL,NULL),(4,'Nisanth','babd@gmsail.com','$2b$10$QmS/FTVRV.4iajw9UcIf4u7F2MkrNlbTxW/xw8ese..J0OBSESW5O','user','2025-06-22 05:36:18',NULL,NULL,NULL,NULL),(5,'adhii ','aadfg@gmail.com','$2b$10$YFCsxwT9AnXLMocop8ouquuBnhCsMAVlMVkJjZrbn.0OSDw7D7FQe','user','2025-06-22 05:43:00',NULL,NULL,NULL,NULL),(6,'adhii ','adhi@gmail.com','$2b$10$5PQ65LUyM0VttOvi4MnX1OszBJiIs6x04IYgTBL77h9.vVPbCHphW','user','2025-06-22 05:46:06','djbjbskjcbjdb bskjbk sjbfjbs','695573','999999999',NULL),(9,'Nisanth','nisanthsm@icloud.com','$2b$10$awxMRQcBdcuUaTXLHNZx3usFdMZkFNs92wL0SESoRvM.pGZCJKuOC','user','2025-06-22 09:38:18','prsanth bhavan kavalotukonam','695573','9809126735',NULL),(10,'asddada','adhi@gmail.comm','$2b$10$bRvXbKcPdnstPDJtwOqPsOuIDnwrX3waPvtBa0biR/cZr3UdtWeH2','user','2025-06-23 08:10:34','prsanth bhavan kavalotukonam','695573','9809126735',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-23 20:49:36
