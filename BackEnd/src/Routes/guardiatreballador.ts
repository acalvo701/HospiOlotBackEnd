import express from "express";
import GuardiaTreballadorController from "../Controllers/GuardiaTreballadorController";
import TreballadorController from "../Controllers/TreballadorController";

const router = express.Router();

router.get('/countTreballadorsOfGuardia',TreballadorController.validateToken,GuardiaTreballadorController.countTreballadorsOfGuardia);
router.get('/getHistoryTreballador',TreballadorController.validateToken,GuardiaTreballadorController.getHistoryTreballador);
router.get('/getGuardiesFromTreballador',TreballadorController.validateToken,GuardiaTreballadorController.getGuardiesFromTreballador);
router.get('/getTreballadorsFromGuardia',TreballadorController.validateToken,GuardiaTreballadorController.getTreballadorsFromGuardia);
router.get('/getGuardiesByDayFromTreballador',TreballadorController.validateToken,GuardiaTreballadorController.getGuardiesByDayFromTreballador);

router.post('/cancelGuardia',TreballadorController.validateToken,GuardiaTreballadorController.cancelGuardia);
router.post('/bookGuardia',TreballadorController.validateToken,GuardiaTreballadorController.bookGuardia);
router.post('/updateEstat',TreballadorController.validateToken,GuardiaTreballadorController.updateEstat);
router.post('/insertarGuardiaTreballadorAdmin',TreballadorController.validateToken,GuardiaTreballadorController.insertarGuardiaTreballadorAdmin);

module.exports = router;