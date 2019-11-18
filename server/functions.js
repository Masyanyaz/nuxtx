const fs = require('fs');

exports.renameAndMove = (req, name, folder, i = '') => {
  switch (folder) {
    case 'cities':
    case 'category':
      folder = `${folder}/${req.body.lang}`;
      break;
    case 'excursion':
      folder = `${folder}/${req.body.city_id}`;
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