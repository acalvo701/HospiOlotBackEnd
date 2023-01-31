import express from "express";
import HistorialController from "../Controllers/HistorialController";
import TreballadorController from "../Controllers/TreballadorController";

const router = express.Router();

router.post('/addHistorial',TreballadorController.validateToken,HistorialController.addHistorial);


module.exports = router;