const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const upload = require('express-fileupload');
const {Nuxt, Builder} = require('nuxt');
const nodemailer = require('nodemailer');
const app = express();

const db = require('./config/database');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(upload());

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
app.get('/api', (req, res) => {
  res.send('hello')
});
app.get('/api/createtable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body varchar(255), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.sendStatus(200)
  })
});

app.post('/api/ccc', (req, res) => {
  console.log(req.files);
});

// post 1
app.post('/api/addcity', (req, res) => {
  let city = {
    title: req.body.title,
    description: req.body.description,
    h1: req.body.h1,
    url: req.body.url,
    lang: req.body.lang,
    name: req.body.name,
  };
  let file = req.files.file;
  let filename = file.name;
  let fileExt = filename.slice(filename.lastIndexOf('.'));
  filename = `${city.name}${fileExt}`;
  let path = `/image/${city.lang}/${city.url}/`;
  let filePath = path + filename;
  fs.mkdirSync('./static' + path, {recursive: true}, e => {
    throw e;
  });
  file.mv('./static' + filePath, e => {
    if(e) console.log(e)
  });
  city.previewImageSrc = filePath;
  city.imageSrc = filePath;
  console.log(city);

  let sql = 'INSERT INTO cities SET ?';
  let query = db.query(sql, city, (err, result) => {
    if (err) throw err;
    res.send('Form submitted')
  });
});

app.post('/api/addexcursion', (req, res) => {
  console.log(req.body)
  let exc = {
    city: req.body.city,
    city_id: req.body.city_id,
    title: req.body.title,
    description: req.body.description,
    h1: req.body.h1,
    url: req.body.url,
    lang: req.body.lang,
    name: req.body.name,
    detailText: req.body.detailText,
    included: req.body.included,
    excluded: req.body.excluded,
    groupSize: req.body.groupSize,
    price: req.body.price,
    time: req.body.time,
    type: req.body.type,
    previewImageSrc: req.body.previewImageSrc,
    imageSrc: req.body.imageSrc,
  };
  let sql = 'INSERT INTO excursion SET ?';
  let query = db.query(sql, exc, (err, result) => {
    if (err) throw err;
    res.send('Form submitted');
  });
});

app.get('/api/addpost2', (req, res) => {
  let post = {title: 'post 2', body: 'this body post 2'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    res.sendStatus(200)
  });
});

//get posts
app.get('/api/getcities', (req, res) => {
  let sql = 'SELECT * FROM cities';
  let query = db.query(sql,(err, result) => {
    if (err) throw err;
    res.send(result)
  });
});

app.get('/api/getcities/:id', (req, res) => {
  let sql = `SELECT * FROM cities WHERE lang = '${req.params.id}'`;
  let query = db.query(sql,(err, result) => {
    if (err) throw err;
    res.send(result)
  });
});

app.get('/api/getexcursion', (req, res) => {
  let sql = 'SELECT * FROM excursion';
  let query = db.query(sql,(err, result) => {
    if (err) throw err;
    res.send(result)
  });
});

app.get('/api/getexcursion/:lang/:id', (req, res) => {
  let sql = `SELECT * FROM excursion WHERE city = '${req.params.id}' AND lang = '${req.params.lang}'`;
  let query = db.query(sql,(err, result) => {
    if (err) throw err;
    res.send(result)
  });
});

app.post('/send', (req, res) => {
  const output = `
    <p>Name: ${req.body.name}</p>
    <p>Email: ${req.body.email}</p>
    <p>Message: ${req.body.message}</p>
  `;

  async function main() {
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
      to: `bryachnev.wunder.russia@gmail.com`, // list of receivers
      subject: 'First', // Subject line
      html: output // html body
    });
  }

  main().catch(console.error);
  res.send('Form submitted')
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
