var express = require('express');
var router = express.Router();
const mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password :'kavin',
    database : 'body_measurement'
});

connection.connect(function(err){
    if(!err) {
        console.log('Database connected');
    }else {
        console.log('Error connecting to database');
    }
});

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.get('/',function(req,res){
    console.log('Got a request yay!');
    res.send('Hello from server');
});

router.post('/register', function(req,res) {
    console.log(req.body);
    res.status(200).send({"message" : "Yup got your data"});
});

module.exports = router;