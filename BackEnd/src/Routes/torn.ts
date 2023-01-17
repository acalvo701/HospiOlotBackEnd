import express from "express";
import TornController from "../Controllers/TornController";

const router = express.Router();

router.get('/getAllTorns',TornController.getAllTorns);
router.post('/insertTorn',TornController.insertTorn);
router.post('/updateEstat',TornController.updateEstat);



module.exports = router;