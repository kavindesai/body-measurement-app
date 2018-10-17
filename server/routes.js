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
    sql_query1 = "INSERT INTO username VALUES('"+req.body.emailID+"','"+req.body.firstName+"');";
    console.log(sql_query1);
    connection.query(sql_query1,function(err,result,fields){

        if(err){
            console.log(err);
            if(err.code == 'ER_DUP_ENTRY') {
                res.send({name:"DUPLICATE"});
            }else {
                throw err;
            }
        }else {
            sql_query2 = "INSERT INTO user_details VALUES('"+req.body.firstName+"','"+req.body.lastName+"','"+req.body.emailID+"','"+req.body.password+"','"+req.body.address+"','"+req.body.address2+"');";
            console.log(sql_query2);
            connection.query(sql_query2,function(err,result,fields){
                if(err)
                    throw err;
            });
            res.send({name:req.body.firstName});
        }
        
    });

});

module.exports = router;