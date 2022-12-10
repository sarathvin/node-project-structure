const db = require('./../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ResponseHandler = require('../../utilities/responseHandler')

module.exports = {
    loginEndUser: async (req, res) => {
        try {
            var data = req.body;
            var password = data.password;
            var email = data.email;
            var findEmail = await db.User.findOne({ where: { email: email } });
            if (!findEmail) {
                res.json(400, { success: false, message: "Invalid Email" });
            } else {
                var userPassword = findEmail.password;
                console.log(password, userPassword);
                const isValidPwd = await bcrypt.compare(password, userPassword);
                console.log(isValidPwd);
                // console.log(userPassword);
                if (isValidPwd) {
                    var userData = {
                        id: findEmail.id,
                        first_name: findEmail.firstName,
                        last_name: findEmail.lastName,
                        phone: findEmail.phone,
                        role: findEmail.role_id,
                        email: findEmail.email,
                        address1: findEmail.address,
                        city: findEmail.city,
                        state: findEmail.state,
                        pincode: findEmail.pincode

                    };
                    var token = jwt.sign({ id: userData.id, email: userData.email, role: userData.role }, 'secure', { expiresIn: '7d' });
                    // return ResponseHandler.sendResponse(res, 'New user is created', userData, 200, true);
                    res.send({ statusCode: 200, apiStatus: true, result: userData, token: token });
                } else {
                    res.send({ statusCode: 203, apiStatus: false, message: 'incorrect password' })
                }
            }
        } catch (err) {
            console.log(err);
            res.json({ error: err });
        }
    },
};
