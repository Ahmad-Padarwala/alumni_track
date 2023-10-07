-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2023 at 07:43 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alumni`
--

-- --------------------------------------------------------

--
-- Table structure for table `alumni_associate`
--

CREATE TABLE `alumni_associate` (
  `id` int(11) NOT NULL,
  `user_id` int(20) NOT NULL,
  `institute_id` int(20) NOT NULL,
  `join_date` date NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `alumni_education`
--

CREATE TABLE `alumni_education` (
  `id` int(11) NOT NULL,
  `user_id` int(20) NOT NULL,
  `field_study` varchar(200) NOT NULL,
  `institute_name` varchar(200) NOT NULL,
  `study_startDate` date NOT NULL,
  `study_endDate` date NOT NULL,
  `result` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumni_education`
--

INSERT INTO `alumni_education` (`id`, `user_id`, `field_study`, `institute_name`, `study_startDate`, `study_endDate`, `result`) VALUES
(14, 3, 'BCA', 'Gokul Global University', '2023-08-29', '2023-09-25', '9.98 cgpa');

-- --------------------------------------------------------

--
-- Table structure for table `alumni_master`
--

CREATE TABLE `alumni_master` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumni_master`
--

INSERT INTO `alumni_master` (`id`, `email`, `password`, `username`, `status`) VALUES
(3, 'ahmadpadarwala@gmai.com', 'Ahmad', 'Ahmad Padarwala', 1);

-- --------------------------------------------------------

--
-- Table structure for table `alumni_member`
--

CREATE TABLE `alumni_member` (
  `id` int(11) NOT NULL,
  `org_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `join_date` date NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `alumni_profile`
--

CREATE TABLE `alumni_profile` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `profile_picture` varchar(500) NOT NULL,
  `cover_background` varchar(500) NOT NULL,
  `phone_number` bigint(20) NOT NULL,
  `address` varchar(400) NOT NULL,
  `dob` date NOT NULL,
  `gender` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumni_profile`
--

INSERT INTO `alumni_profile` (`id`, `user_id`, `profile_picture`, `cover_background`, `phone_number`, `address`, `dob`, `gender`) VALUES
(24, 3, 'profile_picture-1696418482145.platform3.webp', 'cover_background-1696418474504.calculate-bg.webp', 7383294925, 'Majadar, Vadgam, BK', '2005-01-02', 'male');

-- --------------------------------------------------------

--
-- Table structure for table `alumni_skill`
--

CREATE TABLE `alumni_skill` (
  `id` int(11) NOT NULL,
  `user_id` int(20) NOT NULL,
  `skill_name` varchar(100) NOT NULL,
  `skill_level` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `alumni_work_detail`
--

CREATE TABLE `alumni_work_detail` (
  `id` int(11) NOT NULL,
  `user_id` int(20) NOT NULL,
  `job_title` varchar(200) NOT NULL,
  `compeny_name` varchar(200) NOT NULL,
  `compeny_location` varchar(200) NOT NULL,
  `job_startDate` date NOT NULL,
  `job_endDate` date NOT NULL,
  `role` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `organization_info`
--

CREATE TABLE `organization_info` (
  `id` int(11) NOT NULL,
  `org_name` varchar(500) NOT NULL,
  `org_logo` varchar(500) NOT NULL,
  `org_description` varchar(500) NOT NULL,
  `address` varchar(500) NOT NULL,
  `contact` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `organization_master`
--

CREATE TABLE `organization_master` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `uname` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `uname`, `password`) VALUES
(1, 'admin', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumni_associate`
--
ALTER TABLE `alumni_associate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `alumni_associate_ibfk_1` (`institute_id`);

--
-- Indexes for table `alumni_education`
--
ALTER TABLE `alumni_education`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `alumni_master`
--
ALTER TABLE `alumni_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `alumni_member`
--
ALTER TABLE `alumni_member`
  ADD PRIMARY KEY (`id`),
  ADD KEY `org_id` (`org_id`);

--
-- Indexes for table `alumni_profile`
--
ALTER TABLE `alumni_profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `alumni_skill`
--
ALTER TABLE `alumni_skill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `alumni_work_detail`
--
ALTER TABLE `alumni_work_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `organization_info`
--
ALTER TABLE `organization_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organization_master`
--
ALTER TABLE `organization_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alumni_associate`
--
ALTER TABLE `alumni_associate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `alumni_education`
--
ALTER TABLE `alumni_education`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `alumni_master`
--
ALTER TABLE `alumni_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `alumni_member`
--
ALTER TABLE `alumni_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `alumni_profile`
--
ALTER TABLE `alumni_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `alumni_skill`
--
ALTER TABLE `alumni_skill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `alumni_work_detail`
--
ALTER TABLE `alumni_work_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `organization_info`
--
ALTER TABLE `organization_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `organization_master`
--
ALTER TABLE `organization_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alumni_associate`
--
ALTER TABLE `alumni_associate`
  ADD CONSTRAINT `alumni_associate_ibfk_1` FOREIGN KEY (`institute_id`) REFERENCES `organization_master` (`id`);

--
-- Constraints for table `alumni_education`
--
ALTER TABLE `alumni_education`
  ADD CONSTRAINT `alumni_education_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `alumni_master` (`id`);

--
-- Constraints for table `alumni_member`
--
ALTER TABLE `alumni_member`
  ADD CONSTRAINT `alumni_member_ibfk_1` FOREIGN KEY (`org_id`) REFERENCES `organization_master` (`id`);

--
-- Constraints for table `alumni_profile`
--
ALTER TABLE `alumni_profile`
  ADD CONSTRAINT `alumni_profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `alumni_master` (`id`);

--
-- Constraints for table `alumni_skill`
--
ALTER TABLE `alumni_skill`
  ADD CONSTRAINT `alumni_skill_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `alumni_master` (`id`);

--
-- Constraints for table `alumni_work_detail`
--
ALTER TABLE `alumni_work_detail`
  ADD CONSTRAINT `alumni_work_detail_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `alumni_master` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
