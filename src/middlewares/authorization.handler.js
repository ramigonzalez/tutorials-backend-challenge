module.exports = (req, res, next) => {
    const userRole = res.userInfo.role;
    if (userRole !== 'ADMIN') {
        res.status(403);
        next({ message:'User has insufficient permission to proceed'});
    }
    next();
}
