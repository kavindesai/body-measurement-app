const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(require('./routes')); 

app.listen(PORT, function(){
    console.log("Server started on localhost: "+PORT);
}); 