const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'MY_SUPER_EXTRA_MEGA_GYGA_SECRET_TOKEN');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'userId non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ message: 'Invalid request !' });
    }
};