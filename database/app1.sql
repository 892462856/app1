/*
Navicat MySQL Data Transfer

Source Server         : qqq
Source Server Version : 80000
Source Host           : localhost:3306
Source Database       : app1

Target Server Type    : MYSQL
Target Server Version : 80000
File Encoding         : 65001

Date: 2020-05-09 15:39:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` varchar(255) CHARACTER SET utf8 NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  `content` text CHARACTER SET utf8 NOT NULL,
  `datetime` datetime NOT NULL,
  `order` int(4) NOT NULL DEFAULT '1',
  `link` varchar(1000) CHARACTER SET utf8 DEFAULT NULL,
  `fetchCode` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for articlesclassify
-- ----------------------------
DROP TABLE IF EXISTS `articlesclassify`;
CREATE TABLE `articlesclassify` (
  `articles_id` varchar(255) NOT NULL,
  `classifys_id` varchar(255) NOT NULL,
  PRIMARY KEY (`articles_id`,`classifys_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for articlestabs
-- ----------------------------
DROP TABLE IF EXISTS `articlestabs`;
CREATE TABLE `articlestabs` (
  `articles_id` varchar(255) NOT NULL,
  `tabs_id` varchar(255) NOT NULL,
  PRIMARY KEY (`articles_id`,`tabs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for classifys
-- ----------------------------
DROP TABLE IF EXISTS `classifys`;
CREATE TABLE `classifys` (
  `id` varchar(255) CHARACTER SET utf8 NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `order` int(11) NOT NULL DEFAULT '1',
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` varchar(255) NOT NULL,
  `parentId` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT '1',
  `order` int(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tabs
-- ----------------------------
DROP TABLE IF EXISTS `tabs`;
CREATE TABLE `tabs` (
  `id` varchar(255) CHARACTER SET utf8 NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
