-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-09-2024 a las 03:21:33
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `databaseapmci`
--
CREATE DATABASE IF NOT EXISTS `databaseapmci` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `databaseapmci`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `available_dates`
--

DROP TABLE IF EXISTS `available_dates`;
CREATE TABLE `available_dates` (
  `AVD_CODE` int(11) NOT NULL COMMENT 'CODIGO',
  `AVD_TYPE` varchar(100) NOT NULL,
  `SPG_CODE` int(11) NOT NULL COMMENT 'CODIGO-FORANEO-SPG',
  `AVD_AVAILABLE_DATE` date NOT NULL COMMENT 'FECHA-DISPONIBLES',
  `AVD_AVAILABLE_HOUR_SINCE` time NOT NULL COMMENT 'HORA-DISPONIBLE-DESDE',
  `AVD_AVAILABLE_HOUR_UNITL` time NOT NULL COMMENT '	HORA-DISPONIBLE-HASTA	'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `available_dates`:
--   `SPG_CODE`
--       `sports_groups` -> `SPG_CODE`
--

--
-- Volcado de datos para la tabla `available_dates`
--

INSERT INTO `available_dates` (`AVD_CODE`, `AVD_TYPE`, `SPG_CODE`, `AVD_AVAILABLE_DATE`, `AVD_AVAILABLE_HOUR_SINCE`, `AVD_AVAILABLE_HOUR_UNITL`) VALUES
(10, 'Eliminatorias', 1, '2021-05-01', '02:00:00', '04:00:00'),
(11, 'Eliminatorias', 1, '2021-05-07', '02:00:00', '02:00:00'),
(12, 'Eliminatorias', 1, '2021-05-05', '02:00:00', '02:00:00'),
(14, 'Fase de grupo', 1, '0000-00-00', '02:00:00', '02:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `busineess_headquarters`
--

DROP TABLE IF EXISTS `busineess_headquarters`;
CREATE TABLE `busineess_headquarters` (
  `BUSH_CODE` int(11) NOT NULL,
  `BUSH_ADDRES` varchar(100) NOT NULL COMMENT 'DIRECCIÓN SEDE',
  `BUSH_CITY` varchar(50) NOT NULL COMMENT 'CIUDAD SEDE',
  `BUSH_COUNTRY` varchar(50) NOT NULL COMMENT 'PAIS SEDE',
  `BUSH_PHONE` varchar(25) NOT NULL COMMENT 'NUMERO DE TELEFONO',
  `BUSH_STATE_HEADQUARTERS` tinyint(1) NOT NULL COMMENT 'ESTADO SEDE',
  `BUSH_USER_INSERT` varchar(100) NOT NULL COMMENT 'QUIEN CREO LA SEDE',
  `BUSH_USER_UPDATE` varchar(100) NOT NULL COMMENT 'QUIEN ACTUALIZO LA INFORMACION',
  `BUSH_USER_DELETE` varchar(100) NOT NULL COMMENT 'QUIEN ELIMINO LA SEDE',
  `BUSH_INSERT_DATE` datetime NOT NULL COMMENT 'FECHA CREACION',
  `BUSH_UPDATE_DATE` datetime NOT NULL COMMENT 'FECHA ACTUALIZACION',
  `BUSH_DELETE_DATE` datetime NOT NULL COMMENT 'FECHA DE ELIMINACION',
  `BUIF_CODE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `busineess_headquarters`:
--   `BUIF_CODE`
--       `business_information` -> `BUIF_CODE`
--

--
-- Volcado de datos para la tabla `busineess_headquarters`
--

INSERT INTO `busineess_headquarters` (`BUSH_CODE`, `BUSH_ADDRES`, `BUSH_CITY`, `BUSH_COUNTRY`, `BUSH_PHONE`, `BUSH_STATE_HEADQUARTERS`, `BUSH_USER_INSERT`, `BUSH_USER_UPDATE`, `BUSH_USER_DELETE`, `BUSH_INSERT_DATE`, `BUSH_UPDATE_DATE`, `BUSH_DELETE_DATE`, `BUIF_CODE`) VALUES
(1, 'ASD', 'Ambato', 'ASD', '222222', 1, 'ASD', '', '', '2024-09-11 21:48:34', '2024-09-11 21:48:34', '2024-09-11 21:48:34', 5),
(2, 'qq', 'qq', 'qq', '2', 2, 'q', '', '', '2024-09-12 23:46:52', '2024-09-12 23:46:52', '2024-09-12 23:46:52', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `business_information`
--

DROP TABLE IF EXISTS `business_information`;
CREATE TABLE `business_information` (
  `BUIF_CODE` int(11) NOT NULL,
  `BUIF_NAME` varchar(50) DEFAULT NULL,
  `BUIF_LOGO` varchar(250) DEFAULT NULL,
  `BUIF_MISSION` text DEFAULT NULL,
  `BUIF_VISION` text DEFAULT NULL,
  `BUIF_IMAGE` varchar(250) DEFAULT NULL,
  `BUIF_STATE` tinyint(1) DEFAULT NULL,
  `BUIF_CONTACT` varchar(25) DEFAULT NULL,
  `BUIF_USER_INSERT` varchar(100) DEFAULT NULL,
  `BUIF_USER_DELETE` varchar(100) DEFAULT NULL,
  `BUIF_USER_UPDATE` varchar(100) DEFAULT NULL,
  `BUIF_INSERT_DATE` datetime DEFAULT NULL,
  `BUIF_UPDATE_DATE` datetime DEFAULT NULL,
  `BUIF_DELETE_DATE` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `business_information`:
--

--
-- Volcado de datos para la tabla `business_information`
--

INSERT INTO `business_information` (`BUIF_CODE`, `BUIF_NAME`, `BUIF_LOGO`, `BUIF_MISSION`, `BUIF_VISION`, `BUIF_IMAGE`, `BUIF_STATE`, `BUIF_CONTACT`, `BUIF_USER_INSERT`, `BUIF_USER_DELETE`, `BUIF_USER_UPDATE`, `BUIF_INSERT_DATE`, `BUIF_UPDATE_DATE`, `BUIF_DELETE_DATE`) VALUES
(4, 'PRUEBA', 'ºSDAD', 'ASDSA', 'ASD', 'ASD', 1, 'ASD', 'AD', 'SD', 'ASD', '2024-09-05 15:46:15', '2024-09-05 15:46:15', '2024-09-05 15:46:15'),
(5, 'Prueba2', 'asd', 'asd', 'asd', 'asd', 2, 'asd', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `court`
--

DROP TABLE IF EXISTS `court`;
CREATE TABLE `court` (
  `CANC_CODE` int(11) NOT NULL COMMENT 'CODIGO',
  `CANC_NAME` varchar(50) DEFAULT NULL COMMENT 'NOMBRE-CANCHA',
  `CANC_LOCATE` varchar(150) DEFAULT NULL COMMENT 'UBICACION-CANCHA',
  `CANC_STATE` tinyint(1) DEFAULT NULL COMMENT 'ESTADO-CANCHA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `court`:
--

--
-- Volcado de datos para la tabla `court`
--

INSERT INTO `court` (`CANC_CODE`, `CANC_NAME`, `CANC_LOCATE`, `CANC_STATE`) VALUES
(1, 'Cancha de césped sintético', NULL, 1),
(2, 'Cancha de baloncesto', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `groups`
--

DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `GRUP_CODE` int(11) NOT NULL COMMENT 'CODIGO',
  `GRUP_NAME` varchar(50) NOT NULL COMMENT 'NOMBRE-GRUPO-FASES'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `groups`:
--

--
-- Volcado de datos para la tabla `groups`
--

INSERT INTO `groups` (`GRUP_CODE`, `GRUP_NAME`) VALUES
(1, 'a'),
(2, 'b'),
(5, 'Grupo finalistas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `groupstage`
--

DROP TABLE IF EXISTS `groupstage`;
CREATE TABLE `groupstage` (
  `GRS_CODE` int(11) NOT NULL COMMENT 'CODGIO',
  `GRUP_CODE` int(11) NOT NULL COMMENT 'CODIGO-FORANEO-GRUPOS',
  `SPG_CODE` int(11) NOT NULL COMMENT 'CODIGO-FORANEO-SPG',
  `GRS_TYPE_GANDER` varchar(50) NOT NULL COMMENT 'GENERO-EQUIPO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `groupstage`:
--   `SPG_CODE`
--       `sports_groups` -> `SPG_CODE`
--   `GRUP_CODE`
--       `groups` -> `GRUP_CODE`
--

--
-- Volcado de datos para la tabla `groupstage`
--

INSERT INTO `groupstage` (`GRS_CODE`, `GRUP_CODE`, `SPG_CODE`, `GRS_TYPE_GANDER`) VALUES
(1, 1, 2, 'Femenino'),
(4, 1, 9, 'Masculino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_client`
--

DROP TABLE IF EXISTS `info_client`;
CREATE TABLE `info_client` (
  `ICLI_CODE` int(11) NOT NULL COMMENT 'CODIGO',
  `ICLI_FIRST_NAME` varchar(50) NOT NULL COMMENT 'NONBRE',
  `ICLI_LAST_NAME` varchar(50) NOT NULL COMMENT 'APELLIDO',
  `ICLI_CARD` varchar(20) NOT NULL COMMENT 'CEDULA',
  `ICLI_PHONE_NUMBER` varchar(20) NOT NULL COMMENT 'TELEFONO',
  `ICLI_ADDRESS` varchar(100) NOT NULL COMMENT 'DIRECCION',
  `ICLI_CITY` varchar(50) NOT NULL COMMENT 'CIUDAD',
  `ICLI_PROVINCE` varchar(50) NOT NULL COMMENT 'PROVINCIA',
  `ICLI_CAREER` varchar(50) NOT NULL COMMENT 'CARRERA',
  `ICLI_SEMESTER` int(11) NOT NULL COMMENT 'SEMESTRE',
  `ICLI_AGE` int(11) NOT NULL COMMENT 'EDAD',
  `ICLI_GENDER` varchar(10) NOT NULL COMMENT 'GENERO',
  `ICLI_WEIGHT` decimal(5,2) NOT NULL COMMENT 'PESO',
  `ICLI_HEIGHT` decimal(5,2) NOT NULL COMMENT 'ALTURA',
  `ICLI_INSTITUTIONAL_EMAIL` varchar(50) NOT NULL COMMENT 'CORREO-INSTITUCIONAL',
  `ICLI_DATE_OF_BIRTH` date NOT NULL COMMENT 'FECHA-CUMPLEAÑOS',
  `BUSH_CODE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `info_client`:
--   `BUSH_CODE`
--       `busineess_headquarters` -> `BUSH_CODE`
--

--
-- Volcado de datos para la tabla `info_client`
--

INSERT INTO `info_client` (`ICLI_CODE`, `ICLI_FIRST_NAME`, `ICLI_LAST_NAME`, `ICLI_CARD`, `ICLI_PHONE_NUMBER`, `ICLI_ADDRESS`, `ICLI_CITY`, `ICLI_PROVINCE`, `ICLI_CAREER`, `ICLI_SEMESTER`, `ICLI_AGE`, `ICLI_GENDER`, `ICLI_WEIGHT`, `ICLI_HEIGHT`, `ICLI_INSTITUTIONAL_EMAIL`, `ICLI_DATE_OF_BIRTH`, `BUSH_CODE`) VALUES
(4, 'ppppp', 'Souza Silva', '1234567899', '22222222222', 'Rua Inexistente, 2000', 'Belo Horizonte', 'MG', 'ASD', 2, 2, 'Masculino', 2.00, 2.00, 'ASD', '2000-10-06', 2),
(5, 'Jon', 'Doe', '1234567899', '1111111110', '1600 Fake Street', 'Mountain View', 'CA', 'asd', 2, 2, 'female', 2.00, 2.00, 'asd', '2021-05-11', 1),
(6, 'yyyyyyy', 'García Flores', '1234567899', '11111111111', 'C. Falsa 445', 'Ciudad de México', 'Distrito Federal', 'Software', 7, 23, 'Masculino', 75.00, 1.00, 'asd', '2021-05-02', 1),
(28, 'Juan', 'Pérez', '123456', '0987654321', 'Av. Siempre Viva 123', 'Quito', 'Pichincha', 'Ingeniería', 3, 20, 'M', 70.00, 175.00, 'juan.perez@ejemplo.com', '2004-05-01', 1),
(29, 'María', 'González', '234567', '0987654322', 'Calle Falsa 456', 'Guayaquil', 'Guayas', 'Medicina', 5, 22, 'F', 65.00, 160.00, 'maria.gonzalez@ejemplo.com', '2002-06-15', 2),
(30, 'Luis', 'Martínez', '345678', '0987654323', 'Av. La Paz 789', 'Cuenca', 'Azuay', 'Arquitectura', 7, 21, 'M', 80.00, 180.00, 'luis.martinez@ejemplo.com', '2003-08-20', 1),
(31, 'Ana', 'López', '456789', '0987654324', 'Calle del Sol 321', 'Ambato', 'Tungurahua', 'Biología', 2, 19, 'F', 55.00, 155.00, 'ana.lopez@ejemplo.com', '2005-09-10', 2),
(32, 'Carlos', 'Hernández', '567890', '0987654325', 'Av. de los Ríos 654', 'Manta', 'Manabí', 'Contabilidad', 4, 23, 'M', 75.00, 172.00, 'carlos.hernandez@ejemplo.com', '2001-11-30', 1),
(33, 'Laura', 'Ramírez', '678901', '0987654326', 'Calle del Mar 987', 'Loja', 'Loja', 'Ingeniería', 6, 20, 'F', 68.00, 165.00, 'laura.ramirez@ejemplo.com', '2004-02-25', 2),
(34, 'Pedro', 'Torres', '789012', '0987654327', 'Av. Libertador 135', 'Esmeraldas', 'Esmeraldas', 'Educación', 1, 24, 'M', 90.00, 182.00, 'pedro.torres@ejemplo.com', '1999-12-05', 1),
(35, 'Sofía', 'Vega', '890123', '0987654328', 'Calle del Bosque 246', 'Durán', 'Guayas', 'Psicología', 3, 22, 'F', 60.00, 158.00, 'sofia.vega@ejemplo.com', '2002-07-22', 2),
(36, 'Jorge', 'Jiménez', '901234', '0987654329', 'Av. del Sol 357', 'Santo Domingo', 'Santo Domingo', 'Matemáticas', 5, 21, 'M', 85.00, 178.00, 'jorge.jimenez@ejemplo.com', '2003-03-18', 1),
(37, 'Valeria', 'Ponce', '012345', '0987654330', 'Calle del Río 468', 'Machala', 'El Oro', 'Historia', 4, 20, 'F', 58.00, 162.00, 'valeria.ponce@ejemplo.com', '2004-04-14', 2),
(38, 'Andrés', 'Salazar', '1234567', '0987654331', 'Av. Central 579', 'Ibarra', 'Imbabura', 'Física', 2, 19, 'M', 78.00, 176.00, 'andres.salazar@ejemplo.com', '2005-10-30', 1),
(39, 'rr', 'rr', 'rr', 'rr', 'rr', 'rr', 'rr', 'rr', 2, 2, 'sd', 2.00, 2.00, '2', '2024-09-20', 1),
(40, 'oo', 'oo', 'oo', 'oo', 'oo', 'o', 'o', 'o', 2, 2, '2', 2.00, 2.00, '2', '2024-09-20', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matches`
--

DROP TABLE IF EXISTS `matches`;
CREATE TABLE `matches` (
  `MATC_CODE` int(11) NOT NULL COMMENT 'CODIGO',
  `CANC_CODE` int(11) NOT NULL COMMENT 'CODIGO-FORANEO-CANCHA',
  `MATC_DATE` date NOT NULL COMMENT 'FECHA-ENFRENTAMIENTO',
  `MATC_HOUR` time NOT NULL COMMENT 'HORA-ENFRENTAMIENTO',
  `SPG_CODE_ONE` int(11) NOT NULL COMMENT 'CODIGO-FORANEO-SPG',
  `SPG_CODE_TWO` int(11) NOT NULL COMMENT 'CODIGO-FORANEO-SPG',
  `MATC_STATUS` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `matches`:
--   `SPG_CODE_ONE`
--       `sports_groups` -> `SPG_CODE`
--   `SPG_CODE_TWO`
--       `sports_groups` -> `SPG_CODE`
--   `CANC_CODE`
--       `court` -> `CANC_CODE`
--

--
-- Volcado de datos para la tabla `matches`
--

INSERT INTO `matches` (`MATC_CODE`, `CANC_CODE`, `MATC_DATE`, `MATC_HOUR`, `SPG_CODE_ONE`, `SPG_CODE_TWO`, `MATC_STATUS`) VALUES
(1, 1, '2024-09-21', '15:16:14', 1, 2, 'finalizado'),
(2, 1, '2024-09-21', '15:16:14', 8, 9, 'finalizado'),
(4, 2, '2021-05-08', '02:02:00', 9, 2, 'proximo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rules`
--

DROP TABLE IF EXISTS `rules`;
CREATE TABLE `rules` (
  `RU_CODE` int(11) NOT NULL,
  `RU_RULES_FOR_SPORTS` varchar(50) NOT NULL,
  `RU_DESCRIPTION_RULES` varchar(250) NOT NULL COMMENT 'VAMOS A GUARDAR EL PDF DE LAS REGLAS',
  `RU_DATE` date NOT NULL COMMENT 'FECHA DEL ENVIO DE LAS REGLAS',
  `USAD_CODE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `rules`:
--   `USAD_CODE`
--       `user_admin` -> `USAD_CODE`
--

--
-- Volcado de datos para la tabla `rules`
--

INSERT INTO `rules` (`RU_CODE`, `RU_RULES_FOR_SPORTS`, `RU_DESCRIPTION_RULES`, `RU_DATE`, `USAD_CODE`) VALUES
(3, 'Futbol Sala', 'asd', '2024-09-17', 3),
(5, 'eee', './uploads/pdfs/SEKIRO  SHADOWS DIE TWICE Screenshot 2021.09.04 - 12.33.03.26.png', '2024-09-20', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sports_groups`
--

DROP TABLE IF EXISTS `sports_groups`;
CREATE TABLE `sports_groups` (
  `SPG_CODE` int(11) NOT NULL COMMENT 'CDOGIO',
  `SPG_TEAM_NAME` varchar(50) NOT NULL COMMENT 'NOMBRE-EQUIPO',
  `SPG_LOGO` varchar(250) NOT NULL,
  `RU_CODE` int(11) NOT NULL,
  `ICLI_GODMOTHER` int(11) NOT NULL COMMENT 'CODIGO-MADRINA-IF-CLI',
  `ICLI_TEAM_PED_ID` int(11) NOT NULL COMMENT 'CODIGO-MASCOTA-IF-CLI',
  `ICLI_TEAM_LEADER_ID` int(11) NOT NULL COMMENT 'CODIGO-LIDER-EQUIPO-IF-CLI',
  `SPG_SIGNATURE` text DEFAULT NULL COMMENT 'FIRMA-EQUIPO',
  `SPG_OBSERVATIONS` text DEFAULT NULL COMMENT 'OBSERVACION-GRUPO',
  `SPG_CREATION_DATE` date NOT NULL COMMENT 'CREACION-GRUPO',
  `SPG_GENDER_TEAM` varchar(50) NOT NULL COMMENT 'GENERO-GRUPO',
  `SPG_STATE_MATCH` varchar(50) NOT NULL COMMENT 'ESTADO-GRUPO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `sports_groups`:
--   `RU_CODE`
--       `rules` -> `RU_CODE`
--   `ICLI_GODMOTHER`
--       `info_client` -> `ICLI_CODE`
--   `ICLI_TEAM_LEADER_ID`
--       `info_client` -> `ICLI_CODE`
--   `ICLI_TEAM_PED_ID`
--       `info_client` -> `ICLI_CODE`
--

--
-- Volcado de datos para la tabla `sports_groups`
--

INSERT INTO `sports_groups` (`SPG_CODE`, `SPG_TEAM_NAME`, `SPG_LOGO`, `RU_CODE`, `ICLI_GODMOTHER`, `ICLI_TEAM_PED_ID`, `ICLI_TEAM_LEADER_ID`, `SPG_SIGNATURE`, `SPG_OBSERVATIONS`, `SPG_CREATION_DATE`, `SPG_GENDER_TEAM`, `SPG_STATE_MATCH`) VALUES
(1, 'Barcelona', 'logo1', 3, 6, 4, 6, 'firma1', 'ninguna', '2024-09-17', 'Femenino', 'Equipo no clasificado'),
(2, 'tttttttttt', 'wqe', 3, 4, 4, 6, 'qwe', 'qwe', '2024-09-19', 'Masculino', 'Equipo no clasificado'),
(8, 'Chealsie', 'a', 3, 4, 4, 6, '1', '2', '2024-09-21', 'Femenino', 'Equipo no clasificado'),
(9, 'real madrid', 'a', 3, 4, 4, 6, 'asd', 'sad', '2024-09-21', 'Masculino', 'Equipo no clasificado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `standings_groups`
--

DROP TABLE IF EXISTS `standings_groups`;
CREATE TABLE `standings_groups` (
  `STAG_CODE` int(11) NOT NULL,
  `VOGE_CODE` int(11) NOT NULL COMMENT 'RELACION VOCALIA GENERAL',
  `GRS_CODE` int(11) NOT NULL COMMENT 'RELACION FASE DE GRUPOS',
  `STAG_PLAYED_MATCH` varchar(200) NOT NULL COMMENT 'PARTIDOS JUGADOS',
  `STAG_GOAL_DIFFERENCE` varchar(200) NOT NULL COMMENT 'GOOL DIFERENCIA',
  `STAG_POINTS` varchar(200) NOT NULL COMMENT 'PUNTOS A FAVOR',
  `STAG_TYPE_PHASE` varchar(200) NOT NULL COMMENT 'GUARDAMOS TIPOS DE FASE QUE ESTE '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `standings_groups`:
--   `VOGE_CODE`
--       `vocalia_general` -> `VOGE_CODE`
--   `GRS_CODE`
--       `groupstage` -> `GRS_CODE`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `team_player`
--

DROP TABLE IF EXISTS `team_player`;
CREATE TABLE `team_player` (
  `TEAP_CODE` int(11) NOT NULL COMMENT 'CODGIO',
  `ICLI_CODE` int(11) NOT NULL COMMENT 'CODIGO-FORANEO-ICLI',
  `SPG_CODE` int(11) NOT NULL COMMENT 'CODIGO-FORANEO-SPG',
  `TEAP_SHIRT_NUMBER` int(11) NOT NULL COMMENT 'NUMERO-JUGADOR'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `team_player`:
--   `SPG_CODE`
--       `sports_groups` -> `SPG_CODE`
--   `ICLI_CODE`
--       `info_client` -> `ICLI_CODE`
--

--
-- Volcado de datos para la tabla `team_player`
--

INSERT INTO `team_player` (`TEAP_CODE`, `ICLI_CODE`, `SPG_CODE`, `TEAP_SHIRT_NUMBER`) VALUES
(6, 5, 1, 5),
(7, 6, 1, 52),
(8, 4, 1, 1),
(9, 28, 1, 2),
(10, 30, 1, 4),
(11, 32, 1, 54),
(12, 29, 1, 444),
(13, 31, 1, 111),
(14, 33, 1, 23),
(21, 39, 1, 222),
(22, 38, 2, 88),
(23, 34, 9, 55),
(24, 40, 9, 2),
(25, 35, 8, 2),
(26, 37, 8, 66);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_admin`
--

DROP TABLE IF EXISTS `user_admin`;
CREATE TABLE `user_admin` (
  `USAD_CODE` int(11) NOT NULL,
  `USAD_USERNAME` varchar(25) NOT NULL,
  `USAD_EMAIL` varchar(50) NOT NULL,
  `USAD_PASSWORD` varchar(250) NOT NULL,
  `USAD_EMAIL_RECOVERY` varchar(50) NOT NULL,
  `USAD_ROLE` varchar(50) NOT NULL,
  `USAD_DATE_CREATED` date NOT NULL,
  `ICLI_CODE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `user_admin`:
--   `ICLI_CODE`
--       `info_client` -> `ICLI_CODE`
--

--
-- Volcado de datos para la tabla `user_admin`
--

INSERT INTO `user_admin` (`USAD_CODE`, `USAD_USERNAME`, `USAD_EMAIL`, `USAD_PASSWORD`, `USAD_EMAIL_RECOVERY`, `USAD_ROLE`, `USAD_DATE_CREATED`, `ICLI_CODE`) VALUES
(3, 'ccc', 'k@g.com', '$2y$10$A1aZhCm9K7IvC2tQTg03qeRVAk9H0Cobj2QSygSVY/X6xUMmx..zu', 'yyyyy', 'albitro', '2024-09-11', 4),
(5, 'keev1', 'p@g.com', '$2y$10$cFOt.kq2vYVeLuDLdQlkUemA1jpNlwXcZTdwx/hKKexLcdtuVhgKm', 'kevinsan1835@gmail.com', 'lider', '2024-09-13', 6),
(6, 'REW', 'b@g.com', '$2a$12$1UXfMMWCjVitPgpmx.Tzx.k66iD37ZThPnZ.9HFpi4eAjHiunrh8O', 'asd', 'admin', '2024-07-22', 40);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vocalia_general`
--

DROP TABLE IF EXISTS `vocalia_general`;
CREATE TABLE `vocalia_general` (
  `VOGE_CODE` int(11) NOT NULL,
  `MATC_CODE` int(11) NOT NULL,
  `VOGE_TOTAL_GOALS_TEAM_ONE` int(11) DEFAULT NULL COMMENT 'TOTAL GOLES DEL PARTIDO',
  `VOGE_TOTAL_GOALS_TEAM_TWO` int(11) DEFAULT NULL,
  `VOGE_TOTAL_YELLOW_CARD` int(11) DEFAULT NULL COMMENT 'TOTAL AMARILLAS DEL PARTIDO',
  `VOGE_TOTAL_RED_CARD` int(11) DEFAULT NULL COMMENT 'TOTAL ROJAS DEL PARTIDO',
  `VOGE_TOTAL_CHANGES` int(11) DEFAULT NULL COMMENT 'TOTAL CAMBIOS DEL PARTIDO',
  `VOGE_REFEREE_REPORT` varchar(200) DEFAULT NULL COMMENT 'REPORTE DEL ALBITRO',
  `VOGE_VOCAL_REPORT` varchar(200) DEFAULT NULL COMMENT 'REPORTE DEL VOCAL',
  `VOGE_TEAM_WINNER` varchar(200) DEFAULT NULL COMMENT 'EQUPO GANADOR',
  `VOGE_TEAM_LOSER` varchar(200) DEFAULT NULL COMMENT 'EQUIPO PERDEDOR',
  `VOGE_TEAM_DRAW` varchar(50) DEFAULT NULL COMMENT 'SI EMPATO, NO EMPATO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `vocalia_general`:
--   `MATC_CODE`
--       `matches` -> `MATC_CODE`
--

--
-- Volcado de datos para la tabla `vocalia_general`
--

INSERT INTO `vocalia_general` (`VOGE_CODE`, `MATC_CODE`, `VOGE_TOTAL_GOALS_TEAM_ONE`, `VOGE_TOTAL_GOALS_TEAM_TWO`, `VOGE_TOTAL_YELLOW_CARD`, `VOGE_TOTAL_RED_CARD`, `VOGE_TOTAL_CHANGES`, `VOGE_REFEREE_REPORT`, `VOGE_VOCAL_REPORT`, `VOGE_TEAM_WINNER`, `VOGE_TEAM_LOSER`, `VOGE_TEAM_DRAW`) VALUES
(2, 1, 1, 2, 3, 3, 3, 'Ninguno', 'Nada', 'tttttt', 'Barcelona', 'No'),
(3, 2, 2, 2, 3, 2, 2, '2', '2', '2', '2', '2'),
(4, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vocalia_sheet`
--

DROP TABLE IF EXISTS `vocalia_sheet`;
CREATE TABLE `vocalia_sheet` (
  `VOSH_CODE` int(11) NOT NULL,
  `VOGE_CODE` int(11) NOT NULL,
  `TEAP_CODE` int(11) NOT NULL COMMENT 'CODIGO DEL JUGADOR PRINCIPAL',
  `VOSH_GOALS` int(11) DEFAULT NULL COMMENT 'NUMERO DE GOLES DEL JUGADOR',
  `VOSH_YELLOW_CARD` varchar(100) DEFAULT NULL COMMENT 'TARJETAS AMARILLAS DEL JUGADOR PRINCIPAL',
  `VOSH_RED_CARD` varchar(100) DEFAULT NULL COMMENT 'TARJETAS ROJAS DEL JUGADOR PRINCIPAL',
  `TEAP_CODE_CHANGE` int(11) DEFAULT NULL COMMENT 'CODIGO DEL JUGADOR POR EL QUE SE CAMBIA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `vocalia_sheet`:
--   `TEAP_CODE`
--       `team_player` -> `TEAP_CODE`
--   `TEAP_CODE_CHANGE`
--       `team_player` -> `TEAP_CODE`
--   `VOGE_CODE`
--       `vocalia_general` -> `VOGE_CODE`
--

--
-- Volcado de datos para la tabla `vocalia_sheet`
--

INSERT INTO `vocalia_sheet` (`VOSH_CODE`, `VOGE_CODE`, `TEAP_CODE`, `VOSH_GOALS`, `VOSH_YELLOW_CARD`, `VOSH_RED_CARD`, `TEAP_CODE_CHANGE`) VALUES
(2, 2, 6, 1, '1', '1', NULL),
(3, 2, 22, NULL, '0', '0', NULL),
(4, 4, 22, NULL, NULL, NULL, NULL),
(5, 4, 23, NULL, NULL, NULL, NULL),
(6, 4, 24, NULL, NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `available_dates`
--
ALTER TABLE `available_dates`
  ADD PRIMARY KEY (`AVD_CODE`),
  ADD KEY `SPG_CODE` (`SPG_CODE`);

--
-- Indices de la tabla `busineess_headquarters`
--
ALTER TABLE `busineess_headquarters`
  ADD PRIMARY KEY (`BUSH_CODE`),
  ADD KEY `BUIF_CODE` (`BUIF_CODE`);

--
-- Indices de la tabla `business_information`
--
ALTER TABLE `business_information`
  ADD PRIMARY KEY (`BUIF_CODE`);

--
-- Indices de la tabla `court`
--
ALTER TABLE `court`
  ADD PRIMARY KEY (`CANC_CODE`);

--
-- Indices de la tabla `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`GRUP_CODE`);

--
-- Indices de la tabla `groupstage`
--
ALTER TABLE `groupstage`
  ADD PRIMARY KEY (`GRS_CODE`),
  ADD KEY `fk_group_code` (`GRUP_CODE`),
  ADD KEY `fk_teams_code` (`SPG_CODE`);

--
-- Indices de la tabla `info_client`
--
ALTER TABLE `info_client`
  ADD PRIMARY KEY (`ICLI_CODE`),
  ADD KEY `BUSH_CODE` (`BUSH_CODE`);

--
-- Indices de la tabla `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`MATC_CODE`),
  ADD KEY `CANCHA_ID` (`CANC_CODE`),
  ADD KEY `TEAM_ID_1` (`SPG_CODE_ONE`),
  ADD KEY `TEAM_ID_2` (`SPG_CODE_TWO`);

--
-- Indices de la tabla `rules`
--
ALTER TABLE `rules`
  ADD PRIMARY KEY (`RU_CODE`),
  ADD KEY `USAD_CODE` (`USAD_CODE`);

--
-- Indices de la tabla `sports_groups`
--
ALTER TABLE `sports_groups`
  ADD PRIMARY KEY (`SPG_CODE`),
  ADD KEY `fk_madrina` (`ICLI_GODMOTHER`),
  ADD KEY `fk_pet` (`ICLI_TEAM_PED_ID`),
  ADD KEY `fk_team_leader` (`ICLI_TEAM_LEADER_ID`),
  ADD KEY `RU_CODE` (`RU_CODE`);

--
-- Indices de la tabla `standings_groups`
--
ALTER TABLE `standings_groups`
  ADD PRIMARY KEY (`STAG_CODE`),
  ADD KEY `VOGE_CODE` (`VOGE_CODE`),
  ADD KEY `GRS_CODE` (`GRS_CODE`);

--
-- Indices de la tabla `team_player`
--
ALTER TABLE `team_player`
  ADD PRIMARY KEY (`TEAP_CODE`),
  ADD KEY `SPG_CODE` (`SPG_CODE`),
  ADD KEY `ICLI_CODE` (`ICLI_CODE`);

--
-- Indices de la tabla `user_admin`
--
ALTER TABLE `user_admin`
  ADD PRIMARY KEY (`USAD_CODE`),
  ADD KEY `ICLI_CODE` (`ICLI_CODE`);

--
-- Indices de la tabla `vocalia_general`
--
ALTER TABLE `vocalia_general`
  ADD PRIMARY KEY (`VOGE_CODE`),
  ADD KEY `MATC_CODE` (`MATC_CODE`);

--
-- Indices de la tabla `vocalia_sheet`
--
ALTER TABLE `vocalia_sheet`
  ADD PRIMARY KEY (`VOSH_CODE`),
  ADD KEY `TEAP_CODE` (`TEAP_CODE`),
  ADD KEY `TEAP_CODE_CHANGE` (`TEAP_CODE_CHANGE`),
  ADD KEY `VOGE_CODE` (`VOGE_CODE`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `available_dates`
--
ALTER TABLE `available_dates`
  MODIFY `AVD_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODIGO', AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `busineess_headquarters`
--
ALTER TABLE `busineess_headquarters`
  MODIFY `BUSH_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `business_information`
--
ALTER TABLE `business_information`
  MODIFY `BUIF_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `court`
--
ALTER TABLE `court`
  MODIFY `CANC_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODIGO', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `groups`
--
ALTER TABLE `groups`
  MODIFY `GRUP_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODIGO', AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `groupstage`
--
ALTER TABLE `groupstage`
  MODIFY `GRS_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODGIO', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `info_client`
--
ALTER TABLE `info_client`
  MODIFY `ICLI_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODIGO', AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `matches`
--
ALTER TABLE `matches`
  MODIFY `MATC_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODIGO', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `rules`
--
ALTER TABLE `rules`
  MODIFY `RU_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `sports_groups`
--
ALTER TABLE `sports_groups`
  MODIFY `SPG_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CDOGIO', AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `standings_groups`
--
ALTER TABLE `standings_groups`
  MODIFY `STAG_CODE` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `team_player`
--
ALTER TABLE `team_player`
  MODIFY `TEAP_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODGIO', AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `user_admin`
--
ALTER TABLE `user_admin`
  MODIFY `USAD_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `vocalia_general`
--
ALTER TABLE `vocalia_general`
  MODIFY `VOGE_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `vocalia_sheet`
--
ALTER TABLE `vocalia_sheet`
  MODIFY `VOSH_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `available_dates`
--
ALTER TABLE `available_dates`
  ADD CONSTRAINT `available_dates_ibfk_1` FOREIGN KEY (`SPG_CODE`) REFERENCES `sports_groups` (`SPG_CODE`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `busineess_headquarters`
--
ALTER TABLE `busineess_headquarters`
  ADD CONSTRAINT `busineess_headquarters_ibfk_1` FOREIGN KEY (`BUIF_CODE`) REFERENCES `business_information` (`BUIF_CODE`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `groupstage`
--
ALTER TABLE `groupstage`
  ADD CONSTRAINT `groupstage_ibfk_1` FOREIGN KEY (`SPG_CODE`) REFERENCES `sports_groups` (`SPG_CODE`) ON UPDATE CASCADE,
  ADD CONSTRAINT `groupstage_ibfk_2` FOREIGN KEY (`GRUP_CODE`) REFERENCES `groups` (`GRUP_CODE`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `info_client`
--
ALTER TABLE `info_client`
  ADD CONSTRAINT `info_client_ibfk_1` FOREIGN KEY (`BUSH_CODE`) REFERENCES `busineess_headquarters` (`BUSH_CODE`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`SPG_CODE_ONE`) REFERENCES `sports_groups` (`SPG_CODE`) ON UPDATE CASCADE,
  ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`SPG_CODE_TWO`) REFERENCES `sports_groups` (`SPG_CODE`) ON UPDATE CASCADE,
  ADD CONSTRAINT `matches_ibfk_3` FOREIGN KEY (`CANC_CODE`) REFERENCES `court` (`CANC_CODE`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `rules`
--
ALTER TABLE `rules`
  ADD CONSTRAINT `rules_ibfk_1` FOREIGN KEY (`USAD_CODE`) REFERENCES `user_admin` (`USAD_CODE`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `sports_groups`
--
ALTER TABLE `sports_groups`
  ADD CONSTRAINT `fk_sports_groups_rules` FOREIGN KEY (`RU_CODE`) REFERENCES `rules` (`RU_CODE`),
  ADD CONSTRAINT `sports_groups_ibfk_1` FOREIGN KEY (`ICLI_GODMOTHER`) REFERENCES `info_client` (`ICLI_CODE`) ON UPDATE CASCADE,
  ADD CONSTRAINT `sports_groups_ibfk_2` FOREIGN KEY (`ICLI_TEAM_LEADER_ID`) REFERENCES `info_client` (`ICLI_CODE`) ON UPDATE CASCADE,
  ADD CONSTRAINT `sports_groups_ibfk_3` FOREIGN KEY (`ICLI_TEAM_PED_ID`) REFERENCES `info_client` (`ICLI_CODE`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `standings_groups`
--
ALTER TABLE `standings_groups`
  ADD CONSTRAINT `standings_groups_ibfk_1` FOREIGN KEY (`VOGE_CODE`) REFERENCES `vocalia_general` (`VOGE_CODE`) ON UPDATE CASCADE,
  ADD CONSTRAINT `standings_groups_ibfk_2` FOREIGN KEY (`GRS_CODE`) REFERENCES `groupstage` (`GRS_CODE`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `team_player`
--
ALTER TABLE `team_player`
  ADD CONSTRAINT `team_player_ibfk_1` FOREIGN KEY (`SPG_CODE`) REFERENCES `sports_groups` (`SPG_CODE`) ON UPDATE CASCADE,
  ADD CONSTRAINT `team_player_ibfk_2` FOREIGN KEY (`ICLI_CODE`) REFERENCES `info_client` (`ICLI_CODE`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `user_admin`
--
ALTER TABLE `user_admin`
  ADD CONSTRAINT `user_admin_ibfk_1` FOREIGN KEY (`ICLI_CODE`) REFERENCES `info_client` (`ICLI_CODE`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `vocalia_general`
--
ALTER TABLE `vocalia_general`
  ADD CONSTRAINT `vocalia_general_ibfk_1` FOREIGN KEY (`MATC_CODE`) REFERENCES `matches` (`MATC_CODE`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `vocalia_sheet`
--
ALTER TABLE `vocalia_sheet`
  ADD CONSTRAINT `vocalia_sheet_ibfk_2` FOREIGN KEY (`TEAP_CODE`) REFERENCES `team_player` (`TEAP_CODE`) ON UPDATE CASCADE,
  ADD CONSTRAINT `vocalia_sheet_ibfk_3` FOREIGN KEY (`TEAP_CODE_CHANGE`) REFERENCES `team_player` (`TEAP_CODE`) ON UPDATE CASCADE,
  ADD CONSTRAINT `vocalia_sheet_ibfk_4` FOREIGN KEY (`VOGE_CODE`) REFERENCES `vocalia_general` (`VOGE_CODE`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
