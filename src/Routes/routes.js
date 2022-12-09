const { Router } = require('express')
const service = require('./serviceRoutes');
const router = new Router()



router.use('/services', service);


module.exports = router