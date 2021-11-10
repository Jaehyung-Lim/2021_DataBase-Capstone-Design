import express from "express";
import sql from "../database/sql";

const router = express.Router();
router.get('/', async function(req, res, next) {

  const users = await sql.getUsers()
  console.log(users);
  res.render('users', {
      title: '사용자 목록',
      users
    });
});
module.exports = router;


// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'IloveYouYewon'}); //여기에 보이는 이 title이 index.hbs파일에 있는 그 웹 페이지에 보여질 title을 의미
// });

// module.exports = router;

//routes: 서버 url에 대하여 제어하는 역할 -> 슬래쉬 뒤에 써있는 것들을 나타내는 것

