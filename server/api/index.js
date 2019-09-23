const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

const db = require('../config/database');

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
// // create table
// app.get('/createtable', (req, res) => {
//   let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body varchar(255), PRIMARY KEY(id))';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.sendStatus(200)
//   })
// });
//
// // post 1
// app.get('/addpost1', (req, res) => {
//   let post = {title: 'post 1', body: 'this body post 1'};
//   let sql = 'INSERT INTO posts SET ?';
//   let query = db.query(sql, post, (err, result) => {
//     if (err) throw err;
//     res.sendStatus(200)
//   });
// });
//
// app.get('/admin/addpost2', (req, res) => {
//   let post = {title: 'post 2', body: 'this body post 2'};
//   let sql = 'INSERT INTO posts SET ?';
//   let query = db.query(sql, post, (err, result) => {
//     if (err) throw err;
//     res.sendStatus(200)
//   });
// });
//
// get posts
app.get('/en/getcities', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql,(err, result) => {
    if (err) throw err;
    res.send(result)
  });
});

app.get('/en/getcities/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql,(err, result) => {
    if (err) throw err;
    res.send(result)
  });
});

// import api from './api'
app.listen(3331, () => {
  console.log('started')
})
