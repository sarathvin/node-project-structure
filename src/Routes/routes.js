const { Router } = require('express')
const router = new Router()
const user = require('./userRoutes');
const login = require('./loginRoutes');



router.use('/user', user);
router.use('/', login);


module.exports = router