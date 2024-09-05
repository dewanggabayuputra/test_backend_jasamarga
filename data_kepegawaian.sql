-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2024 at 08:29 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `data_kepegawaian`
--

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

CREATE TABLE `education` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `level` enum('Tk','Sd','Smp','Sma','Strata 1','Strata 2','Doktor','Profesor') NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `education`
--

INSERT INTO `education` (`id`, `employee_id`, `name`, `level`, `description`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 1, 'SMKN 7 Jakarta', 'Sma', 'Sekolah Menegah Atas', 'admin', 'admin', '2022-12-12', '2022-12-12'),
(2, 2, 'Universitas Negeri Jakarta', 'Strata 1', 'Sarjana', 'admin', 'admin', '2022-12-12', '2022-12-12'),
(3, 1, 'Universitas Widyatama', 'Strata 1', 'S1', 'admin', 'admin', '2022-12-12', '2022-12-12');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `nik` varchar(30) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `nik`, `name`, `is_active`, `start_date`, `end_date`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, '11012', 'Budi', 1, '2022-12-12', '2029-12-12', '', '', '0000-00-00', '0000-00-00'),
(2, '11012', 'Jarot', 1, '2021-09-01', '2028-09-01', '', '', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `employee_family`
--

CREATE TABLE `employee_family` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  `place_of_birth` varchar(30) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `religion` enum('Islam','Katolik','Buda','Protestan','Konghucu') NOT NULL,
  `is_life` tinyint(1) NOT NULL,
  `is_divorced` tinyint(1) NOT NULL,
  `relation_status` enum('Suami','Istri','Anak','Anak Sambung') NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee_family`
--

INSERT INTO `employee_family` (`id`, `employee_id`, `name`, `identifier`, `job`, `place_of_birth`, `date_of_birth`, `religion`, `is_life`, `is_divorced`, `relation_status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 1, 'Marni', '32100594109960002', 'Ibu Rumah Tangga', 'Denpasar', '1995-10-17', 'Islam', 1, 0, 'Istri', 'admin', 'admin', '2022-12-12', '2022-12-12'),
(2, 1, 'Clara', '32100594109020004', 'Pelajar', 'Bangkalan', '2008-10-17', 'Islam', 1, 0, 'Anak', 'admin', 'admin', '2022-12-12', '2022-12-12'),
(3, 1, 'Stephanie', '3210059020005', 'Pelajar', 'Bangkalan', '2008-10-17', 'Islam', 1, 0, 'Anak', 'admin', 'admin', '2022-12-12', '2022-12-12');

-- --------------------------------------------------------

--
-- Table structure for table `employee_profile`
--

CREATE TABLE `employee_profile` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `place_of_birth` varchar(30) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('Laki-laki','Perempuan') NOT NULL,
  `is_married` tinyint(1) NOT NULL,
  `prof_pict` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee_profile`
--

INSERT INTO `employee_profile` (`id`, `employee_id`, `place_of_birth`, `date_of_birth`, `gender`, `is_married`, `prof_pict`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 1, 'Jakarta', '1997-05-02', 'Laki-laki', 1, '', 'admin', 'admin', '2022-12-12', '2022-12-12'),
(2, 2, 'Sukabumi', '1996-05-02', 'Laki-laki', 0, '', 'admin', 'admin', '2022-12-12', '2022-12-12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_family`
--
ALTER TABLE `employee_family`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_profile`
--
ALTER TABLE `employee_profile`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `education`
--
ALTER TABLE `education`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `employee_family`
--
ALTER TABLE `employee_family`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee_profile`
--
ALTER TABLE `employee_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
