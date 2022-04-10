module.exports = (req, res, next) => {
    if (typeof req.route === 'undefined') {
        res.status(404).json({
            statusCode: 404,
            message: 'URI not found',
        });
    } else next();
};
