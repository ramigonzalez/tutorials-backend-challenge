const jwt  = require('jsonwebtoken');

const { getPublicKey, signOptions } = require('../utils/jwttoken');

const verifyUserToken = (req, res, next) => {
    console.info('Validating authorization user token');
    const token = getToken(req);
    if (!token) {
        const message = 'Session token not found'; 
        console.error(message);
        res.status(401);
        next({ message })
    }
    jwt.verify(token, getPublicKey(), { algorithms: [signOptions().algorithm] }, 
        (err, decoded) => {
            if (err) {
                console.error(err.message);
                res.status(403);
                next({ message: err.message, err })
            } else {
                res.userInfo = decoded;
                //comparo con la base hasheando con mi privada
                console.info('Token verified successfully!');
                next();
            }
        }
    );
    
}

const getToken = (req) => {
    const xAuth = req.header('Authorization');
    if (xAuth && xAuth.split(' ')[0] === 'Bearer') {
        return xAuth.split(' ')[1];
    } else return null;
}

module.exports = { 
    verifyUserToken
};