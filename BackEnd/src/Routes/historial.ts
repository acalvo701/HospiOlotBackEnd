import express from "express";
import HistorialController from "../Controllers/HistorialController";

const router = express.Router();

router.post('/addHistorial',HistorialController.addHistorial);


module.exports = router;