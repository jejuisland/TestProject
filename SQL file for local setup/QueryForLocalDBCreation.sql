-- For Local Setup run this query
CREATE DATABASE ims_db;

USE ims_db;

CREATE TABLE subscriber (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phoneNumber VARCHAR(255),
  username VARCHAR(255),
  password VARCHAR(255),
  domain VARCHAR(255),
  status VARCHAR(255),
  features JSON NULL DEFAULT NULL
);