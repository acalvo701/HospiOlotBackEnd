import express from "express";
import GuardiaModelController from "../Controllers/GuardiaModelController";

const router = express.Router();

router.get('/getEsquema',GuardiaModelController.getEsquema);

router.post('/insertEsquemaRow',GuardiaModelController.insertEsquemaRow);
router.post('/updateEsquemaRow',GuardiaModelController.updateEsquemaRow);
router.post('/deleteEsquemaRow',GuardiaModelController.deleteEsquemaRow);

router.post('/generarGuardiesEsquema',GuardiaModelController.generarGuardiesEsquema)
module.exports = router;