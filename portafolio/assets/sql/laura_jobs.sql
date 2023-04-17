-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-04-2023 a las 01:11:25
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `laura_jobs`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `academic_data`
--
-- Error leyendo la estructura de la tabla laura_jobs.academic_data: #1932 - Table 'laura_jobs.academic_data' doesn't exist in engine
-- Error leyendo datos de la tabla laura_jobs.academic_data: #1064 - Algo está equivocado en su sintax cerca 'FROM `laura_jobs`.`academic_data`' en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diplomas`
--
-- Error leyendo la estructura de la tabla laura_jobs.diplomas: #1932 - Table 'laura_jobs.diplomas' doesn't exist in engine
-- Error leyendo datos de la tabla laura_jobs.diplomas: #1064 - Algo está equivocado en su sintax cerca 'FROM `laura_jobs`.`diplomas`' en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--
-- Error leyendo la estructura de la tabla laura_jobs.jobs: #1932 - Table 'laura_jobs.jobs' doesn't exist in engine
-- Error leyendo datos de la tabla laura_jobs.jobs: #1064 - Algo está equivocado en su sintax cerca 'FROM `laura_jobs`.`jobs`' en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyects`
--
-- Error leyendo la estructura de la tabla laura_jobs.proyects: #1932 - Table 'laura_jobs.proyects' doesn't exist in engine
-- Error leyendo datos de la tabla laura_jobs.proyects: #1064 - Algo está equivocado en su sintax cerca 'FROM `laura_jobs`.`proyects`' en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pro_languages`
--
-- Error leyendo la estructura de la tabla laura_jobs.pro_languages: #1932 - Table 'laura_jobs.pro_languages' doesn't exist in engine
-- Error leyendo datos de la tabla laura_jobs.pro_languages: #1064 - Algo está equivocado en su sintax cerca 'FROM `laura_jobs`.`pro_languages`' en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `technologies`
--
-- Error leyendo la estructura de la tabla laura_jobs.technologies: #1932 - Table 'laura_jobs.technologies' doesn't exist in engine
-- Error leyendo datos de la tabla laura_jobs.technologies: #1064 - Algo está equivocado en su sintax cerca 'FROM `laura_jobs`.`technologies`' en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_info`
--
-- Error leyendo la estructura de la tabla laura_jobs.user_info: #1932 - Table 'laura_jobs.user_info' doesn't exist in engine
-- Error leyendo datos de la tabla laura_jobs.user_info: #1064 - Algo está equivocado en su sintax cerca 'FROM `laura_jobs`.`user_info`' en la linea 1

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(5) NOT NULL,
  `username` varchar(200) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `apellido` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `actualizacion` date DEFAULT NULL,
  `alta` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `nombre`, `apellido`, `email`, `password`, `actualizacion`, `alta`) VALUES
(0, 'lauArciniega', 'laura Cecilia', 'Arciniega Roque', 'arciniega1497@hotmail.com', 'parawhor397%.', '0000-00-00', '2023-04-15');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
