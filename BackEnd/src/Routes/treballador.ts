import express from "express";
import TreballadorController from "../Controllers/TreballadorController";
import JsonWebTokenError = require("jsonwebtoken");
const router = express.Router();

router.get('/getTreballador',TreballadorController.validateToken,TreballadorController.getTreballador);
router.get('/getAllTreballadors',TreballadorController.validateToken,TreballadorController.getAllTreballadors);

router.post('/insertTreballador',TreballadorController.validateToken,TreballadorController.insertTreballador);
router.post('/updateTreballador',TreballadorController.validateToken,TreballadorController.updateTreballador);


// router.post('/createUser',TreballadorController.createUser);
router.post('/login',TreballadorController.login)
router.post('/refreshToken',TreballadorController.refreshToken);

module.exports = router;