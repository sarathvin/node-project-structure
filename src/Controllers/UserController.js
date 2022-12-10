const db = require('./../../models');
const bcrypt = require('bcrypt');
const ResponseHandler = require('../../utilities/responseHandler')

module.exports = {
    //add user api
    addUser: async (req, res) => {
        try {
            var data = req.body;
            console.log('addUser data - ', data);
            var query = {}
            query.email = data.email;
            query.password = data.password ? data.password : 'password';
            query.firstName = data.first_name;
            query.lastName = data.last_name;
            query.phone = data.phone && Number(data.phone) ? Number(data.phone) : '';
            query.role_id = data.role_id;
            query.address = data.address;
            query.city = data.city;
            query.state = data.state;
            query.pincode = data.pincode;

            var UserDetials = await db.User.count({ where: { email: query.email } });
            console.log('addUser UserDetials - ', UserDetials);

            if (UserDetials == 0) {
                console.log('addUser UserDetials - ', query.password);
                const hashPwd = await bcrypt.hash(query.password, 10);
                console.log('addUser hashPwd - ', hashPwd);
                query.password = hashPwd
                var addUserDetials = await db.User.create(query);
                console.log('addUser addUserDetials - ', addUserDetials);
                return ResponseHandler.sendResponse(res, 'New user is created', {}, 200, true);
            } else {
                return ResponseHandler.sendResponse(res, 'the user is already exists', {}, 200, true);
            }
        } catch (err) {
            console.log('err - ', err);
            return ResponseHandler.sendResponse(res, 'Error on getting the user data ', {}, 500, false);
        }

    },

    listUser: async (req, res) => {
        try {
            var totalUser = await db.user.findAll({ attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'role_id', 'address1', 'address2', 'state', 'city', 'pincode', 'image', 'country', 'createdAt'] });
            return ResponseHandler.sendResponse(res, 'Data found', totalUser, 200, true);
        } catch (err) {
            res.status(500).send({ error: err });
        }
    },
};