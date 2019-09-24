const express = require('express');
const bodyParser = require('body-parser');
const {Nuxt, Builder} = require('nuxt');
const nodemailer = require('nodemailer');
const app = express();

const db = require('./config/database');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// // create db
// app.get('/createdb', (req, res) => {
//   let sql = 'CREATE DATABASE cities';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.sendStatus(200)
//   })
// });
//
// create table
app.get('/createtable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body varchar(255), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.sendStatus(200)
  })
});

// post 1
app.get('/addpost1', (req, res) => {
  let post = {title: 'post 1', body: 'this body post 1'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    res.sendStatus(200)
  });
});

app.get('/admin/addpost2', (req, res) => {
  let post = {title: 'post 2', body: 'this body post 2'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    res.sendStatus(200)
  });
});

//get posts
app.get('/admin/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql,(err, result) => {
    if (err) throw err;
    res.send(result)
  });
});
app.post('/send', (req, res) => {
  const output = `
    <p>Name: ${req.body.name}</p>
    <p>Message: ${req.body.message}</p>
  `;

  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'crazymax96@bk.ru', // generated ethereal user
        pass: 'ZvjueKTNFnm2010' // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Masyanyaz" <crazymax96@bk.ru>', // sender address
      to: `${req.body.email}`, // list of receivers
      subject: 'First', // Subject line
      html: output // html body
    });
  }

  main().catch(console.error);
});



// import api from './api'

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start() {
  // app.use('/api', api)

  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const {host, port} = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  console.log('Server started')
}

start();
