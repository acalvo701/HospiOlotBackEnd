import express from "express";
import GuardiaModelController from "../../Controllers/Admin/GuardiaModelController";
import TokenController from "../../Controllers/GeneralUse/TokenController";

const router = express.Router();

router.get('/getEsquemaByIdTreballadorAndName',TokenController.validateTokenAdmin,GuardiaModelController.getEsquemaByIdTreballadorAndName);

router.post('/insertEsquemaRow',TokenController.validateTokenAdmin,GuardiaModelController.insertEsquemaRow);
router.post('/updateEsquemaRow',TokenController.validateTokenAdmin,GuardiaModelController.updateEsquemaRow);
router.post('/deleteEsquemaRow',TokenController.validateTokenAdmin,GuardiaModelController.deleteEsquemaRow);
router.post('/generarGuardiesEsquema',TokenController.validateTokenAdmin,GuardiaModelController.generarGuardiesEsquema);

module.exports = router;