import express from "express";
import TokenController from "../../Controllers/TokenController";
import JsonWebTokenError = require("jsonwebtoken");
import TreballadorController from "../../Controllers/TreballadorController";
const router = express.Router();

router.get('/getTreballador',TokenController.validateToken,TreballadorController.getTreballador);
router.get('/getAllTreballadors',TokenController.validateToken,TreballadorController.getAllTreballadors);

router.post('/insertTreballador',TokenController.validateToken,TreballadorController.insertTreballador);
router.post('/updateTreballador',TokenController.validateToken,TreballadorController.updateTreballador);

module.exports = router;