import express from "express";
import GuardiaTreballadorController from "../../Controllers/GeneralUse/GuardiaTreballadorController";
import TokenController from "../../Controllers/GeneralUse/TokenController";

const router = express.Router();

router.get('/countTreballadorsOfGuardia',TokenController.validateToken,GuardiaTreballadorController.countTreballadorsOfGuardia);
router.get('/getHistoryTreballador',TokenController.validateToken,GuardiaTreballadorController.getHistoryTreballador);
router.get('/getGuardiesFromTreballador',TokenController.validateToken,GuardiaTreballadorController.getGuardiesFromTreballador);
router.get('/getTreballadorsFromGuardia',TokenController.validateToken,GuardiaTreballadorController.getTreballadorsFromGuardia);
router.get('/getGuardiesByDayFromTreballador',TokenController.validateToken,GuardiaTreballadorController.getGuardiesByDayFromTreballador);

router.post('/cancelGuardia',TokenController.validateToken,GuardiaTreballadorController.cancelGuardia);
router.post('/bookGuardia',TokenController.validateToken,GuardiaTreballadorController.bookGuardia);
router.post('/updateEstat',TokenController.validateToken,GuardiaTreballadorController.updateEstat);

module.exports = router;