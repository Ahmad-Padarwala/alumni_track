-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2023 at 12:31 PM
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
(85, 29, 47, '2023-10-26', '2023-10-26', 1),
(86, 35, 55, '2023-10-26', '2023-10-26', 1);

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
(15, 29, 'BCA', 'Gokul Global University', '2021-07-31', '2024-07-31', '87.9%');

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
(35, 'patelamil@gmail.com', 'PatelAmil', 'Amil Patel', 1);

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
(35, 29, 'profile_picture-1698317389170.platform1.png', 'cover_background-1697182843493.calculate-bg.webp', 7383294925, 'Majadar, Vadgam, Bk - 385210', '2005-06-04', 'male'),
(37, 35, 'profile_picture-1697624499756.card2.jpg', 'cover_background-1697624499752.offlinelearning.jpg', 9974898018, 'Majadra`', '2003-06-27', 'male');

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
(11, 29, 'HTML', 10),
(20, 29, 'CSS', 20),
(21, 29, 'JavaScript', 30),
(23, 29, 'php', 40),
(24, 29, 'react', 50),
(25, 29, 'express', 60),
(26, 29, 'sql', 70),
(32, 29, 'NodeJs', 80),
(41, 29, 'MERN', 90),
(42, 29, 'NEXT JS', 100);

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

--
-- Dumping data for table `alumni_work_detail`
--

INSERT INTO `alumni_work_detail` (`id`, `user_id`, `job_title`, `compeny_name`, `compeny_location`, `job_startDate`, `job_endDate`, `role`) VALUES
(18, 29, ' MERN DEVELOPER', 'VALUDAS TEACH PARK', 'Chhapi, Orchid Complex, BK - 385210', '2021-06-10', '2028-06-27', ''),
(19, 29, 'MERN DEVELOPER', 'VALUDAS TEACH PARK', 'CHHAPI VADGAM BANASJKANTHA - 385210', '2020-06-17', '2022-11-23', '');

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
  `org_shortdesc` longtext NOT NULL,
  `org_longdesc` longtext NOT NULL,
  `address` varchar(500) NOT NULL,
  `website` varchar(200) NOT NULL,
  `status` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organization_info`
--

INSERT INTO `organization_info` (`id`, `user_id`, `org_name`, `org_logo`, `org_bg`, `org_shortdesc`, `org_longdesc`, `address`, `website`, `status`) VALUES
(47, 29, 'Valudas', 'org_logo-1698316411168.book-education-logo-vector-22575068-removebg-preview.png', 'org_bg-1697609943652.e-lerning.jpg', 'At Valuda&#39;s Tech Park, Our prime focus is in the field of IT outsourcing services. We have an experienced, innovative, and dynamic team of experts with a focus to provide web development and mobile application services for individuals, small- and medium-sized businesses, and corporate clients. Our other strengths include Website Development, Application Development (Android &amp; IOS) and Digital Marketing also provide customized solutions as per Customer Need with a 100% Satisfaction Guarantee and can help enrich your presence globally. Our main goal is making a foster long-lasting relationships with clients. where doing good and ethical business is our topmost priority. We take our commitment to our clients very seriously, which is why we&rsquo;ve developed this Code of Ethics outlining the level of service you can expect while doing business with us and ethical business is our bottom line.\r\n<p><br />\r\nWe can fix your Opencart and WordPress issues as below and surely will make you happy with our work :</p>\r\n- Coding Error - Extension Error<br />\r\n- Database Error<br />\r\n- SSL Errors<br />\r\n- Theme Installation and Customize<br />\r\n- Extension Installation, Customization<br />\r\n- Shipping Method Integration/Customization<br />\r\n- Payment Method Integration<br />\r\n- Speed Improvement<br />\r\n<br />\r\nWe also provide SEO Services for your website in order to improve your website traffic and we can rank your website on Google SERP.<br />\r\n<br />\r\nOn-Page SEO<br />\r\nOff-Page SEO<br />\r\nLink Building Technical SEO<br />\r\nPPC<br />\r\nSocial Media Marketing etc.<br />\r\n<br />\r\nWe are high-class professional designers, expert developers, and flawless QA Testers in Themes and Template Designing CMS like WordPress, eCommerce, PHP, Codeigniter, Laravel, Opencart Customize, and Development...<br />\r\n<br />\r\n* Service Guarantee *<br />\r\n#24*7 hours live support.<br />\r\n#Free of cost technical support for a lifetime.<br />\r\n#Satisfaction guarantee otherwise we will refund.<br />\r\n#No charges for deployment.<br />\r\nOverall, Valuda&#39;s Tech Park appears to be a reliable and experienced company that offers a wide range of IT outsourcing services<br />\r\nThank you for your visit...', 'At Valuda&#39;s Tech Park, Our prime focus is in the field of IT outsourcing services. We have an experienced, innovative, and dynamic team of experts with a focus to provide web development and mobile application services for individuals, small- and medium-sized businesses, and corporate clients. Our other strengths include Website Development, Application Development (Android &amp; IOS) and Digital Marketing also provide customized solutions as per Customer Need with a 100% Satisfaction Guarantee and can help enrich your presence globally. Our main goal is making a foster long-lasting relationships with clients. where doing good and ethical business is our topmost priority. We take our commitment to our clients very seriously, which is why we&rsquo;ve developed this Code of Ethics outlining the level of service you can expect while doing business with us and ethical business is our bottom line.\r\n<p><br />\r\nWe can fix your Opencart and WordPress issues as below and surely will make you happy with our work :</p>\r\n<br />\r\n- Coding Error - Extension Error<br />\r\n- Database Error<br />\r\n- SSL Errors<br />\r\n- Theme Installation and Customize<br />\r\n- Extension Installation, Customization<br />\r\n- Shipping Method Integration/Customization<br />\r\n- Payment Method Integration<br />\r\n- Speed Improvement<br />\r\n<br />\r\nWe also provide SEO Services for your website in order to improve your website traffic and we can rank your website on Google SERP.<br />\r\n<br />\r\nOn-Page SEO<br />\r\nOff-Page SEO<br />\r\nLink Building Technical SEO<br />\r\nPPC<br />\r\nSocial Media Marketing etc.<br />\r\n<br />\r\nWe are high-class professional designers, expert developers, and flawless QA Testers in Themes and Template Designing CMS like WordPress, eCommerce, PHP, Codeigniter, Laravel, Opencart Customize, and Development...<br />\r\n<br />\r\n* Service Guarantee *<br />\r\n#24*7 hours live support.<br />\r\n#Free of cost technical support for a lifetime.<br />\r\n#Satisfaction guarantee otherwise we will refund.<br />\r\n#No charges for deployment.<br />\r\nOverall, Valuda&#39;s Tech Park appears to be a reliable and experienced company that offers a wide range of IT outsourcing services<br />\r\nThank you for your visit...<br />\r\n<br />\r\n<cite><big><strong>Website</strong></big></cite><br />\r\n<a href=\"https://valudas.com/\" onclick=\"window.open(this.href, \'websitemodule\', \'resizable=yes,status=yes,location=yes,toolbar=yes,menubar=yes,fullscreen=yes,scrollbars=yes,dependent=yes,width=50%,left=20%,height=30%,top=20%\'); return false;\">http://www.valudas.com</a><br />\r\n<br />\r\n<big><cite><strong><var>Phone</var></strong></cite></big><br />\r\n<a href=\"tel:9104190049\" onclick=\"window.open(this.href, \'\', \'resizable=no,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no\'); return false;\">9104190049</a><br />\r\n<br />\r\n<big><strong>Industry</strong></big><br />\r\nInformation Technology &amp; Services<br />\r\n<br />\r\n<big><strong>Company size</strong></big><br />\r\n2-10 employees<br />\r\n7 on LinkedIn<br />\r\n<br />\r\n<big><strong>Headquarters</strong></big><br />\r\nChhapi, GUJARAT<br />\r\n<br />\r\n<big><strong>Founded</strong></big><br />\r\n<cite><small><em>2021</em></small></cite><br />\r\n<br />\r\n<big><strong>Specialties</strong></big><br />\r\nWebsite Development, Digital Marketing, Wordpress, Opencart, OSCommerce, WooCommerce, SEO, SEM, SMO, SMM, Technical SEO, Link Building, Coding Error, Extension Error, Database Error, SSL Errors, Theme Installation and Customize, Shipping Method Integration/Customization, Payment Method Integration, Speed Improvement, Laravel, Codeigniter, Laravel, Opencart Customize, and Development, PHP, and onlinemarketing\r\n<p>&nbsp;</p>\r\n', 'Orchid Complex, Chhapi, Banaskantha Gujarat - 385210', 'valudas.com', 1),
(55, 35, 'majadar', 'org_logo-1698299542901.e-lerning.jpg', 'org_bg-1698299542905.calculate-bg.webp', 'dcds', 'sdcdsd', 'jsbdcysdcds', 'majadar.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `org_post`
--

CREATE TABLE `org_post` (
  `id` int(11) NOT NULL,
  `org_id` int(10) NOT NULL,
  `post_title` varchar(500) NOT NULL,
  `post_image` varchar(500) NOT NULL,
  `post_video` varchar(1000) NOT NULL,
  `post_send` varchar(100) NOT NULL,
  `post_date` date NOT NULL
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

-- --------------------------------------------------------

--
-- Table structure for table `user_post`
--

CREATE TABLE `user_post` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `post_title` varchar(500) NOT NULL,
  `post_image` varchar(500) NOT NULL,
  `post_video` varchar(100) NOT NULL,
  `post_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_post`
--

INSERT INTO `user_post` (`id`, `user_id`, `post_title`, `post_image`, `post_video`, `post_date`) VALUES
(20, 29, 'kcmkcks', '', '', '2023-10-29'),
(21, 29, 'scnjs', 'post_image-1698579025394.calculate-bg.webp', '', '2023-10-29');

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
-- Indexes for table `org_post`
--
ALTER TABLE `org_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `org_id` (`org_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_post`
--
ALTER TABLE `user_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alumni_associate`
--
ALTER TABLE `alumni_associate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `alumni_education`
--
ALTER TABLE `alumni_education`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `alumni_master`
--
ALTER TABLE `alumni_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `alumni_member`
--
ALTER TABLE `alumni_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `alumni_profile`
--
ALTER TABLE `alumni_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `alumni_skill`
--
ALTER TABLE `alumni_skill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `alumni_work_detail`
--
ALTER TABLE `alumni_work_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `organization_info`
--
ALTER TABLE `organization_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `org_post`
--
ALTER TABLE `org_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_post`
--
ALTER TABLE `user_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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

--
-- Constraints for table `org_post`
--
ALTER TABLE `org_post`
  ADD CONSTRAINT `org_post_ibfk_1` FOREIGN KEY (`org_id`) REFERENCES `organization_info` (`id`);

--
-- Constraints for table `user_post`
--
ALTER TABLE `user_post`
  ADD CONSTRAINT `user_post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `alumni_master` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
