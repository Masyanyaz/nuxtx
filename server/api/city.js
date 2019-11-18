const {renameAndMove} = require('../functions');
const db = require('../config/database');

function getCityFromReq(req) {
  const city = {
    title: req.body.title.trim(),
    description: req.body.description.trim(),
    h1: req.body.h1.trim(),
    url: req.body.url.trim(),
    lang: req.body.lang,
    name: req.body.name.trim(),
    popular: req.body.popular,
    russianName: req.body.russianName.toLowerCase().trim().replace(' ', '_').replace('-', '_')
  };
  let galery = [];
  if (req.files.galery) {
    for (let i = 0; i < req.files.galery.length; i++) {
      galery.push(renameAndMove(req, 'galery', 'cities', `${i}`));
    }
  }

  city.previewImage = renameAndMove(req, 'previewImage', 'cities');
  city.mainImage = renameAndMove(req, 'mainImage', 'cities');
  city.galery = JSON.stringify(galery);

  return city
};

exports.addCity = (req, res) => {
  const city = getCityFromReq(req);
  let sql = 'INSERT INTO cities SET ?';
  db.query(sql, city, (err, result) => {
    if (err) throw err;
    res.send('Form submitted')
  });
}

exports.get = (req, res) => {
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
            AND excursion.id > 0
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
  db.query(sql, (err, result) => {
    if (err) throw err;
    result.forEach(a => {
      if (a.url !== 'saint-petersbourg') {
        a.url = `saint-petersbourg/${a.url}`
      }
    })
    res.send(result)
  });
}

exports.getAllCities = (req, res) => {
  let sql = `SELECT id, name, lang FROM cities`
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result)
  });
}
