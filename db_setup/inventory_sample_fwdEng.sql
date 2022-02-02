-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema inventory_sample
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema inventory_sample
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `inventory_sample` DEFAULT CHARACTER SET latin1 ;
USE `inventory_sample` ;

-- -----------------------------------------------------
-- Table `inventory_sample`.`stuff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inventory_sample`.`stuff` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(45) NULL DEFAULT NULL,
  `name` VARCHAR(45) NOT NULL,
  `quantity` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
