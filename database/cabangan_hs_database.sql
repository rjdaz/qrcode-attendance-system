-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2025 at 04:59 PM
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
(55, 1, 1, 0, '2025-10-15', '22:58:00', NULL, 'Present');

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
  `days` enum('Mon, Tue, Thu','Tue','Wed','Thu','Fri') NOT NULL,
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
(1, 'ENG10INT', 'English', 'English', 'Mon, Tue, Thu', '07:00:00', '08:00:00', 'Integrity', 5, 3, 2, '2025-09-21 22:51:21', '2025-10-13 20:17:23'),
(3, 'ENG10CUR', 'English', 'English', 'Wed', '09:00:00', '10:00:00', 'Curie', 5, 3, 1, '2025-09-23 18:58:28', '2025-10-08 19:24:05');

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
(1, 'S250001', 'sysAdmin01', '$2y$10$YyqkpqOQlwbBEY4sQolq5ea4Z9eAXDwnISkbgZVyl.3PctA..b45q', 'Ryan Jake', 'Daz', 'rjdaz@gmail.com', '09123456789', 'System Admin', 1, 3, '2025-09-23 18:14:26', '2025-09-18 22:58:56', '2025-09-23 18:14:26', 'active'),
(2, 'S250002', 'sysAdmSupport01', '$2y$10$Rytkpm9LZAHP0iXrOu5tCeL2qRHS64UOiFAL0am0gEMoj37KIm4jm', 'Joyce Mariane', 'Dagsil', 'joycemariane@gmail.com', '09171234567', 'System Admin Support', 1, 4, NULL, '2025-09-18 23:11:48', '2025-09-20 00:40:46', 'active'),
(3, 'S250003', 'sysAdmSupport02', '$2y$10$UeJlioPdNMo4GdyvGsLnfuAu3PbpOzEcWGd.h5ZOjLJ/7G2pfd92i', 'Roince', 'Jumao-as', 'roince@gmail.com', '09123456789', 'System Admin Support', 1, 4, NULL, '2025-09-18 23:16:43', '2025-09-20 00:41:02', 'active'),
(4, 'S250004', 'registrar01', '$2y$10$0gaZ.0uxKPhqIPQD6ezC5Oef51jWhc3qVYSKdiq7xHtT41qq7WwjW', 'Marie', 'Dela Cruz', 'delacruz@gmail.com', '09123456789', 'Registrar', 2, 5, '2025-10-08 17:01:21', '2025-09-18 23:28:16', '2025-10-08 17:01:21', 'active'),
(5, 'S250005', 'teacher01', '$2y$10$Vol7.A3i/o7PglQ4foXVRe4mkSGtskHCNmQJE7RoJqvSOApmgez4u', 'Daren', 'Daz', 'daren@gmail.com', '09987456321', 'Teacher', 3, 2, '2025-10-14 20:43:23', '2025-09-18 23:40:56', '2025-10-14 20:43:23', 'active'),
(7, 'S250006', 'Teacher02', '$2y$10$/bbtkieNFlK3x9pBYbjv8eJL/FOyofhrEzSiznFEL8wSHJZNFcSKy', 'Juan', 'Dela Cruz', 'delaCruz1@gmail.com', '09171234566', 'Teacher', 3, 2, '2025-10-12 18:53:36', '2025-10-02 20:56:04', '2025-10-12 18:53:36', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`attendance_id`);

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
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

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
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `users_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

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
