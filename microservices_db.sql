-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql:3306
-- Tiempo de generación: 02-02-2023 a las 20:41:59
-- Versión del servidor: 8.0.27
-- Versión de PHP: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `microservices_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` bigint NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'category one'),
(2, 'sdfsdfsd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `courses`
--

CREATE TABLE `courses` (
  `id` bigint NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `courses`
--

INSERT INTO `courses` (`id`, `created_at`, `description`, `name`, `updated_at`) VALUES
(1, NULL, 'Course one', 'Course one', '2022-07-07 19:09:19'),
(3, '2022-07-07 14:41:16', 'yrtyrty', 'yyrtyrt', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `courses_exams`
--

CREATE TABLE `courses_exams` (
  `course_id` bigint NOT NULL,
  `exams_id` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `courses_students`
--

CREATE TABLE `courses_students` (
  `id` bigint NOT NULL,
  `student_id` bigint DEFAULT NULL,
  `course_id` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exams`
--

CREATE TABLE `exams` (
  `id` bigint NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `subject_id` bigint DEFAULT NULL,
  `subject_children_id` bigint DEFAULT NULL,
  `subject_father_id` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `exams`
--

INSERT INTO `exams` (`id`, `created_at`, `name`, `subject_id`, `subject_children_id`, `subject_father_id`) VALUES
(1, NULL, 'Exam one 2iiii', 1, NULL, NULL),
(3, '2022-07-08 20:06:03', 'yrtyrtyrtyrt', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `questions`
--

CREATE TABLE `questions` (
  `id` bigint NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `exam_id` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subjects`
--

CREATE TABLE `subjects` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `father_id` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `father_id`) VALUES
(1, 'Subject 1', NULL),
(2, 'Subject 2', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `courses_exams`
--
ALTER TABLE `courses_exams`
  ADD UNIQUE KEY `UK_kmn4p4lul2v842m9y7sfogvg7` (`exams_id`),
  ADD KEY `FK4hit3ewxrx9ra5dgl8intq9jl` (`course_id`);

--
-- Indices de la tabla `courses_students`
--
ALTER TABLE `courses_students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_clg6bnl8k2ethmfwr43g3ud5o` (`student_id`),
  ADD KEY `FKcj1bvqj437mdtgllmwcd41f2u` (`course_id`);

--
-- Indices de la tabla `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKopre4n7j7fpxqbtbwpv8ywn1y` (`subject_id`),
  ADD KEY `FKgxysnhxi0ktmyxqmwic2vxqpg` (`subject_children_id`),
  ADD KEY `FK3w78yyfpsjd057aipltvr554i` (`subject_father_id`);

--
-- Indices de la tabla `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKrk78bmt53fns7np8casqa3q44` (`exam_id`);

--
-- Indices de la tabla `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKsrx6tkgr20u9l9obwodvpufa` (`father_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `courses_students`
--
ALTER TABLE `courses_students`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `exams`
--
ALTER TABLE `exams`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
