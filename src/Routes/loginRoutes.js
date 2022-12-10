const Controller = require("../Controllers");
// const Authorization = require("./../Policies");
const express = require("express");
const app = express.Router();



//User API

app.post('/userlogin', Controller.auth.loginEndUser);

module.exports = app;