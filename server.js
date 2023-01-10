// packages needed for this application
const inquirer = require("inquirer");
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3004;
const app = express();

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'jQ294*c1Ey4Y',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );