import express from "express";
import TornController from "../../Controllers/Admin/TornController";
import TokenController from "../../Controllers/GeneralUse/TokenController";

const router = express.Router();

router.get('/getAllTorns',TokenController.validateToken,TornController.getAllTorns);
router.post('/insertTorn',TokenController.validateToken,TornController.insertTorn);
router.post('/updateEstat',TokenController.validateToken,TornController.updateEstat);


module.exports = router;