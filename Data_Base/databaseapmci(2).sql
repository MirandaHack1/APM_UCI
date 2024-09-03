-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-09-2024 a las 22:20:34
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
-- Estructura de tabla para la tabla `administrator`
--

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE `administrator` (
  `ADM_CODE` int(11) NOT NULL COMMENT 'CODIGO',
  `ADM_FIRST_NAME` varchar(50) NOT NULL COMMENT 'NOMBRE',
  `ADM_LAST_NAME` varchar(50) NOT NULL COMMENT 'APELLIDO',
  `ADM_CARD` varchar(20) NOT NULL COMMENT 'CEDULA',
  `ADM_PHONE_NUMBER` varchar(15) NOT NULL COMMENT 'TELEFONO',
  `ADM_CITY` varchar(50) NOT NULL COMMENT 'CIUDAD',
  `ADM_PROVINCE` varchar(50) NOT NULL COMMENT 'PROVINCIA',
  `ADM_ADDRESS` varchar(100) NOT NULL COMMENT 'DIRECCION',
  `ADM_HEIGHT` decimal(5,2) NOT NULL COMMENT 'ALTURA',
  `ADM_WEIGHT` decimal(5,2) NOT NULL COMMENT 'PESO',
  `ADM_DATE_OF_BIRTH` date NOT NULL COMMENT 'FECHA-CUMPLEAÑOS',
  `USAD_CODE` int(11) NOT NULL COMMENT 'CODIGO-USUARIO-CORREO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `administrator`:
--   `USAD_CODE`
--       `user_admin` -> `USAD_CODE`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `available_dates`
--

DROP TABLE IF EXISTS `available_dates`;
CREATE TABLE `available_dates` (
  `AVD_CODE` int(11) NOT NULL COMMENT 'CODIGO',
  `SPG_CODE` int(11) NOT NULL COMMENT 'CODIGO-FORANEO-SPG',
  `AVD_AVAILABLE_DATE` date NOT NULL COMMENT 'FECHA-DISPONIBLES',
  `AVD_AVAILABLE_HOUR` time NOT NULL COMMENT 'HORA-DISPONIBLE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `available_dates`:
--   `SPG_CODE`
--       `sports_groups` -> `SPG_CODE`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `business_information`
--

DROP TABLE IF EXISTS `business_information`;
CREATE TABLE `business_information` (
  `BUIF_CODE` int(11) NOT NULL,
  `BUIF_NAME` varchar(50) DEFAULT NULL,
  `BUIF_LOGO` varchar(50) DEFAULT NULL,
  `BUIF_MISSION` text DEFAULT NULL,
  `BUIF_VISION` text DEFAULT NULL,
  `BUIF_IMAGE` varchar(50) DEFAULT NULL,
  `BUIF_STATE` tinyint(1) DEFAULT NULL,
  `BUIF_ADDRESS` varchar(100) DEFAULT NULL,
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

INSERT INTO `business_information` (`BUIF_CODE`, `BUIF_NAME`, `BUIF_LOGO`, `BUIF_MISSION`, `BUIF_VISION`, `BUIF_IMAGE`, `BUIF_STATE`, `BUIF_ADDRESS`, `BUIF_CONTACT`, `BUIF_USER_INSERT`, `BUIF_USER_DELETE`, `BUIF_USER_UPDATE`, `BUIF_INSERT_DATE`, `BUIF_UPDATE_DATE`, `BUIF_DELETE_DATE`) VALUES
(1, 'Universidad Regional Autónoma de los Andes', '', 'Somos una Universidad particular, que tiene como propósito formar profesionales de tercer y cuarto nivel, de investigación, responsables, competitivos, con conciencia ética y solidaria capaces de contribuir al desarrollo nacional e internacional, mediante una educación humanista, cultural y científica dirigida a bachilleres y profesionales nacionales y extranjeros.', 'Hasta el 2024, ser una institución reconocida a nivel nacional e internacional por su calidad, manteniendo entre sus fortalezas un cuerpo docente de alto nivel académico, ético; y un proceso de formación profesional centrado en el estudiante, acorde con los avances científicos, tecnológicos, de investigación en vínculo permanente con la identificación y solución de problemas de los sectores sociales y productivos.', '', 1, 'Vía a Baños km 5 1/2. Ambato, Ecuador', '097 983 4941 / 099 372 01', NULL, NULL, NULL, NULL, NULL, NULL);

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
  `USAD_CODE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `info_client`:
--   `USAD_CODE`
--       `user_admin` -> `USAD_CODE`
--

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
  `SPG_CODE_TWO` int(11) NOT NULL COMMENT 'CODIGO-FORANEO-SPG'
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rules`
--

DROP TABLE IF EXISTS `rules`;
CREATE TABLE `rules` (
  `RU_CODE` int(11) NOT NULL,
  `RU_DESCRIPTION_RULES` text NOT NULL COMMENT 'VAMOS A GUARDAR EL PDF DE LAS REGLAS',
  `RU_DATE` date NOT NULL COMMENT 'FECHA DEL ENVIO DE LAS REGLAS',
  `ADM_CODE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `rules`:
--   `ADM_CODE`
--       `administrator` -> `ADM_CODE`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sports_groups`
--

DROP TABLE IF EXISTS `sports_groups`;
CREATE TABLE `sports_groups` (
  `SPG_CODE` int(11) NOT NULL COMMENT 'CDOGIO',
  `SPG_TEAM_NAME` varchar(50) NOT NULL COMMENT 'NOMBRE-EQUIPO',
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
--   `ICLI_GODMOTHER`
--       `info_client` -> `ICLI_CODE`
--   `ICLI_TEAM_LEADER_ID`
--       `info_client` -> `ICLI_CODE`
--   `ICLI_TEAM_PED_ID`
--       `info_client` -> `ICLI_CODE`
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_admin`
--

DROP TABLE IF EXISTS `user_admin`;
CREATE TABLE `user_admin` (
  `USAD_CODE` int(11) NOT NULL,
  `USAD_USERNAME` varchar(25) NOT NULL,
  `USAD_EMAIL` varchar(50) NOT NULL,
  `USAD_PASSWORD` varchar(50) NOT NULL,
  `USAD_EMAIL_RECOVERY` varchar(50) NOT NULL,
  `USAD_ROLE` varchar(50) NOT NULL,
  `USAD_DATE_CREATED` date NOT NULL,
  `BUIF_CODE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `user_admin`:
--   `BUIF_CODE`
--       `business_information` -> `BUIF_CODE`
--

--
-- Volcado de datos para la tabla `user_admin`
--

INSERT INTO `user_admin` (`USAD_CODE`, `USAD_USERNAME`, `USAD_EMAIL`, `USAD_PASSWORD`, `USAD_EMAIL_RECOVERY`, `USAD_ROLE`, `USAD_DATE_CREATED`, `BUIF_CODE`) VALUES
(1, 'Jhonny ', 'miranda3791167@gmail.com', '123456', 'zzz', 'Administrador', '2024-09-02', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vocalia_general`
--

DROP TABLE IF EXISTS `vocalia_general`;
CREATE TABLE `vocalia_general` (
  `VOGE_CODE` int(11) NOT NULL,
  `VOSH_CODE` int(11) NOT NULL COMMENT 'CODIGO DEL VOCALIA SHEET',
  `VOGE_TOTAL_GOALS` int(11) NOT NULL COMMENT 'TOTAL GOLES DEL PARTIDO',
  `VOGE_TOTAL_YELLOW_CARD` int(11) NOT NULL COMMENT 'TOTAL AMARILLAS DEL PARTIDO',
  `VOGE_TOTAL_RED_CARD` int(11) NOT NULL COMMENT 'TOTAL ROJAS DEL PARTIDO',
  `VOGE_TOTAL_CHANGES` int(11) NOT NULL COMMENT 'TOTAL CAMBIOS DEL PARTIDO',
  `VOGE_REFEREE_REPORT` varchar(200) NOT NULL COMMENT 'REPORTE DEL ALBITRO',
  `VOGE_VOCAL_REPORT` varchar(200) NOT NULL COMMENT 'REPORTE DEL VOCAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `vocalia_general`:
--   `VOSH_CODE`
--       `vocalia_sheet` -> `VOSH_CODE`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vocalia_sheet`
--

DROP TABLE IF EXISTS `vocalia_sheet`;
CREATE TABLE `vocalia_sheet` (
  `VOSH_CODE` int(11) NOT NULL,
  `TEAP_CODE` int(11) NOT NULL COMMENT 'CODIGO DEL JUGADOR PRINCIPAL',
  `VOSH_GOALS` int(11) DEFAULT NULL COMMENT 'NUMERO DE GOLES DEL JUGADOR',
  `MATC_CODE` int(11) NOT NULL COMMENT 'CODIGO DEL PARTIDO',
  `VOSH_YELLOW_CARD` varchar(100) DEFAULT NULL COMMENT 'TARJETAS AMARILLAS DEL JUGADOR PRINCIPAL',
  `VOSH_RED_CARD` varchar(100) DEFAULT NULL COMMENT 'TARJETAS ROJAS DEL JUGADOR PRINCIPAL',
  `TEAP_CODE_CHANGE` int(11) DEFAULT NULL COMMENT 'CODIGO DEL JUGADOR POR EL QUE SE CAMBIA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `vocalia_sheet`:
--   `MATC_CODE`
--       `matches` -> `MATC_CODE`
--   `TEAP_CODE`
--       `team_player` -> `TEAP_CODE`
--   `TEAP_CODE_CHANGE`
--       `team_player` -> `TEAP_CODE`
--

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`ADM_CODE`),
  ADD KEY `fk_usad_codes` (`USAD_CODE`);

--
-- Indices de la tabla `available_dates`
--
ALTER TABLE `available_dates`
  ADD PRIMARY KEY (`AVD_CODE`),
  ADD KEY `SPG_CODE` (`SPG_CODE`);

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
  ADD KEY `fk_usad_code` (`USAD_CODE`);

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
  ADD KEY `ADM_CODE` (`ADM_CODE`);

--
-- Indices de la tabla `sports_groups`
--
ALTER TABLE `sports_groups`
  ADD PRIMARY KEY (`SPG_CODE`),
  ADD KEY `fk_madrina` (`ICLI_GODMOTHER`),
  ADD KEY `fk_pet` (`ICLI_TEAM_PED_ID`),
  ADD KEY `fk_team_leader` (`ICLI_TEAM_LEADER_ID`);

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
  ADD KEY `fk_buif_code` (`BUIF_CODE`);

--
-- Indices de la tabla `vocalia_general`
--
ALTER TABLE `vocalia_general`
  ADD PRIMARY KEY (`VOGE_CODE`),
  ADD KEY `VOSH_CODE` (`VOSH_CODE`);

--
-- Indices de la tabla `vocalia_sheet`
--
ALTER TABLE `vocalia_sheet`
  ADD PRIMARY KEY (`VOSH_CODE`),
  ADD KEY `MATC_CODE` (`MATC_CODE`),
  ADD KEY `TEAP_CODE` (`TEAP_CODE`),
  ADD KEY `TEAP_CODE_CHANGE` (`TEAP_CODE_CHANGE`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrator`
--
ALTER TABLE `administrator`
  MODIFY `ADM_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODIGO';

--
-- AUTO_INCREMENT de la tabla `available_dates`
--
ALTER TABLE `available_dates`
  MODIFY `AVD_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODIGO';

--
-- AUTO_INCREMENT de la tabla `business_information`
--
ALTER TABLE `business_information`
  MODIFY `BUIF_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `court`
--
ALTER TABLE `court`
  MODIFY `CANC_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODIGO';

--
-- AUTO_INCREMENT de la tabla `groups`
--
ALTER TABLE `groups`
  MODIFY `GRUP_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODIGO';

--
-- AUTO_INCREMENT de la tabla `groupstage`
--
ALTER TABLE `groupstage`
  MODIFY `GRS_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODGIO';

--
-- AUTO_INCREMENT de la tabla `info_client`
--
ALTER TABLE `info_client`
  MODIFY `ICLI_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODIGO';

--
-- AUTO_INCREMENT de la tabla `matches`
--
ALTER TABLE `matches`
  MODIFY `MATC_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODIGO';

--
-- AUTO_INCREMENT de la tabla `rules`
--
ALTER TABLE `rules`
  MODIFY `RU_CODE` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sports_groups`
--
ALTER TABLE `sports_groups`
  MODIFY `SPG_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CDOGIO';

--
-- AUTO_INCREMENT de la tabla `team_player`
--
ALTER TABLE `team_player`
  MODIFY `TEAP_CODE` int(11) NOT NULL AUTO_INCREMENT COMMENT 'CODGIO';

--
-- AUTO_INCREMENT de la tabla `user_admin`
--
ALTER TABLE `user_admin`
  MODIFY `USAD_CODE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `vocalia_general`
--
ALTER TABLE `vocalia_general`
  MODIFY `VOGE_CODE` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `vocalia_sheet`
--
ALTER TABLE `vocalia_sheet`
  MODIFY `VOSH_CODE` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrator`
--
ALTER TABLE `administrator`
  ADD CONSTRAINT `administrator_ibfk_1` FOREIGN KEY (`USAD_CODE`) REFERENCES `user_admin` (`USAD_CODE`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `available_dates`
--
ALTER TABLE `available_dates`
  ADD CONSTRAINT `available_dates_ibfk_1` FOREIGN KEY (`SPG_CODE`) REFERENCES `sports_groups` (`SPG_CODE`) ON UPDATE CASCADE;

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
  ADD CONSTRAINT `info_client_ibfk_1` FOREIGN KEY (`USAD_CODE`) REFERENCES `user_admin` (`USAD_CODE`) ON UPDATE CASCADE;

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
  ADD CONSTRAINT `rules_ibfk_1` FOREIGN KEY (`ADM_CODE`) REFERENCES `administrator` (`ADM_CODE`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `sports_groups`
--
ALTER TABLE `sports_groups`
  ADD CONSTRAINT `sports_groups_ibfk_1` FOREIGN KEY (`ICLI_GODMOTHER`) REFERENCES `info_client` (`ICLI_CODE`) ON UPDATE CASCADE,
  ADD CONSTRAINT `sports_groups_ibfk_2` FOREIGN KEY (`ICLI_TEAM_LEADER_ID`) REFERENCES `info_client` (`ICLI_CODE`) ON UPDATE CASCADE,
  ADD CONSTRAINT `sports_groups_ibfk_3` FOREIGN KEY (`ICLI_TEAM_PED_ID`) REFERENCES `info_client` (`ICLI_CODE`) ON UPDATE CASCADE;

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
  ADD CONSTRAINT `user_admin_ibfk_1` FOREIGN KEY (`BUIF_CODE`) REFERENCES `business_information` (`BUIF_CODE`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `vocalia_general`
--
ALTER TABLE `vocalia_general`
  ADD CONSTRAINT `vocalia_general_ibfk_1` FOREIGN KEY (`VOSH_CODE`) REFERENCES `vocalia_sheet` (`VOSH_CODE`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `vocalia_sheet`
--
ALTER TABLE `vocalia_sheet`
  ADD CONSTRAINT `vocalia_sheet_ibfk_1` FOREIGN KEY (`MATC_CODE`) REFERENCES `matches` (`MATC_CODE`) ON UPDATE CASCADE,
  ADD CONSTRAINT `vocalia_sheet_ibfk_2` FOREIGN KEY (`TEAP_CODE`) REFERENCES `team_player` (`TEAP_CODE`) ON UPDATE CASCADE,
  ADD CONSTRAINT `vocalia_sheet_ibfk_3` FOREIGN KEY (`TEAP_CODE_CHANGE`) REFERENCES `team_player` (`TEAP_CODE`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
