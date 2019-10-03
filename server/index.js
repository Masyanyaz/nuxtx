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

// add city
app.post('/admin/api/addcity', (req, res) => {
  let city = {
    title: req.body.title.trim(),
    description: req.body.description.trim(),
    h1: req.body.h1.trim(),
    url: req.body.url.trim(),
    lang: req.body.lang,
    name: req.body.name.trim(),
  };

  const renameAndMove = (name, i = '') => {
    let gal = name === 'galery' ? 'galery/' : '';
    let file = name === 'galery' ? req.files[name][i] : req.files[name];
    name = name.replace('Image', '');
    let filename = file.name;
    let fileExt = filename.slice(filename.lastIndexOf('.'));
    filename = `${name}-${city.url}${i}${fileExt}`;
    let path = `/image/${city.lang}/${city.url}/${gal}`;
    let filePath = path + filename;
    fs.mkdirSync('./static' + path, {recursive: true}, err => {
      throw err;
    });
    file.mv('./static' + filePath, err => {
      if (err) throw err;
    });
    return filePath;
  }

  let galery = [];
  if (req.files.galery) {
    for (let i = 0; i < req.files.galery.length; i++) {
      galery.push(renameAndMove('galery', `${i}`));
    };
  }

  city.previewImage = renameAndMove('previewImage');
  city.mainImage = renameAndMove('mainImage');
  city.galery = JSON.stringify(galery);

  let sql = 'INSERT INTO cities SET ?';
  let query = db.query(sql, city, (err, result) => {
    if (err) throw err;
    res.send('Form submitted')
  });
});

// update city
app.post('/admin/api/updatecity/:id', (req, res) => {
  let city = {
    title: req.body.title.trim(),
    description: req.body.description.trim(),
    h1: req.body.h1.trim(),
    url: req.body.url.trim(),
    lang: req.body.lang,
    name: req.body.name.trim(),
  };

  const renameAndMove = (name, i = '') => {
    let gal = name === 'galery' ? 'galery/' : '';
    let file = name === 'galery' ? req.files[name][i] : req.files[name];
    name = name.replace('Image', '');
    let filename = file.name;
    let fileExt = filename.slice(filename.lastIndexOf('.'));
    filename = `${name}-${city.url}${i}${fileExt}`;
    let path = `/image/${city.lang}/${city.url}/${gal}`;
    let filePath = path + filename;
    fs.mkdirSync('./static' + path, {recursive: true}, err => {
      throw err;
    });
    file.mv('./static' + filePath, err => {
      if (err) throw err;
    });
    return filePath;
  }

  let galery = [];

  if (req.files.galery) {
    for (let i = 0; i < req.files.galery.length; i++) {
      galery.push(renameAndMove('galery', `${i}`));
    };
  }

  city.previewImage = renameAndMove('previewImage');
  city.mainImage = renameAndMove('mainImage');
  city.galery = JSON.stringify(galery);

  let sql = `UPDATE cities SET ? WHERE id = '${req.params.id}'`;
  let query = db.query(sql, city, (err, result) => {
    if (err) throw err;
    res.send('City updated')
  });
});

// delete city
app.post('/admin/api/deletecity/:id', (req, res) => {
  let sql = `DELETE FROM cities WHERE id = '${req.params.id}'`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('City deleted')
  });
});

// add excursion
app.post('/admin/api/addexcursion', (req, res) => {
  let exc = {
    city: req.body.city,
    city_id: req.body.city_id,
    title: req.body.title.trim(),
    description: req.body.description.trim(),
    h1: req.body.h1.trim(),
    url: req.body.url.trim(),
    lang: req.body.lang,
    name: req.body.name.trim(),
    detailText: req.body.detailText,
    included: JSON.stringify(req.body.included.split('\n')),
    excluded: JSON.stringify(req.body.excluded.split('\n')),
    groupSize: req.body.groupSize.trim(),
    price: req.body.price.trim(),
    time: req.body.time.trim(),
    type: JSON.stringify(req.body.type.trim().split(' ')),
  };

  const renameAndMove = (name, i = '') => {
    let gal = name === 'galery' ? 'galery/' : '';
    let file = name === 'galery' ? req.files[name][i] : req.files[name];
    name = name.replace('Image', '');
    let filename = file.name;
    let fileExt = filename.slice(filename.lastIndexOf('.'));
    filename = `${name}-${exc.url}${i}${fileExt}`;
    let path = `/image/${exc.lang}/${exc.city}/${exc.url}/${gal}`;
    let filePath = path + filename;
    fs.mkdirSync('./static' + path, {recursive: true}, err => {
      throw err;
    });
    file.mv('./static' + filePath, err => {
      if (err) throw err;
    });
    return filePath;
  }

  let galery = [];

  if (req.files.galery) {
    for (let i = 0; i < req.files.galery.length; i++) {
      galery.push(renameAndMove('galery', `${i}`));
    };
  }

  exc.previewImage = renameAndMove('previewImage');
  exc.mainImage = renameAndMove('mainImage');
  exc.galery = JSON.stringify(galery);

  let sql = 'INSERT INTO excursion SET ?';
  let query = db.query(sql, exc, (err, result) => {
    if (err) throw err;
    res.send('Form submitted');
  });
});

// update excursion
app.post('/admin/api/updateexcursion/:id', (req, res) => {
  let exc = {
    city: req.body.city,
    city_id: req.body.city_id,
    title: req.body.title.trim(),
    description: req.body.description.trim(),
    h1: req.body.h1.trim(),
    url: req.body.url.trim(),
    lang: req.body.lang,
    name: req.body.name.trim(),
    detailText: req.body.detailText,
    included: JSON.stringify(req.body.included.split('\n')),
    excluded: JSON.stringify(req.body.excluded.split('\n')),
    groupSize: req.body.groupSize.trim(),
    price: req.body.price.trim(),
    time: req.body.time.trim(),
    type: JSON.stringify(req.body.type.trim().split(' ')),
  };

  const renameAndMove = (name, i = '') => {
    let gal = name === 'galery' ? 'galery/' : '';
    let file = name === 'galery' ? req.files[name][i] : req.files[name];
    name = name.replace('Image', '');
    let filename = file.name;
    let fileExt = filename.slice(filename.lastIndexOf('.'));
    filename = `${name}-${exc.url}${i}${fileExt}`;
    let path = `/image/${exc.lang}/${exc.city}/${exc.url}/${gal}`;
    let filePath = path + filename;
    fs.mkdirSync('./static' + path, {recursive: true}, err => {
      throw err;
    });
    file.mv('./static' + filePath, err => {
      if (err) throw err;
    });
    return filePath;
  }

  let galery = [];

  if (req.files.galery) {
    for (let i = 0; i < req.files.galery.length; i++) {
      galery.push(renameAndMove('galery', `${i}`));
    };
  }

  exc.previewImage = renameAndMove('previewImage');
  exc.mainImage = renameAndMove('mainImage');
  exc.galery = JSON.stringify(galery);

  let sql = `UPDATE excursion SET ? WHERE id = '${req.params.id}'`;
  let query = db.query(sql, exc, (err, result) => {
    if (err) throw err;
    res.send('Excursion updated');
  });
});

// delete excursion
app.post('/admin/api/deleteexcursion/:id', (req, res) => {
  let sql = `DELETE FROM excursion WHERE id = '${req.params.id}'`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Excursion deleted');
  });
});

// get cities
app.get('/admin/api/getcities/:id', (req, res) => {
  let sql = `SELECT * FROM cities WHERE lang = '${req.params.id}'`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    result.forEach(city => {
      city.galery ? city.galery = JSON.parse(city.galery) : false
    })
    res.send(result)
  });
});

// get excursion
app.get('/admin/api/getexcursion/:lang/:id', (req, res) => {
  let sql = `SELECT * FROM excursion WHERE city = '${req.params.id}' AND lang = '${req.params.lang}'`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    result.forEach(exc => {
      exc.galery ? exc.galery = JSON.parse(exc.galery) : exc.galery = '';
      exc.type ? exc.type = JSON.parse(exc.type) : exc.type = '';
      exc.included ? exc.included = JSON.parse(exc.included) : exc.included = '';
      exc.excluded ? exc.excluded = JSON.parse(exc.excluded) : exc.excluded = '';
    })
    res.send(result)
  });
});

// send form
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
