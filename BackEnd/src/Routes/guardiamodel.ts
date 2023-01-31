import express from "express";
import GuardiaModelController from "../Controllers/GuardiaModelController";
import TreballadorController from "../Controllers/TreballadorController";

const router = express.Router();

router.get('/getEsquemaByIdTreballadorAndName',TreballadorController.validateToken,GuardiaModelController.getEsquemaByIdTreballadorAndName);

router.post('/insertEsquemaRow',TreballadorController.validateToken,GuardiaModelController.insertEsquemaRow);
router.post('/updateEsquemaRow',TreballadorController.validateToken,GuardiaModelController.updateEsquemaRow);
router.post('/deleteEsquemaRow',TreballadorController.validateToken,GuardiaModelController.deleteEsquemaRow);
router.post('/generarGuardiesEsquema',TreballadorController.validateToken,GuardiaModelController.generarGuardiesEsquema);

module.exports = router;