import express from "express";
import TokenController from "../../Controllers/GeneralUse/TokenController";
import JsonWebTokenError = require("jsonwebtoken");
import TreballadorController from "../../Controllers/Admin/TreballadorController";
const router = express.Router();

router.get('/getTreballador',TokenController.validateTokenAdmin,TreballadorController.getTreballador);
router.get('/getAllTreballadors',TokenController.validateTokenAdmin,TreballadorController.getAllTreballadors);

router.post('/insertTreballador',TokenController.validateTokenAdmin,TreballadorController.insertTreballador);
router.post('/updateTreballador',TokenController.validateTokenAdmin,TreballadorController.updateTreballador);

module.exports = router;