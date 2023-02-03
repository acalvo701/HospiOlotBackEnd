import express from "express";
import GuardiaAdminController from "../../Controllers/Admin/GuardiaAdminController";
import TokenController from "../../Controllers/GeneralUse/TokenController";

const router = express.Router();

router.get('/getGuardiesByDayAdmin',TokenController.validateToken,GuardiaAdminController.getGuardiesByDayAdmin);
router.get('/getTreballadorsFromGuardiaAdmin',TokenController.validateToken,GuardiaAdminController.getTreballadorsFromGuardiaAdmin);

router.post('/insertGuardia',TokenController.validateTokenAdmin,GuardiaAdminController.insertGuardia);
router.post('/updateGuardia',TokenController.validateTokenAdmin,GuardiaAdminController.updateGuardia);
router.post('/updateEstatGuardiaAdmin',TokenController.validateTokenAdmin,GuardiaAdminController.updateEstatGuardiaAdmin);

module.exports = router;