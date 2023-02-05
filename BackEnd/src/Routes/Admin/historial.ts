import express from "express";
import HistorialController from "../../Controllers/Admin/HistorialController";
import TokenController from "../../Controllers/GeneralUse/TokenController";

const router = express.Router();

router.post('/addHistorial',TokenController.validateTokenAdmin,HistorialController.addHistorial);


module.exports = router;