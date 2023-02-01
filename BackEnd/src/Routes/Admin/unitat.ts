import express from "express";
import TokenController from "../../Controllers/TokenController";
import UnitatController from "../../Controllers/Admin/UnitatController";

const router = express.Router();

router.get('/getAllUnitats',TokenController.validateToken,UnitatController.getAllUnitats);
router.get('/getUnitatsByIdTreballador',TokenController.validateToken,UnitatController.getUnitatsByIdTreballador);

router.post('/insertUnitat',TokenController.validateToken,UnitatController.insertUnitat);
router.post('/updateEstat',TokenController.validateToken,UnitatController.updateEstat);


module.exports = router;