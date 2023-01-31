import express from "express";
import TornController from "../Controllers/TornController";
import TreballadorController from "../Controllers/TreballadorController";

const router = express.Router();

router.get('/getAllTorns',TreballadorController.validateToken,TornController.getAllTorns);
router.post('/insertTorn',TreballadorController.validateToken,TornController.insertTorn);
router.post('/updateEstat',TreballadorController.validateToken,TornController.updateEstat);


module.exports = router;