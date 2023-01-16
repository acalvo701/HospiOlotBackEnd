import express= require("express");
import JsonWebTokenError = require("jsonwebtoken");
const router = express.Router();

const UserController = require("../Controllers/UserController.ts");

router.post('/createUser',UserController.createUser);
router.post('/login',UserController.login)
router.get('/auth',UserController.validateToken,UserController.authenticated)
module.exports = router;