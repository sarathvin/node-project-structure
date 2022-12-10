const Controller = require("../Controllers");
// const Authorization = require("./../Policies");
const express = require("express");
const app = express.Router();



//User API

app.post('/', Controller.user.addUser);

app.get('/', Controller.user.listUser);

// app.get('/users/:id', Authorization.isAdmin, Controller.user.getUser);

// app.put('/users/:id', Authorization.isAdmin, Controller.user.updateUser);

// app.delete('/users/:id', Authorization.isAdmin, Controller.user.deleteUser);

module.exports = app;