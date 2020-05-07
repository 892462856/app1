/*
Navicat MySQL Data Transfer

Source Server         : qqq
Source Server Version : 80000
Source Host           : localhost:3306
Source Database       : app1

Target Server Type    : MYSQL
Target Server Version : 80000
File Encoding         : 65001

Date: 2020-05-07 18:39:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `datetime` datetime NOT NULL,
  `link` varchar(1000) DEFAULT NULL,
  `fetchCode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of articles
-- ----------------------------

-- ----------------------------
-- Table structure for classifys
-- ----------------------------
DROP TABLE IF EXISTS `classifys`;
CREATE TABLE `classifys` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `order` int(11) NOT NULL DEFAULT '1',
  `enabled` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of classifys
-- ----------------------------

-- ----------------------------
-- Table structure for tabs
-- ----------------------------
DROP TABLE IF EXISTS `tabs`;
CREATE TABLE `tabs` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `enabled` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tabs
-- ----------------------------
