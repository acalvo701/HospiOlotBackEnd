import express from "express";
import GuardiaAdminController from "../../Controllers/Admin/GuardiaAdminController";
import TokenController from "../../Controllers/GeneralUse/TokenController";

const router = express.Router();

router.get('/getGuardiesByDayAdmin',TokenController.validateTokenAdmin,GuardiaAdminController.getGuardiesByDayAdmin);

router.post('/insertGuardia',TokenController.validateTokenAdmin,GuardiaAdminController.insertGuardia);
router.post('/updateGuardia',TokenController.validateTokenAdmin,GuardiaAdminController.updateGuardia);
router.post('/updateEstatGuardiaAdmin',TokenController.validateTokenAdmin,GuardiaAdminController.updateEstatGuardiaAdmin);

module.exports = router;