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

router.post('/login',function(req,res){
    console.log('Login was hit');
    username = req.body.username;
    password = req.body.password;
    sql_query = "SELECT fname FROM user_details where email = '"+username+"' and password = '"+password+"';";
    connection.query(sql_query,function(err,result,fields){
        if(err)
            console.log(err);
        
        if(result.length === 0)
            res.send({name:"ERROR"});
        else {
            op_name = result[0].fname;
            res.send({name:result[0].fname});
        }
        
    });
});

router.post('/profile',function(req,res){
    attribute = req.body.att;
    email = req.body.emailId;
    var date = [];
    var values = [];
    sql_query = "SELECT date_inserted, val from "+attribute+" where email='"+email+"' ORDER BY date_inserted DESC";
    connection.query(sql_query,function(err,result,fields){
        if(result.length == 0)
            res.send({value : 'NONE'});
        else {
            for(var i=0;i<result.length;i++) {
                var cur_date = result[i].date_inserted
                var split = String(cur_date).split(' ');
                var final_date = '';
                for(var j=0;j<4;j++) {
                    final_date += split[j] +' ';
                }
                final_date.trim()
                date.push(final_date);
                values.push(result[i].val);
            }
            res.send({value : values, date : date});
        }
    });
});


router.post('/delete',function(req,res){
    console.log('Delete was touched!');
    console.log(req.body);
    email = req.body.emailId;
    date = req.body.d;
    attribute = req.body.att;
    console.log('Delete was touched!');
    sql_query = "DELETE from " + attribute + " where email='" + email+ "' and date_inserted='"+date+"';";
    console.log(sql_query);
    connection.query(sql_query,function(err,result,fields){
        if(err)
            throw err;

            res.send({name:'DONE'});
    });   

});


router.post('/add',function(req,res){
    email = req.body.e;
    attribute = req.body.a;
    date = req.body.d;
    value = req.body.v;
    sql_query = "INSERT INTO " + attribute + " values('"+email+"', '" + date + "',"+ value +");";
    console.log(sql_query);
    connection.query(sql_query,function(err,result,fields){
        if(err) {
            if(err.code == 'ER_DUP_ENTRY') {
                res.send({name:"DUPLICATE"});
            }else {
                throw err;
            }
        }else {
            res.send({name:'Worked'});
        }
    });
})





module.exports = router;