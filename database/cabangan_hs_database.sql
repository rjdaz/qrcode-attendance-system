-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2025 at 02:14 PM
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
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `attendance_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `time_in` time DEFAULT NULL,
  `time_out` time DEFAULT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`attendance_id`, `student_id`, `section_id`, `teacher_id`, `date`, `time_in`, `time_out`, `status`) VALUES
(54, 1, 1, 0, '2025-10-14', '10:54:59', NULL, 'Present'),
(55, 1, 1, 0, '2025-10-17', '22:58:00', NULL, 'Present'),
(56, 2, 1, 0, '2025-10-17', '10:06:17', NULL, 'Present'),
(77, 1, 1, 0, '2025-10-21', '00:58:41', NULL, 'Late'),
(78, 2, 1, 0, '2025-10-26', '12:23:06', NULL, 'Present'),
(80, 3, 1, 0, '2025-10-26', '12:55:03', NULL, 'Present'),
(81, 5, 1, 0, '2025-10-26', '13:03:45', NULL, 'Present'),
(82, 4, 1, 0, '2025-10-26', '13:05:37', NULL, 'Present'),
(83, 6, 1, 0, '2025-10-26', '13:22:35', NULL, 'Present'),
(84, 7, 1, 0, '2025-10-26', '13:25:52', NULL, 'Present'),
(85, 8, 1, 0, '2025-10-26', '13:28:22', NULL, 'Present'),
(86, 9, 1, 0, '2025-10-26', '13:29:29', NULL, 'Late'),
(87, 11, 1, 0, '2025-10-26', '13:31:43', NULL, 'Late'),
(88, 10, 1, 0, '2025-10-26', '13:33:15', NULL, 'Late'),
(90, 1, 1, 0, '2025-10-26', '20:47:26', NULL, 'Present'),
(91, 1, 1, 0, '2025-10-28', '13:57:21', '14:13:23', 'Present'),
(93, 2, 1, 0, '2025-10-28', '15:07:04', NULL, 'Present'),
(94, 1, 1, 0, '2025-10-30', '21:14:06', NULL, 'Late'),
(95, 1, 1, 0, '2025-10-30', '00:06:31', NULL, 'Present'),
(96, 2, 1, 0, '2025-10-31', '01:10:07', NULL, 'Present'),
(97, 1, 1, 0, '2025-10-31', '16:01:49', NULL, 'Late'),
(98, 1, 1, 0, '2025-11-02', '19:09:41', NULL, 'Late'),
(99, 2, 1, 0, '2025-11-02', '19:50:25', NULL, 'Late');

-- --------------------------------------------------------

--
-- Table structure for table `attendances_per_subject`
--

CREATE TABLE `attendances_per_subject` (
  `attendances_subjects_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `section_id` int(11) DEFAULT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `time` time DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendances_per_subject`
--

INSERT INTO `attendances_per_subject` (`attendances_subjects_id`, `student_id`, `subject_id`, `teacher_id`, `section_id`, `date`, `time`, `status`) VALUES
(1, 1, 1, 5, 1, '2025-10-28', '17:37:41', 'Present'),
(12, 1, 3, 5, 1, '2025-10-28', '08:00:00', 'Present'),
(13, 2, 3, 5, 1, '2025-10-28', '08:00:00', 'Present'),
(23, 2, 4, 5, 1, '2025-10-31', '01:58:20', 'Present'),
(25, 1, 4, 5, 1, '2025-10-31', '16:19:20', 'Late'),
(26, 1, 3, 5, 1, '2025-11-02', '19:09:51', 'Late'),
(27, 2, 3, 5, 1, '2025-11-02', '19:52:03', 'Late');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` int(11) NOT NULL,
  `dept_name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `dept_name`, `created_at`, `updated_at`) VALUES
(1, 'System Admin', '2025-09-19 00:05:13', '2025-09-19 00:05:13'),
(2, 'Admin', '2025-09-19 00:05:45', '2025-09-19 00:05:45'),
(3, 'Teacher', '2025-09-19 00:06:06', '2025-09-19 00:06:06'),
(4, 'Utility', '2025-09-19 00:06:19', '2025-09-19 00:06:19'),
(5, 'Security', '2025-09-19 00:06:31', '2025-09-19 00:06:31');

-- --------------------------------------------------------

--
-- Table structure for table `gradelevel`
--

CREATE TABLE `gradelevel` (
  `grade_level_id` int(11) NOT NULL,
  `grade_name` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gradelevel`
--

INSERT INTO `gradelevel` (`grade_level_id`, `grade_name`, `created_at`, `updated_at`) VALUES
(1, 'Grade 7', '2025-09-19 23:55:33', '2025-09-19 23:55:33'),
(2, 'Grade 8', '2025-09-19 23:55:54', '2025-09-19 23:55:54'),
(3, 'Grade 9', '2025-09-19 23:56:10', '2025-09-19 23:56:10'),
(4, 'Grade 10', '2025-09-19 23:56:10', '2025-09-19 23:56:10'),
(5, 'Grade 11', '2025-09-19 23:56:27', '2025-09-19 23:56:27'),
(6, 'Grade 12', '2025-09-19 23:56:27', '2025-09-19 23:56:27');

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

CREATE TABLE `organization` (
  `organization_id` int(11) NOT NULL,
  `unit_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organization`
--

INSERT INTO `organization` (`organization_id`, `unit_name`, `description`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Non-Teaching Staff', 'Non-teaching staff are personnel in schools, colleges, or universities who provide administrative, technical, and support services to assist in the delivery of education', '2025-09-18 21:07:29', '2025-09-18 21:07:29', 'active'),
(2, 'Teaching Staff', 'Teaching staff are employees in a school, college, or university who are directly involved in educating students. Their primary responsibility is to deliver lessons, guide learning, assess performance, and support student development in academic or technical subjects.', '2025-09-18 21:17:55', '2025-09-18 21:17:55', 'active'),
(3, 'System Admin', 'is an IT professional responsible for the setup, configuration, maintenance, and security of computer systems, servers, networks, and software applications.', '2025-09-18 21:20:07', '2025-09-18 21:20:07', 'active'),
(4, 'System Admin Support', 'System Admin Support staff are responsible for assisting the System Administrator in maintaining and managing the organization’s IT infrastructure. Their role focuses on technical support, troubleshooting, and day-to-day operational assistance to ensure that systems, networks, and applications run smoothly for all users.', '2025-09-18 21:32:02', '2025-09-18 21:32:02', 'active'),
(5, 'Registrar', 'A Registrar is an administrative officer responsible for maintaining and safeguarding student academic records, enrollment data, and official school documents.', '2025-09-18 23:35:25', '2025-09-18 23:35:25', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `section_id` int(11) NOT NULL,
  `section_role` varchar(255) DEFAULT NULL,
  `section_name` varchar(100) NOT NULL,
  `grade_level_id` int(11) DEFAULT NULL,
  `adviser_teacher_id` int(11) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`section_id`, `section_role`, `section_name`, `grade_level_id`, `adviser_teacher_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Curie-Grade 7', 'Curie', 1, 5, 'active', '2025-09-20 00:10:42', '2025-10-02 00:30:43'),
(2, 'Integrity-Grade 10', 'Integrity', 4, 7, 'active', '2025-09-20 00:16:59', '2025-10-02 20:57:41');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `roll_number` varchar(50) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `enrollment_date` date NOT NULL,
  `status` enum('active','inactive','graduated','dropped') DEFAULT 'active',
  `grade_level` int(11) NOT NULL,
  `section` int(11) NOT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `roll_number`, `first_name`, `last_name`, `middle_name`, `email`, `phone_number`, `date_of_birth`, `gender`, `address`, `enrollment_date`, `status`, `grade_level`, `section`, `organization_id`, `created_at`, `updated_at`) VALUES
(1, 'S202501', 'Ryan Jake', 'Daz', 'Guiriba', 'daz@gmail.com', '09123456789', '1995-10-22', 'male', 'P1 It-ba Manito Albay', '2025-09-29', 'active', 1, 1, 1, '2025-09-29 14:13:42', '2025-09-29 14:13:42'),
(2, 'S250002', 'Roince', 'Jumao-as', 'R', 'roince@gmail.com', '09123456789', '2005-10-21', 'male', 'Donsol, Sorsogon City', '2025-10-08', 'active', 1, 1, 1, '2025-10-08 17:15:43', '2025-10-08 17:15:43'),
(3, 'S250003', 'Angelica', 'Reyes', 'M', 'angelica.reyes@gmail.com', '09123456780', '2006-03-15', 'female', 'Legazpi City, Albay', '2025-10-08', 'active', 1, 1, 1, '2025-10-08 17:20:53', '2025-10-08 17:20:53'),
(4, 'S250004', 'Mark', 'Villanueva', 'T', 'mark.villanueva@gmail.com', '09123456781', '2006-07-22', 'male', 'Daraga, Albay', '2025-10-08', 'active', 1, 1, 1, '2025-10-08 17:20:53', '2025-10-08 17:20:53'),
(5, 'S250005', 'Kristine', 'Gomez', 'B', 'kristine.gomez@gmail.com', '09123456782', '2005-12-10', 'female', 'Sto. Domingo, Albay', '2025-10-08', 'active', 1, 1, 1, '2025-10-08 17:20:53', '2025-10-08 17:20:53'),
(6, 'S250006', 'Joshua', 'Santos', 'R', 'joshua.santos@gmail.com', '09123456783', '2005-05-05', 'male', 'Camalig, Albay', '2025-10-08', 'active', 1, 1, 1, '2025-10-08 17:20:53', '2025-10-08 17:20:53'),
(7, 'S250007', 'Mae', 'Lopez', 'C', 'mae.lopez@gmail.com', '09123456784', '2006-09-18', 'female', 'Tabaco City, Albay', '2025-10-08', 'active', 1, 1, 1, '2025-10-08 17:20:53', '2025-10-08 17:20:53'),
(8, 'S250008', 'Christian', 'Garcia', 'L', 'christian.garcia@gmail.com', '09123456785', '2006-01-20', 'male', 'Polangui, Albay', '2025-10-08', 'active', 1, 1, 1, '2025-10-08 17:20:53', '2025-10-08 17:20:53'),
(9, 'S250009', 'Hannah', 'Cruz', 'D', 'hannah.cruz@gmail.com', '09123456786', '2005-04-14', 'female', 'Tiwi, Albay', '2025-10-08', 'active', 1, 1, 1, '2025-10-08 17:20:53', '2025-10-08 17:20:53'),
(10, 'S250010', 'John', 'Mendoza', 'F', 'john.mendoza@gmail.com', '09123456787', '2006-08-09', 'male', 'Guinobatan, Albay', '2025-10-08', 'active', 1, 1, 1, '2025-10-08 17:20:53', '2025-10-08 17:20:53'),
(11, 'S250011', 'Patricia', 'Ramos', 'E', 'patricia.ramos@gmail.com', '09123456788', '2005-10-12', 'female', 'Malinao, Albay', '2025-10-08', 'active', 1, 1, 1, '2025-10-08 17:20:53', '2025-10-08 17:20:53'),
(12, 'S250012', 'Kyle', 'Torres', 'J', 'kyle.torres@gmail.com', '09123456789', '2006-11-30', 'male', 'Ligao City, Albay', '2025-10-08', 'active', 4, 2, 1, '2025-10-08 17:20:53', '2025-10-13 21:10:41');

-- --------------------------------------------------------

--
-- Table structure for table `students_subjects`
--

CREATE TABLE `students_subjects` (
  `student_subject_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `grade_level_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students_subjects`
--

INSERT INTO `students_subjects` (`student_subject_id`, `student_id`, `subject_id`, `grade_level_id`, `section_id`) VALUES
(1, 1, 3, 4, 2),
(3, 2, 3, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(11) NOT NULL,
  `subject_code` varchar(50) NOT NULL,
  `subject_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `days` enum('Mon, Tue, Thu, Fri','Tue','Wed','Thu','Fri','Sun') NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `room_name` varchar(255) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subject_id`, `subject_code`, `subject_name`, `description`, `days`, `start_time`, `end_time`, `room_name`, `teacher_id`, `department_id`, `section_id`, `created_at`, `updated_at`) VALUES
(1, 'ENG10INT', 'English', 'English', 'Mon, Tue, Thu, Fri', '07:00:00', '08:00:00', 'Integrity', 5, 3, 2, '2025-09-21 22:51:21', '2025-10-31 01:34:41'),
(3, 'ENG10CUR', 'English', 'English', 'Sun', '08:00:00', '09:00:00', 'Curie', 5, 3, 1, '2025-09-23 18:58:28', '2025-10-26 12:27:03'),
(4, 'FIL10CUR', 'Filipino', 'Filipino', 'Mon, Tue, Thu, Fri', '16:00:00', '17:00:00', 'Curie', 5, 3, 1, '2025-10-20 23:01:24', '2025-10-31 00:04:06'),
(5, 'MAP10CUR', 'MAPEH', 'MAPEH', 'Mon, Tue, Thu, Fri', '09:00:00', '10:00:00', 'Curie', 5, 3, 1, '2025-10-28 15:49:39', '2025-10-31 00:04:13'),
(6, 'SCI10CUR', 'Science', 'Science', 'Mon, Tue, Thu, Fri', '11:00:00', '12:00:00', 'CURIE', 5, 3, 1, '2025-10-28 15:53:01', '2025-10-31 00:04:20'),
(7, 'ESP10CUR', 'ESP', 'ESP', 'Mon, Tue, Thu, Fri', '12:00:00', '13:00:00', 'Curie', 5, 3, 1, '2025-10-28 15:54:16', '2025-10-31 00:04:26'),
(8, 'TLE10CUR', 'TLE', 'TLE', 'Mon, Tue, Thu, Fri', '13:00:00', '14:00:00', 'Curie', 5, 3, 1, '2025-10-28 16:24:47', '2025-10-31 00:04:32'),
(9, 'AP10CUR', 'AP', 'AP', 'Mon, Tue, Thu, Fri', '14:00:00', '15:00:00', 'Curie', 5, 3, 1, '2025-10-28 16:26:36', '2025-10-31 00:04:38'),
(10, 'MTH10CUR', 'Math', 'Math', 'Mon, Tue, Thu, Fri', '15:00:00', '16:00:00', 'Curie', 5, 3, 1, '2025-10-28 16:28:51', '2025-10-31 00:04:45');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `users_id` int(11) NOT NULL,
  `employee_no` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `position` varchar(100) NOT NULL,
  `department_id` int(100) DEFAULT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('active','inactive','suspended') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`users_id`, `employee_no`, `username`, `password`, `first_name`, `last_name`, `email`, `phone_number`, `position`, `department_id`, `organization_id`, `last_login`, `created_at`, `updated_at`, `status`) VALUES
(1, 'E250001', 'sysAdmin01', '$2y$10$YyqkpqOQlwbBEY4sQolq5ea4Z9eAXDwnISkbgZVyl.3PctA..b45q', 'Ryan Jake', 'Daz', 'rjdaz@gmail.com', '09123456789', 'System Admin', 1, 3, '2025-09-23 18:14:26', '2025-09-18 22:58:56', '2025-10-26 10:07:52', 'active'),
(2, 'E250002', 'sysAdmSupport01', '$2y$10$Rytkpm9LZAHP0iXrOu5tCeL2qRHS64UOiFAL0am0gEMoj37KIm4jm', 'Joyce Mariane', 'Dagsil', 'joycemariane@gmail.com', '09171234567', 'System Admin Support', 1, 4, NULL, '2025-09-18 23:11:48', '2025-10-26 10:08:00', 'active'),
(3, 'E250003', 'sysAdmSupport02', '$2y$10$UeJlioPdNMo4GdyvGsLnfuAu3PbpOzEcWGd.h5ZOjLJ/7G2pfd92i', 'Roince', 'Jumao-as', 'roince@gmail.com', '09123456789', 'System Admin Support', 1, 4, NULL, '2025-09-18 23:16:43', '2025-10-26 10:08:09', 'active'),
(4, 'E250004', 'registrar01', '$2y$10$0gaZ.0uxKPhqIPQD6ezC5Oef51jWhc3qVYSKdiq7xHtT41qq7WwjW', 'Marie', 'Dela Cruz', 'delacruz@gmail.com', '09123456789', 'Registrar', 2, 5, '2025-10-28 17:57:05', '2025-09-18 23:28:16', '2025-10-28 17:57:05', 'active'),
(5, 'E250005', 'teacher01', '$2y$10$Vol7.A3i/o7PglQ4foXVRe4mkSGtskHCNmQJE7RoJqvSOApmgez4u', 'Daren', 'Daz', 'daren@gmail.com', '09987456321', 'Teacher', 3, 2, '2025-11-02 18:49:16', '2025-09-18 23:40:56', '2025-11-02 18:49:16', 'active'),
(7, 'E250006', 'Teacher02', '$2y$10$/bbtkieNFlK3x9pBYbjv8eJL/FOyofhrEzSiznFEL8wSHJZNFcSKy', 'Juan', 'Dela Cruz', 'delaCruz1@gmail.com', '09171234566', 'Teacher', 3, 2, '2025-10-12 18:53:36', '2025-10-02 20:56:04', '2025-10-26 10:08:38', 'active'),
(8, 'E250007', 'Staff01', '$2y$10$KQTRANiD3pDQV.cPvn4pXe8s1IokTlXmYKUKe1UNmZysRxyTCGPA6', 'Rhyan', 'Orosco', 'orosco@gmail.com', '09987456123', 'staff', 5, 1, '2025-10-28 17:57:59', '2025-10-26 10:10:13', '2025-10-28 17:57:59', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`attendance_id`);

--
-- Indexes for table `attendances_per_subject`
--
ALTER TABLE `attendances_per_subject`
  ADD PRIMARY KEY (`attendances_subjects_id`),
  ADD KEY `fk_subject_id_aps` (`student_id`),
  ADD KEY `fk_teacher_id_aps` (`teacher_id`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `fk_section_aps` (`section_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`),
  ADD UNIQUE KEY `dept_name` (`dept_name`);

--
-- Indexes for table `gradelevel`
--
ALTER TABLE `gradelevel`
  ADD PRIMARY KEY (`grade_level_id`),
  ADD UNIQUE KEY `grade_name` (`grade_name`);

--
-- Indexes for table `organization`
--
ALTER TABLE `organization`
  ADD PRIMARY KEY (`organization_id`),
  ADD UNIQUE KEY `unit_name` (`unit_name`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`section_id`),
  ADD KEY `fk_section_grade` (`grade_level_id`),
  ADD KEY `fk_section_teacher` (`adviser_teacher_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `roll_number` (`roll_number`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_students_org` (`organization_id`);

--
-- Indexes for table `students_subjects`
--
ALTER TABLE `students_subjects`
  ADD PRIMARY KEY (`student_subject_id`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`),
  ADD UNIQUE KEY `subject_code` (`subject_code`),
  ADD KEY `fk_subjects_teacher` (`teacher_id`),
  ADD KEY `fk_subjects_dept` (`department_id`),
  ADD KEY `fk_subjects_section` (`section_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_staff_org` (`organization_id`),
  ADD KEY `fk_department_id` (`department_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `attendances_per_subject`
--
ALTER TABLE `attendances_per_subject`
  MODIFY `attendances_subjects_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `gradelevel`
--
ALTER TABLE `gradelevel`
  MODIFY `grade_level_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `organization`
--
ALTER TABLE `organization`
  MODIFY `organization_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `section_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `students_subjects`
--
ALTER TABLE `students_subjects`
  MODIFY `student_subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `users_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendances_per_subject`
--
ALTER TABLE `attendances_per_subject`
  ADD CONSTRAINT `fk_section_aps` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_student_id_aps` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_subject_id_aps` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_teacher_id_aps` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `fk_section_grade` FOREIGN KEY (`grade_level_id`) REFERENCES `gradelevel` (`grade_level_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_section_teacher` FOREIGN KEY (`adviser_teacher_id`) REFERENCES `users` (`users_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `fk_students_org` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`organization_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `students_subjects`
--
ALTER TABLE `students_subjects`
  ADD CONSTRAINT `fk_grade_level_id` FOREIGN KEY (`grade_level_id`) REFERENCES `gradelevel` (`grade_level_id`),
  ADD CONSTRAINT `fk_section_id` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`),
  ADD CONSTRAINT `fk_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  ADD CONSTRAINT `fk_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`);

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `fk_subjects_dept` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_subjects_section` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_subjects_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`users_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_department_id` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  ADD CONSTRAINT `fk_staff_org` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`organization_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
