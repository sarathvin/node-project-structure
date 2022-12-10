const express = require('express');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const fs = require('fs');
// This will be our application entry. We'll setup our server here.
const http = require('http');
const https = require('https');
const cors = require('cors');
// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(fileUpload());
// Setup a default catch-all route that sends back a welcome message in JSON format.
//Models
var models = require('./models');
const { Console } = require('console');
app.use(cors());
app.use(express.static('assets'));
//sync databse
models.sequelize.sync().then(function () {
    console.log('DB connneted');
}).catch(function (err) {
    console.log('DB not connneted');
    console.log(err);
});

// Routes
const routes = require('./src/Routes/routes');
app.use('/v1', routes)
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

// server connection
let server = '';

if (!process.env.ENVIRONMENT || (process.env.ENVIRONMENT && process.env.ENVIRONMENT == 'local')) {
    server = http.createServer(app);
} else {
    server = https.createServer({
        key: fs.readFileSync('/var/www/html/ssl/privkey.pem'),
        cert: fs.readFileSync('/var/www/html/ssl/fullchain.pem'),
    }, app);
}

// cluster
const cluster = require('cluster');
const numCPU = require('os').cpus().length;

if (cluster.isMaster && !(!process.env.ENVIRONMENT || (process.env.ENVIRONMENT && process.env.ENVIRONMENT == 'local'))) {
    console.log(`Master ${process.pid} is running`);

    for (let index = 0; index < numCPU; index++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    server.listen(port, () => {
        console.log(`Server started on port : ${port}`);
    });
    console.log(`Worker ${process.pid} started`);
}
console.log(port);
module.exports = app;