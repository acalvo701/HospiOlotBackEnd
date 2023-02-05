import express from "express";
import GuardiaAdminTreballadorController from "../../Controllers/Admin/GuardiaAdminTreballadorController";
import TokenController from "../../Controllers/GeneralUse/TokenController";

const router = express.Router();

router.get('/getNomsTreballadorsNotInGuardia',TokenController.validateToken,GuardiaAdminTreballadorController.getNomsTreballadorsNotInGuardia);

router.post('/updateEstat',TokenController.validateToken,GuardiaAdminTreballadorController.updateEstat);

module.exports = router;