const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const upload = require('express-fileupload');
const nodemailer = require('nodemailer');
const app = express();

const db = require('./config/database');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(upload());


