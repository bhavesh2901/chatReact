-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 21, 2024 at 09:59 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `interect`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pro_pic` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `monumber` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `monumber` (`monumber`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `password`, `gender`, `pro_pic`, `monumber`, `email`, `city`) VALUES
(2, 'bhavesh ', '2901', 'male', 'IMG_20221109_214422_769.jpg', '8798787878', 'chavdabhavesh2901@gmail.com', 'botad'),
(3, 'minal', '2011', 'female', 'dev.....jpg', '89767876', 'minal234@gmail.com', 'surat'),
(4, 'boss', 'boss2901', 'male', '', '7876765678', 'boss2901@gmail.com', 'botad');

-- --------------------------------------------------------

--
-- Table structure for table `dup`
--

DROP TABLE IF EXISTS `dup`;
CREATE TABLE IF NOT EXISTS `dup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_user_id` int(11) NOT NULL,
  `to_user_id` int(11) NOT NULL,
  `msg` text NOT NULL,
  `photo` text NOT NULL,
  `video` text NOT NULL,
  `doc` text NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dup`
--

INSERT INTO `dup` (`id`, `from_user_id`, `to_user_id`, `msg`, `photo`, `video`, `doc`, `create_at`) VALUES
(20, 1, 2, '', 'IMG_20190415_203817.jpg', '', '', '2023-01-14 03:13:20'),
(19, 1, 2, 'hmm', '', '', '', '2023-01-14 03:10:22'),
(21, 1, 12, '', 'â€ª91 99793 38186â€¬ 20190203_204020.jpg', '', '', '2023-04-07 07:57:52'),
(22, 1, 12, '', '3c3c84c4-8cc7-437f-8390-dde7f00b9204.jpg', '', '', '2023-04-07 08:00:23'),
(23, 1, 12, '', 'â€ª91 99793 38186â€¬ 20190203_204020.jpg', '', '', '2023-04-07 08:00:39'),
(24, 1, 12, '', 'â€ª91 99793 38186â€¬ 20190203_204020.jpg', '', '', '2023-04-07 08:01:12'),
(25, 1, 12, '', '3c3c84c4-8cc7-437f-8390-dde7f00b9204.jpg', '', '', '2023-04-07 08:01:22'),
(26, 1, 12, '', '3c3c84c4-8cc7-437f-8390-dde7f00b9204.jpg', '', '', '2023-04-07 08:05:25'),
(27, 1, 12, '', '20190310_172041.jpg', '', '', '2023-04-07 08:15:44'),
(28, 1, 11, '', '4ac6723c4b5e8c92415df02570165c90 copy.png', '', '', '2023-04-07 08:31:25'),
(29, 1, 12, '', '20190310_172041.jpg', '', '', '2023-04-08 08:52:03'),
(30, 1, 12, 'hii\r\nhii', '', '', '', '2023-04-13 08:11:56'),
(31, 1, 12, '', '', 'Agar Tum Na Hote (Humein Aur Jeene Ki) - Sonu Kakkar_Full-HD.mp4', '', '2023-04-13 08:12:40'),
(32, 1, 13, 'hii', '', '', '', '2023-04-13 08:13:14');

-- --------------------------------------------------------

--
-- Table structure for table `follow_list`
--

DROP TABLE IF EXISTS `follow_list`;
CREATE TABLE IF NOT EXISTS `follow_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `follower_id` int(11) NOT NULL,
  `userid` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `follow_list`
--

INSERT INTO `follow_list` (`id`, `follower_id`, `userid`) VALUES
(1, 2, '1'),
(2, 3, '1'),
(3, 4, '1'),
(4, 5, '1'),
(6, 1, '2'),
(7, 1, '3'),
(8, 1, '4'),
(9, 6, '1'),
(13, 1, '6'),
(15, 8, '5'),
(16, 1, '8'),
(24, 8, '2'),
(22, 2, '8');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `likeimg` text NOT NULL,
  `likename` text NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=142 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `likeimg`, `likename`, `post_id`, `user_id`, `status`) VALUES
(140, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 31, 1, 1),
(81, '3c3c84c4-8cc7-437f-8390-dde7f00b9204.jpg', 'Bhavesh ', 15, 1, 1),
(84, 'profileboy.png', 'jaydip', 31, 2, 1),
(85, 'profileboy.png', 'jaydip', 11, 2, 1),
(88, '3c3c84c4-8cc7-437f-8390-dde7f00b9204.jpg', 'Bhavesh ', 7, 1, 1),
(133, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 11, 1, 1),
(135, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 12, 1, 1),
(139, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 39, 1, 1),
(134, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 44, 1, 1),
(129, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 46, 1, 1),
(132, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 47, 1, 1),
(136, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 42, 1, 1),
(137, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 6, 1, 1),
(138, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 45, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_user_id` int(11) DEFAULT NULL,
  `to_user_id` int(11) DEFAULT NULL,
  `msg` text,
  `photo` text,
  `video` text,
  `doc` text,
  `read_status` int(11) DEFAULT '0',
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=273 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `from_user_id`, `to_user_id`, `msg`, `photo`, `video`, `doc`, `read_status`, `create_at`) VALUES
(1, 1, 2, 'hii bhavesh', '', '', '', 1, '2022-10-09 00:40:07'),
(4, 2, 1, 'i am fine bhavesh', '', '', '', 1, '2022-10-09 00:41:07'),
(10, 3, 1, 'hii', '', '', '', 1, '2022-10-09 14:53:47'),
(17, 4, 1, 'hii', '', '', '', 1, '2022-10-10 04:01:07'),
(12, 5, 1, 'hii ', '', '', '', 1, '2022-10-10 03:06:42'),
(14, 4, 1, 'namste', '', '', '', 1, '2022-10-10 03:09:30'),
(106, 1, 2, '', '', 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', '', 1, '2022-11-14 03:19:50'),
(63, 1, 4, 'hii', '', '', '', 1, '2022-10-12 16:53:39'),
(125, 2, 1, 'hii', '', '', '', 1, '2022-11-24 04:32:42'),
(82, 3, 1, 'whats up', '', '', '', 1, '2022-10-12 22:26:18'),
(83, 1, 3, 'i  am fine', '', '', '', 1, '2022-10-12 22:26:49'),
(84, 3, 1, 'ok', '', '', '', 1, '2022-10-12 22:33:20'),
(126, 1, 2, NULL, 'https://photographylife.com/wp-content/uploads/2014/09/Nikon-D750-Image-Samples-2.jpg', '', '', 1, '2022-11-24 04:36:51'),
(141, 12, 1, 'hii', '', '', '', 1, '2022-12-18 11:47:26'),
(142, 12, 1, 'bhavesh', '', '', '', 1, '2022-12-18 11:47:32'),
(143, 13, 1, 'hii', '', '', '', 1, '2022-12-18 11:49:13'),
(144, 13, 1, 'bhavesh', '', '', '', 1, '2022-12-18 11:49:18'),
(145, 1, 11, 'hii', '', '', '', 0, '2022-12-18 11:56:14'),
(186, 1, 11, '', '', '', 'Adobe Scan 12 Feb 2021.pdf', 0, '2023-04-07 08:43:15'),
(187, 1, 12, '', '20190310_172041.jpg', '', '', 0, '2023-04-08 08:52:03'),
(183, 1, 11, '', '', 'Agar Tum Na Hote (Humein Aur Jeene Ki) - Sonu Kakkar_Full-HD.mp4', '', 0, '2023-04-07 08:26:15'),
(190, 1, 13, 'hii', '', '', '', 0, '2023-04-13 08:13:14'),
(191, 1, 2, 'bhavesh', NULL, NULL, NULL, 1, '2024-11-05 12:16:04'),
(192, 1, 2, 'hii', NULL, NULL, NULL, 1, '2024-11-05 12:16:16'),
(193, 1, 2, 'relex', NULL, NULL, NULL, 1, '2024-11-05 12:19:07'),
(194, 2, 1, 'ok bhavesh ', NULL, NULL, NULL, 1, '2024-11-05 12:23:32'),
(195, 1, 6, 'hii om', NULL, NULL, NULL, 1, '2024-11-08 09:21:20'),
(196, 1, 6, 'how are you ', NULL, NULL, NULL, 1, '2024-11-08 09:21:28'),
(197, 1, 6, 'what are you doing right now  !', NULL, NULL, NULL, 1, '2024-11-08 09:21:40'),
(198, 6, 1, 'i am fine bhavesh what about you ', NULL, NULL, NULL, 1, '2024-11-08 09:22:49'),
(199, 6, 1, 'hii ', NULL, NULL, NULL, 1, '2024-11-08 10:18:18'),
(200, 1, 6, 'hii bhavesh', NULL, NULL, NULL, 1, '2024-11-08 10:18:26'),
(201, 6, 1, 'ok what are you doing right now ', NULL, NULL, NULL, 1, '2024-11-08 10:18:51'),
(202, 1, 6, 'just nothing bro', NULL, NULL, NULL, 1, '2024-11-08 10:19:01'),
(203, 6, 1, 'hii bhavesh', NULL, NULL, NULL, 1, '2024-11-08 10:48:32'),
(204, 1, 2, 'hii', NULL, NULL, NULL, 1, '2024-11-08 11:55:39'),
(245, 1, 6, NULL, 'assets\\chatPhoto\\rn7u25q2d1731309138675.jpg', NULL, NULL, 1, '2024-11-11 07:12:19'),
(243, 1, 2, NULL, 'assets\\chatPhoto\\20k84luhy1731308923043.jpg', NULL, NULL, 1, '2024-11-11 07:08:43'),
(244, 1, 2, NULL, 'assets\\chatPhoto\\c60vv7psk1731309118091.jpg', NULL, NULL, 1, '2024-11-11 07:11:58'),
(242, 1, 2, NULL, 'assets\\chatPhoto\\mlrytghp81731308914911.jpg', NULL, NULL, 1, '2024-11-11 07:08:35'),
(246, 1, 3, 'hii jignesh how are you are you fine what about you please tell me ', NULL, NULL, NULL, 1, '2024-11-12 07:15:40'),
(247, 1, 4, 'hii mukesh how are you ', NULL, NULL, NULL, 1, '2024-11-12 07:19:42'),
(248, 1, 4, 'hii mukesh ', NULL, NULL, NULL, 1, '2024-11-12 07:20:09'),
(249, 1, 4, 'hello mukesh', NULL, NULL, NULL, 1, '2024-11-12 07:21:42'),
(250, 1, 3, 'hello', NULL, NULL, NULL, 1, '2024-11-12 07:22:22'),
(251, 1, 6, 'hii', NULL, NULL, NULL, 1, '2024-11-12 07:30:17'),
(252, 6, 1, 'what about you bhavesh', NULL, NULL, NULL, 1, '2024-11-12 07:31:19'),
(253, 1, 6, 'hii om', NULL, NULL, NULL, 1, '2024-11-12 09:40:36'),
(254, 6, 1, 'hii bhavesh', NULL, NULL, NULL, 1, '2024-11-12 10:14:43'),
(255, 1, 6, 'hii', NULL, NULL, NULL, 1, '2024-11-15 06:27:08'),
(256, 1, 6, 'i am bhavesh', NULL, NULL, NULL, 1, '2024-11-15 06:27:19'),
(257, 1, 6, '  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto corporis aliquid minus, a quaerat ipsam et animi porro quisquam adipisci sit odit aspernatur, explicabo modi autem tempore quia ut ipsa.', NULL, NULL, NULL, 1, '2024-11-15 06:41:27'),
(258, 6, 1, 'hii', NULL, NULL, NULL, 1, '2024-11-15 07:01:47'),
(259, 6, 1, 'hii', NULL, NULL, NULL, 1, '2024-11-15 07:04:16'),
(260, 6, 1, 'hii', NULL, NULL, NULL, 1, '2024-11-15 07:05:12'),
(261, 6, 1, 'hii bhavesh', NULL, NULL, NULL, 1, '2024-11-15 07:21:10'),
(262, 1, 6, 'hii  om', NULL, NULL, NULL, 1, '2024-11-15 07:26:38'),
(263, 1, 6, 'what are you doing om ', NULL, NULL, NULL, 1, '2024-11-15 07:32:36'),
(264, 1, 6, 'hello om did you there ?', NULL, NULL, NULL, 1, '2024-11-15 07:34:03'),
(265, 1, 6, 'what are you doing om,', NULL, NULL, NULL, 1, '2024-11-15 07:36:14'),
(266, 2, 1, 'hii bhavesh', NULL, NULL, NULL, 1, '2024-11-15 07:38:49'),
(267, 1, 2, 'hii jay dip ', NULL, NULL, NULL, 1, '2024-11-15 07:39:01'),
(268, 1, 8, 'hii ', NULL, NULL, NULL, 0, '2024-11-15 11:17:44'),
(270, 2, 8, 'hii lets connectjaydip chavda', NULL, NULL, NULL, 1, '2024-11-15 11:51:58'),
(271, 8, 2, 'hii lets connectbhavana paramar', NULL, NULL, NULL, 1, '2024-11-15 11:52:27'),
(272, 8, 2, 'hii lets connectbhavana paramar', NULL, NULL, NULL, 1, '2024-11-16 04:40:05');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `whofollow` text NOT NULL,
  `whom` text NOT NULL,
  `propic` text NOT NULL,
  `kind` text NOT NULL,
  `post_img` text NOT NULL,
  `notify` text,
  `current_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `whofollow`, `whom`, `propic`, `kind`, `post_img`, `notify`, `current_time`) VALUES
(1, '1', '2', '', '', '', 'follow you right now you follow him if you want ', '2024-11-15 12:33:33');

-- --------------------------------------------------------

--
-- Table structure for table `postmsg`
--

DROP TABLE IF EXISTS `postmsg`;
CREATE TABLE IF NOT EXISTS `postmsg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pro_img` text NOT NULL,
  `uname` text NOT NULL,
  `post_id` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `reciver` int(11) NOT NULL,
  `msg` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `postmsg`
--

INSERT INTO `postmsg` (`id`, `pro_img`, `uname`, `post_id`, `sender`, `reciver`, `msg`) VALUES
(40, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 7, 1, 2, 'ganesh'),
(46, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 14, 1, 1, 'bird is mos beautiful'),
(39, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 7, 1, 2, 'mast'),
(42, 'dev.....jpg', 'om', 7, 6, 2, 'happy'),
(45, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 14, 1, 1, 'thank you all for commnet'),
(44, 'dog_muzzle_ears_eyes_waiting_26317_602x339.jpg', 'gaddu', 14, 9, 1, 'nice bird'),
(47, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 14, 1, 1, 'bird is so cool'),
(48, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 14, 1, 1, 'i like this bird'),
(49, '1111111111000.png', 'jaydip', 6, 2, 2, 'hii'),
(50, '$guru$ (32).jpg', 'jignesh', 15, 3, 3, 'congeretulation'),
(51, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 16, 1, 1, 'this is car'),
(52, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 14, 1, 1, 'hii'),
(53, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 31, 1, 1, 'nice video\r\ngood for sing'),
(54, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 6, 1, 2, 'sai nath'),
(55, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 31, 1, 1, 'hii'),
(56, 'profileboy.png', 'jaydip', 14, 2, 1, 'mast'),
(57, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 0, 1, 0, 'hello gaddu'),
(58, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 0, 1, 0, 'hello gaddu'),
(59, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 0, 1, 0, 'hello gaddu'),
(60, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 46, 1, 11, 'hii'),
(61, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 0, 1, 0, 'gaddu'),
(62, 'IMG_20221109_214422_769.jpg', 'Bhavesh ', 46, 1, 11, 'jay kastbhanjan dev');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_img` text NOT NULL,
  `video` text NOT NULL,
  `doc` text NOT NULL,
  `post_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userid` text NOT NULL,
  `name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=59 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `post_img`, `video`, `doc`, `post_text`, `created_at`, `userid`, `name`) VALUES
(42, 'IMG-20180330-WA0046.jpg', '', '', '', '2023-01-24 13:19:55', '10', 'vandana'),
(39, 'IMG-20180330-WA0046.jpg', '', '', 'bhavesh', '2023-01-13 13:44:24', '1', 'bhavesh'),
(6, '006WB.JPG', '', '', '', '2022-06-25 04:32:06', '2', 'jaydip'),
(7, '(142).gif', '', '', '', '2022-06-26 13:17:35', '2', 'jaydip'),
(11, 'user2.jpg', '', '', '', '2022-07-09 03:47:12', '1', 'bhavesh'),
(12, 'user3.jpg', '', '', 'bhavesh', '2022-07-21 10:04:16', '1', 'bhavesh'),
(15, 'i-card college.jpg', '', '', 'id card', '2022-10-03 12:47:28', '3', 'jignesh'),
(31, 'user4.jpg', '', '', 'sonu kakar best song', '2022-11-23 16:57:28', '1', 'bhavesh'),
(58, 'user5.jpg', '', '', 'hello bhavesh ', '2024-07-01 12:10:47', '1', 'bhaveshchavda'),
(44, 'IMG_20221109_214422_769.jpg', '', '', 'Hi i am bhavesh', '2023-02-07 15:43:45', '3', 'bhavesh'),
(45, '', 'Indian Idol junior 2   EP 9 Ranita Banerjee stuns the audience   Sony, Sab & Max_HIGH.mp4', '', '', '2023-02-21 16:18:28', '11', 'gaddu'),
(46, 'IMG_20180805_134623.jpg', '', '', '', '2023-02-21 16:23:11', '11', 'gaddu'),
(51, '', '', 'BCA SEM -1.pdf', '', '2023-04-07 07:14:51', '3', 'Bhavesh '),
(52, '', '', 'B.C.A. Sem.I to VI-2019.pdf', 'bhavesh', '2023-04-08 08:48:47', '7', 'Bhavesh '),
(53, '', 'Agar Tum Na Hote (Humein Aur Jeene Ki) - Sonu Kakkar_Full-HD.mp4', '', '', '2023-04-08 08:49:56', '6', 'Bhavesh '),
(54, '', 'Agar Tum Na Hote (Humein Aur Jeene Ki) - Sonu Kakkar_Full-HD.mp4', '', '', '2023-04-08 08:50:00', '5', 'Bhavesh '),
(55, '', 'Agar Tum Na Hote (Humein Aur Jeene Ki) - Sonu Kakkar_Full-HD.mp4', '', '', '2023-04-08 08:50:04', '4', 'Bhavesh '),
(56, '', 'Agar Tum Na Hote (Humein Aur Jeene Ki) - Sonu Kakkar_Full-HD.mp4', '', '', '2023-04-08 08:50:08', '3', 'Bhavesh '),
(57, '', 'Agar Tum Na Hote (Humein Aur Jeene Ki) - Sonu Kakkar_Full-HD.mp4', '', '', '2023-04-08 08:50:12', '3', 'Bhavesh ');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color` text,
  `msthem` varchar(255) DEFAULT '#fff',
  `mscolor` varchar(255) DEFAULT 'linear-gradient(135deg, rgb(110, 115, 183), rgb(49, 230, 202))',
  `user_profile` text,
  `name` text,
  `password` text,
  `mobail` double DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `school` text CHARACTER SET latin1,
  `collage` text,
  `work` text,
  `from_city` text,
  `live` text,
  `marital_status` text,
  `pro_pic` varchar(255) DEFAULT './nouser.png',
  `bio_pic` varchar(255) DEFAULT './bio_pic.jpg',
  `createat` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ac_status` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `color`, `msthem`, `mscolor`, `user_profile`, `name`, `password`, `mobail`, `gender`, `email`, `school`, `collage`, `work`, `from_city`, `live`, `marital_status`, `pro_pic`, `bio_pic`, `createat`, `update_at`, `ac_status`, `token`) VALUES
(1, 'rgb(226, 218, 218)', '#ffff', 'linear-gradient(135deg, rgb(167 89 159 / 79%), rgb(64 156 176))', 'bhavesh chavda', 'Bhavesh ', '2901', 8488995195, 1, 'chavdabhavesh2901@gmail.com', 'r c a ahah boys high school', 's c gandhi college botad', 'student', 'botad', 'botad', 'single', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ3MZfSeFp21y_hzRY0dyyDrX8OpADMPlEDw&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNmJ3ymPIMejOylqT8jBFrSZW2IHopkXctTg&s', '2022-07-20 16:45:15', '2024-11-21 09:39:49', 1, '660e8e9a6c0ec5e9db6aa12d1eb573f14fafe3ce6cc4dd826ac0eb43317756e5'),
(2, '', 'white.jpg', 'linear-gradient(135deg, rgb(167 89 159 / 79%), rgb(64 156 176))', 'jaydip chavda', 'jaydip', '2001', 5456765676, 1, 'jaydip2003@gmail.com', 'r c a ahah boys high school', 's c gandhi collgee botad', 'student', 'dhandhuka', 'botad', 'single', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3qY5ht7jFd_oBFyY4C5KYhgM4x3fcm7O8g&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7IrEf4qE-_NvQ3_B5J7DwLVsiyFQDqCSHpA&s', '2022-07-20 16:49:47', '2024-11-15 10:36:01', 1, '81ae88d8e4c600becafd7f8e7b3e223f48ef3e768592c6e2f7402d8b3ca8df7b'),
(3, '', 'white.jpg', 'linear-gradient(135deg, rgb(167 89 159 / 79%), rgb(64 156 176))', 'jignesh rathod', 'jignesh', '2001', 9925165195, 1, 'jignesh123@gmail.com', '', '', '', '', '', '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCx2b8t-JLYqX9V4kfKS1MLM04LOuwwkwdhA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgSVMLJAybwkPi2a8EjrNSjQySErCvnOH1Kg&s', '2022-08-04 21:51:54', '2024-11-08 03:47:24', 1, '351e0f49da170a112f28bc9461c4e6d0e485f2ca8db7256baaec15b925a10a4d'),
(4, '', 'white.jpg', 'rgb(226, 218, 218)', 'mukesh rathod', 'mukesh', '2003', 8674567458, 1, 'mukesh123@gmail.com', 'r c a ahah boys high school', 's c gandhi collgee botad', 'student', 'dhandhuka', 'botad', 'single', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrVN9H11wCam0PY3Wp44gEjVOWihP2BNyltg&s', 'https://thumbs.dreamstime.com/b/spring-summer-landscape-blue-sky-clouds-river-boat-green-trees-narew-countryside-grass-poland-water-leaves-58070004.jpg', '2022-08-05 01:34:16', '2024-11-05 02:02:30', 1, ''),
(5, '', 'white.jpg', 'linear-gradient(135deg, rgb(167 89 159 / 79%), rgb(64 156 176))', 'mital kardiya', 'mital', '2004', 6785645676, 2, 'mital123@gmail.com', '', '', '', '', '', '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQ-4Iue5GllXgqoVIbuStLOJ49ot8DFslQQ&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7PixZnCUpWjg-5MOpAKn6A92tSolXBqfIAA&s', '2022-08-05 01:37:40', '2024-11-08 03:49:27', 1, 'f92b6c0d03b476b56056f178accb46d6fe2c31b52be5bce6e2390e368a40a608'),
(6, '', 'white.jpg', 'rgb(226, 218, 218)', 'om rajput', 'om', '2001', 4565768756, 1, 'om123@gmail.com', '', '', '', '', '', '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Qv5s5REahX2Vcj11jPnU1ibiEUfTc-VMAQ&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoHwpDcDTQaXme54x16yp2tAQKceNuj_1Jaw&s', '2022-08-05 01:38:57', '2024-11-08 03:52:26', 1, 'bc5b3ee6e4366a416d7f11be0a736871f1b31249f5acc605e396c6fed85961fd'),
(8, NULL, '#fff', 'linear-gradient(135deg, rgb(110, 115, 183), rgb(49, 230, 202))', 'bhavana paramar', NULL, '2901', 7867656787, NULL, 'bhavana12@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, './nouser.png', './bio_pic.jpg', '2024-11-15 11:13:00', '2024-11-15 11:13:15', 1, 'd8a3395a62a7c1b42b904fa6cd1dbf740d8fff171a20d1bcbd632a307bcfe0f5');

-- --------------------------------------------------------

--
-- Table structure for table `userdenaid`
--

DROP TABLE IF EXISTS `userdenaid`;
CREATE TABLE IF NOT EXISTS `userdenaid` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color` text NOT NULL,
  `msthem` varchar(255) NOT NULL DEFAULT 'white.jpg',
  `mscolor` varchar(255) NOT NULL DEFAULT 'rgb(226, 218, 218)',
  `user_profile` text NOT NULL,
  `name` text NOT NULL,
  `password` text NOT NULL,
  `mobail` double NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` int(11) NOT NULL,
  `school` text CHARACTER SET latin1 NOT NULL,
  `collage` text NOT NULL,
  `work` text NOT NULL,
  `from_city` text NOT NULL,
  `live` text NOT NULL,
  `marital_status` text NOT NULL,
  `pro_pic` varchar(255) NOT NULL DEFAULT 'profileboy.png',
  `bio_pic` varchar(255) NOT NULL DEFAULT 'no_img.png',
  `create at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `ac_status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=109 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userdenaid`
--

INSERT INTO `userdenaid` (`id`, `color`, `msthem`, `mscolor`, `user_profile`, `name`, `password`, `mobail`, `email`, `gender`, `school`, `collage`, `work`, `from_city`, `live`, `marital_status`, `pro_pic`, `bio_pic`, `create at`, `update_at`, `ac_status`) VALUES
(108, '', 'white.jpg', 'rgb(226, 218, 218)', 'dineshkukadiya', 'dinesh', '2005', 6574534569, 'dinesh123@gmail.com', 1, '', '', '', '', '', '', 'profileboy.png', 'no_img.png', '2023-02-13 15:31:21', '0000-00-00 00:00:00', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
