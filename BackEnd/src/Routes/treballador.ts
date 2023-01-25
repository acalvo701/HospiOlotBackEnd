import express from "express";
import TreballadorController from "../Controllers/TreballadorController";
import JsonWebTokenError = require("jsonwebtoken");
const router = express.Router();

router.get('/getTreballador',TreballadorController.getTreballador);
router.get('/getAllTreballadors',TreballadorController.getAllTreballadors);

router.post('/insertTreballador',TreballadorController.insertTreballador);
router.post('/updateTreballador',TreballadorController.updateTreballador);


// router.post('/createUser',TreballadorController.createUser);
router.get('/login',TreballadorController.login)
router.get('/auth',TreballadorController.validateToken,TreballadorController.authenticated)

module.exports = router;