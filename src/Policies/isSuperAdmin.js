const jwt = require('jsonwebtoken');
const accessTokenSecret = 'vathiyarsecure';
module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            token = authHeader.replace('Bearer ', '');
            // console.log(token);
            jwt.verify(token, accessTokenSecret, (err, user) => {
                if (err) {
                    return res.json(400, { success: false, message: 'No Authorization header was found' });

                } else if (user.role == 1) {
                    req.user = user;
                } else {
                    res.json(401, { err: 'You dont have access' });
                }

                next();
            });
        } else {
            res.send(400, { message: "No Authorization header was found" });
        }
    } catch (err) {
        res.json({ error: err });
    }
};
