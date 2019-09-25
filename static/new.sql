-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 25 2019 г., 16:11
-- Версия сервера: 10.3.13-MariaDB
-- Версия PHP: 7.1.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `new`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT '',
  `description` varchar(255) DEFAULT '',
  `h1` varchar(255) DEFAULT '',
  `url` varchar(255) DEFAULT '',
  `language` varchar(255) DEFAULT '',
  `name` varchar(255) DEFAULT '',
  `previewImageSrc` varchar(255) DEFAULT '',
  `imageSrc` varchar(255) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `cities`
--

INSERT INTO `cities` (`id`, `title`, `description`, `h1`, `url`, `language`, `name`, `previewImageSrc`, `imageSrc`) VALUES
(1, 'spb', 'spb', 'spb', 'spb', 'en', 'spb', '/image/spb/autour-de-l-amiraute.jpg', '/image/spb/autour-de-l-amiraute.jpg'),
(2, 'msc', 'msc', 'msc', 'msc', 'en', 'msc', '/image/msc/galleria-tretyakov.jpg', '/image/msc/galleria-tretyakov.jpg'),
(3, 'sdfsd', 'dfgd', 'fgdfg', 'nov', 'en', 'ssadas', '/image/msc/galleria-tretyakov.jpg', '/image/msc/galleria-tretyakov.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `excursion`
--

CREATE TABLE `excursion` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `h1` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `detailText` varchar(255) NOT NULL,
  `excluded` varchar(255) NOT NULL,
  `groupSize` varchar(255) NOT NULL,
  `included` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `imageSrc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `excursion`
--

INSERT INTO `excursion` (`id`, `title`, `description`, `h1`, `name`, `city`, `detailText`, `excluded`, `groupSize`, `included`, `language`, `price`, `time`, `type`, `url`, `imageSrc`) VALUES
(1, 'banya', 'sdasd', 'banya', 'banya', 'spb', 'banaasd', 'asdads', '6', 'ssdfsd', 'en', '7', '8', 'foot', 'banya', '/image/spb/autour-de-l-amiraute.jpg'),
(2, 'sdfsd', 'jh', 'jh', 'j', 'msc', 'hj', 'h', 'jh', 'kjkjk', 'jk', 'jkjkj', 'kj', 'kjk', '3', '/image/spb/autour-de-l-amiraute.jpg'),
(3, 'sdfsdfcvb', 'sdasd', 'banysdfsda', 'sdfsdf', 'spb', 'banaasd', 'asdads', '6', 'ssdfsd', 'en', '7', '8', 'car', 'banya', '/image/spb/autour-de-l-amiraute.jpg'),
(4, 'sdfsdfcvb', 'sdasd', 'banysdfsda', 'sdfsdf', 'spb', 'banaasd', 'asdads', '6', 'ssdfsd', 'en', '7', '8', 'car', 'banya', '/image/spb/autour-de-l-amiraute.jpg');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `excursion`
--
ALTER TABLE `excursion`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `excursion`
--
ALTER TABLE `excursion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
