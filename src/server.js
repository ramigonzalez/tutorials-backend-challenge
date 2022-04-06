require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? "./config/test.env" : "./config/dev.env" }
);

const port = process.env.NODE_PORT;

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'));

require('./controllers/routes')(app);

app.listen(port, () => console.info(`Tutorials Server is listening on port ${port}`));

