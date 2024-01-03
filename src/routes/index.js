const express = require('express');
const { login, signup } = require('../controllers/auth.controler');
const authenticateToken = require('../middlewares/access.middleware');

const Router = express.Router
const route = Router();

// auth
route.post('/auth/signup', signup)
route.post('/auth/login', login)


module.exports = route