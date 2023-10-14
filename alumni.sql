-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2023 at 02:39 PM
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
  `org_id` int(20) NOT NULL,
  `request_date` date NOT NULL,
  `join_date` date NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumni_associate`
--

INSERT INTO `alumni_associate` (`id`, `user_id`, `org_id`, `request_date`, `join_date`, `status`) VALUES
(1, 31, 46, '2023-10-14', '0000-00-00', 0),
(2, 29, 46, '2023-10-14', '0000-00-00', 0);

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
(15, 29, 'BCA', 'Gokul Global University', '2021-08-05', '2024-08-05', '87.9%');

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
(29, 'ahmadpadarwala@gmail.com', 'Ahmad@123', 'Ahmad Padarwala', 1),
(31, 'amilpatel@gmail.com', 'AmilPatel', 'Amil Patel', 1);

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
(35, 29, 'profile_picture-1697182843494.platform3.webp', 'cover_background-1697182843493.calculate-bg.webp', 7383294925, 'Majadar, Vadgam, Bk - 385210', '2005-06-07', 'male'),
(36, 31, 'profile_picture-1697280679600.card4.webp', 'cover_background-1697280679595.aboutImg.jpg', 7383294925, 'Majadar, Vadgam, Bk - 385210', '2003-02-12', 'male');

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

--
-- Dumping data for table `alumni_skill`
--

INSERT INTO `alumni_skill` (`id`, `user_id`, `skill_name`, `skill_level`) VALUES
(11, 29, 'HTML', 80);

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
  `user_id` int(11) NOT NULL,
  `org_name` varchar(500) NOT NULL,
  `org_logo` varchar(500) NOT NULL,
  `org_bg` varchar(500) NOT NULL,
  `org_shortdesc` varchar(1000) NOT NULL,
  `org_longdesc` longtext NOT NULL,
  `address` varchar(500) NOT NULL,
  `website` varchar(200) NOT NULL,
  `status` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organization_info`
--

INSERT INTO `organization_info` (`id`, `user_id`, `org_name`, `org_logo`, `org_bg`, `org_shortdesc`, `org_longdesc`, `address`, `website`, `status`) VALUES
(46, 29, 'Valudas', 'org_logo-1697268823650.platform4.png', 'org_bg-1697268823651.calculate-bg.webp', '<p>At Valuda&#39;s Tech Park, Our prime focus is in the field of IT outsourcing services. We have an experienced, innovative, and dynamic team of experts with a focus to provide web development and mobile application services for individuals, small- and medium-sized businesses, and corporate clients.</p>\r\n', '<p>At Valuda&#39;s Tech Park, Our prime focus is in the field of IT outsourcing services. We have an experienced, innovative, and dynamic team of experts with a focus to provide web development and mobile application services for individuals, small- and medium-sized businesses, and corporate clients. Our other strengths include Website Development, Application Development (Android &amp; IOS) and Digital Marketing also provide customized solutions as per Customer Need with a 100% Satisfaction Guarantee and can help enrich your presence globally. Our main goal is making a foster long-lasting relationships with clients. where doing good and ethical business is our topmost priority. We take our commitment to our clients very seriously, which is why we&rsquo;ve developed this Code of Ethics outlining the level of service you can expect while doing business with us and ethical business is our bottom line. We can fix your Opencart and WordPress issues as below and surely will make you happy with our work : - Coding Error - Extension Error - Database Error - SSL Errors - Theme Installation and Customize - Extension Installation, Customization - Shipping Method Integration/Customization - Payment Method Integration - Speed Improvement We also provide SEO Services for your website in order to improve your website traffic and we can rank your website on Google SERP. On-Page SEO Off-Page SEO Link Building Technical SEO PPC Social Media Marketing etc. We are high-class professional designers, expert developers, and flawless QA Testers in Themes and Template Designing CMS like WordPress, eCommerce, PHP, Codeigniter, Laravel, Opencart Customize, and Development... * Service Guarantee * #24*7 hours live support. #Free of cost technical support for a lifetime. #Satisfaction guarantee otherwise we will refund. #No charges for deployment. Overall, Valuda&#39;s Tech Park appears to be a reliable and experienced company that offers a wide range of IT outsourcing services Thank you for your visit...</p>\r\n\r\n<h2><strong>Website</strong></h2>\r\n\r\n<p><a href=\"http://www.valudas.com/\" target=\"_blank\">http://www.valudas.com</a></p>\r\n\r\n<h2><strong>Phone</strong></h2>\r\n\r\n<p><a href=\"tel:9104190049\" target=\"_blank\">9104190049 Phone number is 9104190049</a></p>\r\n\r\n<p>Industry<br />\r\nInformation Technology &amp; Services<br />\r\nCompany size<br />\r\n2-10 employees<br />\r\n7 on LinkedIn&nbsp;Includes members with current employer listed as Valudas Tech Park, including part-time roles.<br />\r\nHeadquarters<br />\r\nChhapi, GUJARAT<br />\r\nFounded<br />\r\n2021</p>\r\n\r\n<h2><strong>Specialties</strong></h2>\r\n\r\n<p>Website Development, Digital Marketing, Wordpress, Opencart, OSCommerce, WooCommerce, SEO, SEM, SMO, SMM, Technical SEO, Link Building, Coding Error, Extension Error, Database Error, SSL Errors, Theme Installation and Customize, Shipping Method Integration/Customization, Payment Method Integration, Speed Improvement, Laravel, Codeigniter, Laravel, Opencart Customize, and Development, PHP, and onlinemarketing</p>\r\n', 'Orchid complex, Chhapi, Gujarat, BK - 385210', 'www.valudas.com', 1);

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
  ADD KEY `alumni_associate_ibfk_1` (`org_id`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `organization_info_ibfk_1` (`user_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `alumni_education`
--
ALTER TABLE `alumni_education`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `alumni_master`
--
ALTER TABLE `alumni_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `alumni_member`
--
ALTER TABLE `alumni_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `alumni_profile`
--
ALTER TABLE `alumni_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `alumni_skill`
--
ALTER TABLE `alumni_skill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `alumni_work_detail`
--
ALTER TABLE `alumni_work_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `organization_info`
--
ALTER TABLE `organization_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

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
  ADD CONSTRAINT `alumni_associate_ibfk_1` FOREIGN KEY (`org_id`) REFERENCES `organization_info` (`id`);

--
-- Constraints for table `alumni_education`
--
ALTER TABLE `alumni_education`
  ADD CONSTRAINT `alumni_education_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `alumni_master` (`id`);

--
-- Constraints for table `alumni_member`
--
ALTER TABLE `alumni_member`
  ADD CONSTRAINT `alumni_member_ibfk_1` FOREIGN KEY (`org_id`) REFERENCES `organization_info` (`id`);

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

--
-- Constraints for table `organization_info`
--
ALTER TABLE `organization_info`
  ADD CONSTRAINT `organization_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `alumni_master` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
