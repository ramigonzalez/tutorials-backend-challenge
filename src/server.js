require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? "./config/test.env" : "./config/dev.env" }
);

const Repository = require('./repositories');
const { okHandler, errorHandler, notFound } = require('./middlewares');

const port = process.env.NODE_PORT;

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'));

require('./routes')(app);

app.use(notFound);
app.use(okHandler);
app.use(errorHandler);

Repository.init()
.then(() => app.listen(port, () => console.info(`Tutorials Server is listening on port ${port}`)))
.catch((err) => {
        console.error('Could not connect with database', err.message);
        process.exit(1);
    });