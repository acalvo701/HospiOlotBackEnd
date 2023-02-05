import express from "express";
import GuardiaModelController from "../../Controllers/Admin/GuardiaModelController";
import TokenController from "../../Controllers/GeneralUse/TokenController";

const router = express.Router();

router.get('/getEsquemaByIdTreballadorAndName',TokenController.validateTokenAdmin,GuardiaModelController.getEsquemaByIdTreballadorAndName);

router.post('/insertEsquemaRow',TokenController.validateTokenAdmin,GuardiaModelController.insertEsquemaRow);
router.post('/updateEsquemaRow',TokenController.validateTokenAdmin,GuardiaModelController.updateEsquemaRow);
router.post('/estatEliminatEsquemaRow',TokenController.validateTokenAdmin,GuardiaModelController.estatEliminatEsquemaRow);
router.post('/generarGuardiesEsquema',TokenController.validateTokenAdmin,GuardiaModelController.generarGuardiesEsquema);
router.post('/generarGuardiesCSV',TokenController.validateTokenAdmin,GuardiaModelController.generarGuardiesCSV);
module.exports = router;