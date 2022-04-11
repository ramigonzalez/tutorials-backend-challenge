const { loadConfiguration } = require('../config/environment');
loadConfiguration();

const Repository = require('./repositories');
const { okHandler, errorHandler, notFound } = require('./middlewares');
const routes = require('./routes');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { BaseError } = require('./exceptions');

const app = express();
const port = process.env.NODE_PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

process.on('unhandledRejection', (reason, promise) => {
    console.error('Error: unhandledRejection');
    throw reason;
});

process.on('uncaughtException', (error) => {
    console.error('Error: uncaughtException');
    if (!error instanceof BaseError) {
        process.exit(1);
    }
});

routes(app);
app.use(notFound);
app.use(okHandler);
app.use(errorHandler);

Repository.init()
    .then(() => app.listen(port, () => console.info(`Tutorials Server is listening on port ${port}`)))
    .catch((err) => {
        console.error('Could not connect with database', err.message);
        process.exit(1);
    });
