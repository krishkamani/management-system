const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

route.get("/",services.homeRoutes);

route.get("/add-user",services.addUserRoutes);

route.get("/update-user",services.updateUserRoutes);

//api route
route.post('/add-user',controller.create_user);
route.get('/api/users',controller.find_user);
route.put('/api/users/:id',controller.update_user);
route.delete('/api/users/:id',controller.delete_user);

module.exports = route;