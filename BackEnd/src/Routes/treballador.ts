import express from "express";
import TreballadorController from "../Controllers/TreballadorController";
import JsonWebTokenError = require("jsonwebtoken");
const router = express.Router();

router.get('/getTreballador',TreballadorController.getTreballador);
router.get('/getAllTreballadors',TreballadorController.getAllTreballadors);

router.post('/insertTreballador',TreballadorController.insertTreballador);
router.post('/updateTreballador',TreballadorController.updateTreballador);


// router.post('/createUser',TreballadorController.createUser);
router.post('/login',TreballadorController.login)
router.get('/auth',TreballadorController.validateToken,TreballadorController.authenticated)
router.post('/refreshToken',TreballadorController.refreshToken);

module.exports = router;