import express from "express";
import TreballadorController from "../Controllers/TreballadorController";
import UnitatController from "../Controllers/UnitatController";

const router = express.Router();

router.get('/getAllUnitats',TreballadorController.validateToken,UnitatController.getAllUnitats);
router.get('/getUnitatsByIdTreballador',TreballadorController.validateToken,UnitatController.getUnitatsByIdTreballador);

router.post('/insertUnitat',TreballadorController.validateToken,UnitatController.insertUnitat);
router.post('/updateEstat',TreballadorController.validateToken,UnitatController.updateEstat);


module.exports = router;