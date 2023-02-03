import express from "express";
import GuardiaAdminController from "../../Controllers/Admin/GuardiaAdminController";
import TokenController from "../../Controllers/GeneralUse/TokenController";

const router = express.Router();

router.get('/getGuardiesByDayAdmin',TokenController.validateToken,GuardiaAdminController.getGuardiesByDayAdmin);
router.get('/getTreballadorsFromGuardiaAdmin',TokenController.validateToken,GuardiaAdminController.getTreballadorsFromGuardiaAdmin);

router.post('/insertGuardia',TokenController.validateToken,GuardiaAdminController.insertGuardia);
router.post('/updateGuardia',TokenController.validateToken,GuardiaAdminController.updateGuardia);
router.post('/updateEstatGuardiaAdmin',TokenController.validateToken,GuardiaAdminController.updateEstatGuardiaAdmin);

module.exports = router;