-- MySQL Script generated by MySQL Workbench
-- mar 18 oct 2022 14:44:06
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mercadito_libre
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mercadito_libre
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mercadito_libre` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `mercadito_libre` ;

-- -----------------------------------------------------
-- Table `mercadito_libre`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercadito_libre`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `verify` TINYINT(1) NOT NULL DEFAULT 0,
  `token` VARCHAR(100) NULL,
  `rol` VARCHAR(10) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mercadito_libre`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercadito_libre`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mercadito_libre`.`sub_categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercadito_libre`.`sub_categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `category` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `category_ref_idx` (`category` ASC) VISIBLE,
  CONSTRAINT `category_ref`
    FOREIGN KEY (`category`)
    REFERENCES `mercadito_libre`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mercadito_libre`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercadito_libre`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `user_id` INT NOT NULL,
  `sub_category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `created_by_idx` (`user_id` ASC) VISIBLE,
  INDEX `sub_category_ref_idx` (`sub_category_id` ASC) VISIBLE,
  CONSTRAINT `created_by`
    FOREIGN KEY (`user_id`)
    REFERENCES `mercadito_libre`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `sub_category_ref`
    FOREIGN KEY (`sub_category_id`)
    REFERENCES `mercadito_libre`.`sub_categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
