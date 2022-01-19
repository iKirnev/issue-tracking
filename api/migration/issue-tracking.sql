SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `issue-tracking`
--

-- --------------------------------------------------------

--
-- Table structure for table `issues`
--

CREATE TABLE `issues` (
  `id` int(11) NOT NULL,
  `reporter_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `status_id` int(11) NOT NULL,
  `file_src` text,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `reporters` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reporters`
--

INSERT INTO `reporters` (`id`, `name`) VALUES
(1, 'Ivan Kirnev'),
(2, 'John Doe');

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

CREATE TABLE `statuses` (
  `id` int(11) NOT NULL,
  `title` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`id`, `title`) VALUES
(1, 'New'),
(2, 'Attached'),
(3, 'Fixed'),
(4, 'Complete');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `issues`
--
ALTER TABLE `issues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_foreign_key_reporter_id` (`reporter_id`),
  ADD KEY `fk_foreign_key_status_id` (`status_id`);

--
-- Indexes for table `reporters`
--
ALTER TABLE `reporters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `issues`
--
ALTER TABLE `issues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `reporters`
--
ALTER TABLE `reporters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `issues`
--
ALTER TABLE `issues`
  ADD CONSTRAINT `fk_foreign_key_reporter_id` FOREIGN KEY (`reporter_id`) REFERENCES `reporters` (`id`),
  ADD CONSTRAINT `fk_foreign_key_status_id` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
