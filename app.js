require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const logger = require('morgan');

const keys = require('./config/keys');
const InitiateMongoServer = require('./config/mongoDB.js');


// Database connection
InitiateMongoServer(); // MongoDB database connection 

const app = express();

// Configure middleware
app.use(express.static('./public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    req.setTimeout(0);
    next();
});


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Home'
    })
});
app.use('/', require('./routes/Shop'))


app.listen(keys.PORT, () => {
	console.log(`Server is running on PORT: ${keys.PORT}`)
});
