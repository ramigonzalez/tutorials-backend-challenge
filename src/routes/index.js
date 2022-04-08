
module.exports = app => {
    require('./auth.routes')(app);
    require('./tutorials.routes')(app);
}