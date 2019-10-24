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

const renameAndMove = (req, name, folder, i = '') => {
  console.log(req)
  switch (folder) {
    case 'cities':
      folder = `${folder}/${req.body.lang}`;
      break;
    case 'excursion':
      folder = `${folder}/${req.body.city_id}`;
      break;
    case 'category':
      folder = `${folder}/${req.body.lang}`;
      break;
  }
  let file = name === 'galery' ? req.files[name][i] : req.files[name];
  name = name.replace('Image', '');
  let filename = file.name;
  let fileExt = filename.slice(filename.lastIndexOf('.'));
  filename = name === 'galery' ? `${req.body.url}-${i}${fileExt}` : `${name}-${req.body.url}${fileExt}`;
  let path = name === 'galery' ? `/image/${folder}/${req.body.url}/${name}/` : `/image/${folder}/${req.body.url}/`;
  let filePath = path + filename;
  fs.mkdirSync('./static' + path, {recursive: true}, err => {
    throw err;
  });
  file.mv('./static' + filePath, err => {
    if (err) throw err;
  });
  return filePath;
}

// add city
app.post('/admin/api/addcity', (req, res) => {
  let city = {
    title: req.body.title.trim(),
    description: req.body.description.trim(),
    h1: req.body.h1.trim(),
    url: req.body.url.trim(),
    lang: req.body.lang,
    name: req.body.name.trim(),
    popular: req.body.popular,
  };

  let galery = [];
  if (req.files.galery) {
    for (let i = 0; i < req.files.galery.length; i++) {
      galery.push(renameAndMove(req,'galery', 'cities',`${i}`));
    }
  };

  city.previewImage = renameAndMove(req,'previewImage', 'cities');
  city.mainImage = renameAndMove(req,'mainImage', 'cities');
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
    popular: req.body.popular,
  };

  let galery = [];

  if (req.files.galery) {
    for (let i = 0; i < req.files.galery.length; i++) {
      galery.push(renameAndMove(req,'galery', 'cities',`${i}`));
    }
    ;
  }

  city.previewImage = renameAndMove(req,'previewImage', 'cities');
  city.mainImage = renameAndMove(req,'mainImage', 'cities');
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
  let price = req.body.priceList.split('\n');
  let exc = {
    city_id: req.body.city_id,
    title: req.body.title.trim(),
    description: req.body.description.trim(),
    h1: req.body.h1.trim(),
    url: req.body.url.trim(),
    name: req.body.name.trim(),
    detailText: req.body.detailText,
    included: JSON.stringify(req.body.included.split('\n')),
    excluded: JSON.stringify(req.body.excluded.split('\n')),
    groupSize: req.body.groupSize.trim(),
    pricePerPerson: req.body.pricePerPerson,
    price: price[req.body.pricePerPerson - 1],
    priceList: JSON.stringify(price),
    time: req.body.time.trim(),
    popular: req.body.popular,
  };

  let galery = [];

  if (req.files.galery) {
    for (let i = 0; i < req.files.galery.length; i++) {
      galery.push(renameAndMove(req,'galery', 'excursion',`${i}`));
    }
  };

  exc.previewImage = renameAndMove(req,'previewImage', 'excursion');
  exc.mainImage = renameAndMove(req,'mainImage', 'excursion');
  exc.galery = JSON.stringify(galery);

  let sql = 'INSERT INTO excursion SET ?';
  let sql2 = 'INSERT INTO exc_category (exc_id, data_id) VALUES ?'
  let query = db.query(sql, exc, (err, result) => {
    if (err) throw err;
    let category = [];
    if (req.body.type) {
      if (typeof req.body.type !== 'string') {
        req.body.type.forEach(a => {
          let val = [result.insertId];
          val.push(a);
          category.push(val)
        })
      } else {
        let val = [result.insertId, req.body.type];
        category.push(val)
      }
    }
    db.query(sql2, [category], (err) => {
      if (err) throw err;
    });
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
    type: JSON.stringify(req.body.type.trim().split(',')),
  };

  let galery = [];

  if (req.files.galery) {
    for (let i = 0; i < req.files.galery.length; i++) {
      galery.push(renameAndMove(req,'galery', 'excursion',`${i}`));
    }
  };

  exc.previewImage = renameAndMove(req,'previewImage', 'excursion');
  exc.mainImage = renameAndMove(req,'mainImage', 'excursion');
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
app.get('/admin/api/getcities/:lang', (req, res) => {
  // let sql = `SELECT cities.name, cities.url, cities.previewImage, COUNT(excursion.id) AS excCount
  //           FROM cities
  //           LEFT JOIN excursion
  //           ON cities.id = excursion.city_id
  //           WHERE cities.lang = '${req.params.lang}'
  //           GROUP BY cities.id
  //           ORDER BY ${req.query.order ? `${req.query.order}` : 'cities.id'} ${req.query.sort ? `${req.query.sort}` : 'ASC'}`
  let sql = `SELECT cities.id, cities.name, cities.url, cities.h1, cities.title, cities.description, cities.previewImage, COUNT(excursion.id) AS excCount
            FROM cities
            LEFT JOIN excursion
            ON cities.id = excursion.city_id
            WHERE cities.lang = '${req.params.lang}'
            GROUP BY cities.id
            
            UNION
            
            SELECT exc_category_data.id, exc_category_data.name, exc_category_data.url, exc_category_data.h1, 
            exc_category_data.title, exc_category_data.description, exc_category_data.previewImage, COUNT(excursion.id) AS exc_count
            FROM exc_category_data
            INNER JOIN excursion
            INNER JOIN cities
            INNER JOIN exc_category
            ON excursion.id = exc_category.exc_id
            AND cities.id = excursion.city_id
            AND exc_category.data_id = exc_category_data.id
            WHERE cities.lang = '${req.params.lang}'
            AND exc_category_data.popular = 'true'
            GROUP BY exc_category_data.url`
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    result.forEach(a => {
      if (a.url !== 'saint-petersbourg') {
        a.url = `saint-petersbourg/${a.url}`
      }
    })
    res.send(result)
  });
});

// get city
app.get('/admin/api/getcity/:lang', (req, res) => {
  let sql = `SELECT cities.id, cities.url, cities.h1, cities.title, cities.description, cities.mainImage, cities.galery,
            MIN(excursion.price) AS price_min, MAX(excursion.price) AS price_max, 
            MIN(excursion.groupSize) AS group_min, MAX(excursion.groupSize) AS group_max,
            COUNT(excursion.id) AS exc_count
            FROM cities
            LEFT JOIN excursion
            ON cities.id = excursion.city_id
            WHERE cities.lang = '${req.params.lang}'  
            AND cities.url = '${req.query.city_url}'
            AND excursion.price >= ${req.query.price_min || 0}
            AND excursion.price <= ${req.query.price_max || 10000}
            AND excursion.groupSize >= ${req.query.group_min || 1} 
            AND timeGroup REGEXP '${req.query.time_group || '.*'}'
            GROUP BY cities.id`
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    result.forEach(city => {
      city.galery ? city.galery = JSON.parse(city.galery) : false
    });
    res.send(result)
  });
});

app.get('/admin/api/getfullcity/:lang', (req, res) => {
  let sql = `SELECT *
            FROM cities
            WHERE cities.lang = '${req.params.lang}'  
            AND cities.url = '${req.query.city_url}'`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    result.forEach(city => {
      city.galery ? city.galery = JSON.parse(city.galery) : false
    });
    res.send(result)
  });
});

app.get('/admin/api/getallurl/:lang', (req, res) => {
  let sql = `SELECT exc_category_data.url FROM exc_category_data
            INNER JOIN cities
            WHERE cities.lang = '${req.params.lang}'
            UNION
            SELECT excursion.url FROM excursion
            INNER JOIN cities
            WHERE cities.lang = '${req.params.lang}'`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result)
  });
});

// get excursions
app.get('/admin/api/getexcursions/:lang', (req, res) => {
  let sql = `SELECT excursion.id, excursion.name, cities.url AS city_url, cities.lang, excursion.url, excursion.price, 
            excursion.pricePerPerson, excursion.time, excursion.previewImage
            FROM excursion
            INNER JOIN cities
            INNER JOIN exc_category
            INNER JOIN exc_category_data
            ON cities.id = excursion.city_id
            AND exc_category.exc_id = excursion.id
            AND exc_category_data.id = exc_category.data_id
            WHERE cities.url REGEXP '${req.query.city_url || '.*'}'
            AND cities.lang = '${req.params.lang}' 
            AND exc_category_data.url REGEXP '${req.query.category_url || '.*'}'
            AND excursion.price >= ${req.query.price_min || 0}
            AND excursion.price <= ${req.query.price_max || 10000}
            AND excursion.groupSize >= ${req.query.group_min || 1} 
            AND excursion.groupSize <= ${req.query.group_max || 100}
            AND timeGroup REGEXP '${req.query.time_group || '.*'}'
            GROUP BY excursion.id
            ORDER BY ${req.query.order || 'excursion.id'} ${req.query.sort || 'ASC'}
            LIMIT ${req.query.limit || 100}`
  let query = db.query(sql, (err, result) => {
    if (err) console.log(err);
    res.send(result)
  });
});

// get excursion
app.get('/admin/api/getexcursion/:lang', (req, res) => {

  let sql = `SELECT excursion.id, excursion.url, excursion.name, excursion.h1, excursion.title, excursion.description, excursion.price, excursion.pricePerPerson, excursion.priceList,
            excursion.time, excursion.mainImage, excursion.galery, excursion.detailText, excursion.included, excursion.excluded, excursion.groupSize
            FROM excursion
            LEFT JOIN cities
            ON cities.id = excursion.city_id
            WHERE cities.url = '${req.query.city_url}'
            AND cities.lang = '${req.params.lang}' 
            AND excursion.url = '${req.query.exc_url}'`
  let query = db.query(sql, (err, result) => {
    if (err) console.log(err);
    result.forEach(exc => {
      exc.galery ? exc.galery = JSON.parse(exc.galery) : exc.galery = '';
      exc.included ? exc.included = JSON.parse(exc.included) : exc.included = '';
      exc.excluded ? exc.excluded = JSON.parse(exc.excluded) : exc.excluded = '';
      exc.priceList ? exc.priceList = JSON.parse(exc.priceList) : exc.priceList = '';
    });
    res.send(result)
  });
});

// get filter name and count
app.get('/admin/api/getfilterlist/:lang', (req, res) => {
  let sql = `SELECT exc_category_data.name, exc_category_data.url, exc_category_data.h1, 
            exc_category_data.title, exc_category_data.description, COUNT(DISTINCT excursion.id) AS exc_count
            FROM exc_category_data
            INNER JOIN excursion
            INNER JOIN cities
            INNER JOIN exc_category
            ON excursion.id = exc_category.exc_id
            AND cities.id = excursion.city_id
            AND exc_category_data.url = 'all'
            WHERE cities.url REGEXP '${req.query.city_url || '.*'}'
            AND cities.lang = '${req.params.lang}'
            AND excursion.price >= ${req.query.price_min || 0}
            AND excursion.price <= ${req.query.price_max || 10000}
            AND excursion.groupSize >= ${req.query.group_min || 1} 
            AND timeGroup REGEXP '${req.query.time_group || '.*'}'
            GROUP BY exc_category_data.url
            
            UNION
            
            SELECT exc_category_data.name, exc_category_data.url, exc_category_data.h1, 
            exc_category_data.title, exc_category_data.description, COUNT(excursion.id) AS exc_count
            FROM exc_category_data
            INNER JOIN excursion
            INNER JOIN cities
            INNER JOIN exc_category
            ON excursion.id = exc_category.exc_id
            AND cities.id = excursion.city_id
            AND exc_category.data_id = exc_category_data.id
            WHERE cities.url REGEXP '${req.query.city_url || '.*'}'
            AND cities.lang = '${req.params.lang}'
            AND excursion.price >= ${req.query.price_min || 0}
            AND excursion.price <= ${req.query.price_max || 10000}
            AND excursion.groupSize >= ${req.query.group_min || 1} 
            AND timeGroup REGEXP '${req.query.time_group || '.*'}'
            GROUP BY exc_category_data.url`
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result)
  });
});

// category list
app.get('/admin/api/getcategorylist/:lang', (req, res) => {
  let sql = `SELECT exc_category_data.id ,exc_category_data.name, cities.url AS city_url, exc_category_data.url, exc_category_data.previewImage, COUNT(excursion.id) AS exc_count, exc_category_data.popular
            FROM exc_category_data
            INNER JOIN excursion
            INNER JOIN cities
            INNER JOIN exc_category
            ON excursion.id = exc_category.exc_id
            AND cities.id = excursion.city_id
            AND exc_category.data_id = exc_category_data.id
            WHERE cities.url = '${req.query.city_url}'
            AND cities.lang = '${req.params.lang}'
            GROUP BY exc_category_data.url`
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result)
  });
});

app.get('/admin/api/getexcursion', (req, res) => {
  let sql = `SELECT id, url FROM excursion`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
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
