require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? "./config/test.env" : "./config/dev.env" }
);

const port = process.env.NODE_PORT;

const express = require('express');
const app = express();

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'));

require('./controllers/routes')(app);

app.listen(port, () => console.info(`Tutorials Server is listening on port ${port}`));

