const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const PORT = 3000;

const app = express();

var connection = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password :'kavin',
    database : 'body_measurement'
});

app.use(bodyParser.json());

app.use(cors());

connection.connect(function(err){
    if(!err) {
        console.log('Database connected');
    }else {
        console.log('Error connecting to database');
    }
});

app.get('/',function(req,res){
    console.log('Got a request yay!');
    res.send('Hello from server');
});

app.post('/register', function(req,res) {
    console.log(req.body);
    res.status(200).send({"message" : "Yup got your data"});
});




app.listen(PORT, function(){
    console.log("Server started on localhost: "+PORT);
}); 