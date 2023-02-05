import express from "express";
import TornController from "../../Controllers/Admin/TornController";
import TokenController from "../../Controllers/GeneralUse/TokenController";

const router = express.Router();

router.get('/getAllTorns',TokenController.validateTokenAdmin,TornController.getAllTorns);
router.post('/insertTorn',TokenController.validateTokenAdmin,TornController.insertTorn);
router.post('/updateEstat',TokenController.validateTokenAdmin,TornController.updateEstat);


module.exports = router;