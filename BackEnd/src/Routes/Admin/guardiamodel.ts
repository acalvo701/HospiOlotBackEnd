import express from "express";
import GuardiaModelController from "../../Controllers/Admin/GuardiaModelController";
import TokenController from "../../Controllers/GeneralUse/TokenController";

const router = express.Router();

router.get('/getEsquemaByIdTreballadorAndName',TokenController.validateToken,GuardiaModelController.getEsquemaByIdTreballadorAndName);

router.post('/insertEsquemaRow',TokenController.validateToken,GuardiaModelController.insertEsquemaRow);
router.post('/updateEsquemaRow',TokenController.validateToken,GuardiaModelController.updateEsquemaRow);
router.post('/deleteEsquemaRow',TokenController.validateToken,GuardiaModelController.deleteEsquemaRow);
router.post('/generarGuardiesEsquema',TokenController.validateToken,GuardiaModelController.generarGuardiesEsquema);

module.exports = router;