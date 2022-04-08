module.exports = (err, req, res, next) => {

    const message = isValidationError(err) ? err.error.message : err.message;
    if (err) {
        res.status(400);
        res.json({
            statusCode: 400,
            message,
            exception: err.name,
            stacktrace: err.stack
        });
    } else if(res.statusCode >= 400) {
        res.json({
            statusCode: res.statusCode,
            message: err.message,
            error: { message }
        });
    } else {
        console.error('Not handled exception: ', err);
        next(err)
    }
}

const isValidationError = (err) => {
    return err.error && err.error.message;
}