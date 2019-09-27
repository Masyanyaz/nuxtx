-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 27 2019 г., 11:20
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
  `title` text DEFAULT '',
  `description` text DEFAULT '',
  `h1` text DEFAULT '',
  `url` text DEFAULT '',
  `lang` text DEFAULT '',
  `name` text DEFAULT '',
  `previewImageSrc` text DEFAULT '',
  `imageSrc` text DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `cities`
--

INSERT INTO `cities` (`id`, `title`, `description`, `h1`, `url`, `lang`, `name`, `previewImageSrc`, `imageSrc`) VALUES
(1, 'spb', 'spb', 'spb', 'spb', 'en', 'spb', '/image/spb/autour-de-l-amiraute.jpg', '/image/spb/autour-de-l-amiraute.jpg'),
(2, 'msc', 'msc', 'msc', 'msc', 'fr', 'msc', '/image/msc/galleria-tretyakov.jpg', '/image/msc/galleria-tretyakov.jpg'),
(3, 'sdfsd', 'dfgd', 'fgdfg', 'nov', 'en', 'ssadas', '/image/msc/galleria-tretyakov.jpg', '/image/msc/galleria-tretyakov.jpg'),
(29, 'Novgorod title', 'Novgorod desc', 'Novgorod h1', 'novgorod', 'fr', 'Novgorod', '/image/msc/galleria-tretyakov.jpg', '/image/msc/galleria-tretyakov.jpg'),
(35, 'fsdf', 'sdf', 'sdfsd', 'sdfsdf', 'en', 'dsfsdf', '/image/msc/galleria-tretyakov.jpg', '/image/msc/galleria-tretyakov.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `excursion`
--

CREATE TABLE `excursion` (
  `id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `city` text NOT NULL,
  `lang` text NOT NULL,
  `url` text NOT NULL,
  `h1` text NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `name` text NOT NULL,
  `detailText` text NOT NULL,
  `included` text NOT NULL,
  `excluded` text NOT NULL,
  `groupSize` text NOT NULL,
  `price` text NOT NULL,
  `time` text NOT NULL,
  `type` text NOT NULL,
  `imageSrc` text NOT NULL,
  `previewImageSrc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `excursion`
--

INSERT INTO `excursion` (`id`, `city_id`, `city`, `lang`, `url`, `h1`, `title`, `description`, `name`, `detailText`, `included`, `excluded`, `groupSize`, `price`, `time`, `type`, `imageSrc`, `previewImageSrc`) VALUES
(1, 1, 'spb', 'en', 'banya', 'banya', 'banya', 'sdasd', 'banya', 'banaasd', 'ssdfsd', 'asd\nasd\n345', '6', '7', '8', 'foot', '/image/spb/autour-de-l-amiraute.jpg', '/image/spb/autour-de-l-amiraute.jpg'),
(2, 2, 'msc', 'fr', '3', 'jh', 'sdfsd', 'jh', 'j', 'hj', 'kjkjk', 'h', 'jh', 'jkjkj', 'kj', 'kjk', '/image/spb/autour-de-l-amiraute.jpg', '/image/spb/autour-de-l-amiraute.jpg'),
(3, 1, 'spb', 'en', 'banyea', 'banysdfsda', 'sdfsdfcvb', 'sdasd', 'sdfsdf', 'banaasd', 'ssdfsd', 'asdads', '6', '7', '8', 'car', '/image/spb/autour-de-l-amiraute.jpg', '/image/spb/autour-de-l-amiraute.jpg'),
(8, 1, 'spb', 'en', 'petergof', 'petergof h1', 'petergof title', 'petergof desc', 'petergof', '<p>asfasdf</p>\r\n<b>asdasd</b>', '1231\r\n454\r\n6\r\ndfgdgdfgdfgdgf\r\ndf', '4345\r\n3\r\n24', '6', '2', '3', 'foot', '/image/msc/galleria-tretyakov.jpg', '/image/msc/galleria-tretyakov.jpg');

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `excursion_cities_fk` (`city_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT для таблицы `excursion`
--
ALTER TABLE `excursion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `excursion`
--
ALTER TABLE `excursion`
  ADD CONSTRAINT `excursion_cities_fk` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
