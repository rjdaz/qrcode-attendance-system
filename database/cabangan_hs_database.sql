-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2025 at 10:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cabangan_hs_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `superadmin`
--

CREATE TABLE `superadmin` (
  `super_admin_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `position` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('active','inactive','suspended') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `superadmin`
--

INSERT INTO `superadmin` (`super_admin_id`, `username`, `password`, `first_name`, `last_name`, `position`, `email`, `phone_number`, `last_login`, `created_at`, `updated_at`, `status`) VALUES
(2, 'admin01', '$2y$10$7CRGFrFvhs4p5Ib7gH6Bxu4HDZk4MFUVyOG.O9kTIXwtbz1wAO/R6', 'Ryan Jake', 'Daz', 'System Administrator', 'admin01@gmail.com', '09171234567', '2025-09-18 16:31:53', '2025-09-18 14:59:01', '2025-09-18 16:31:53', 'active'),
(3, 'support01', '$2y$10$SS69CA.Dub7ffe0GxtQBmeIDDcgohzNS/E.U/SxqKhKHgYRVXxubi', 'Joyce Mariane', 'Dagsil', 'Admin Support', 'adminsupport@gmail.com', '09123456789', '2025-09-18 16:26:39', '2025-09-18 15:57:38', '2025-09-18 16:26:39', 'active'),
(4, 'support02', '$2y$10$BQ6MTo70sxQs5tKjCWrmwOSbuvTOSM9x/dN8yvTy4zyseXJv8Ts6O', 'Roince', 'Jumao-as', 'Admin Support', 'support@gmail.com', '09987456321', '2025-09-18 16:00:40', '2025-09-18 15:58:56', '2025-09-18 16:00:40', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `superadmin`
--
ALTER TABLE `superadmin`
  ADD PRIMARY KEY (`super_admin_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `superadmin`
--
ALTER TABLE `superadmin`
  MODIFY `super_admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
