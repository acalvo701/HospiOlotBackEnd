import express from "express";
import GuardiaTreballadorController from "../Controllers/GuardiaTreballadorController";

const router = express.Router();


router.get('/countTreballadorsOfGuardia',GuardiaTreballadorController.countTreballadorsOfGuardia);
router.get('/getHistoryTreballador',GuardiaTreballadorController.getHistoryTreballador);
router.get('/getGuardiesFromTreballador',GuardiaTreballadorController.getGuardiesFromTreballador);
router.get('/getTreballadorsFromGuardia',GuardiaTreballadorController.getTreballadorsFromGuardia);
router.get('/getGuardiesByDayFromTreballador',GuardiaTreballadorController.getGuardiesByDayFromTreballador);

router.post('/cancelGuardia',GuardiaTreballadorController.cancelGuardia);
router.post('/bookGuardia',GuardiaTreballadorController.bookGuardia);
router.post('/updateEstat',GuardiaTreballadorController.updateEstat);
router.post('/insertarGuardiaTreballadorAdmin',GuardiaTreballadorController.insertarGuardiaTreballadorAdmin);

module.exports = router;