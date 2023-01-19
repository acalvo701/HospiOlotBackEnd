import express from "express";
import GuardiaTreballadorController from "../Controllers/GuardiaTreballadorController";

const router = express.Router();


router.get('/countTreballadorsOfGuardia',GuardiaTreballadorController.countTreballadorsOfGuardia);
router.get('/getHistoryTreballador',GuardiaTreballadorController.getHistoryTreballador);
router.get('/getGuardiesFromTreballador',GuardiaTreballadorController.getGuardiesFromTreballador);
router.get('/getTreballadorsFromGuardia',GuardiaTreballadorController.getTreballadorsFromGuardia);

router.post('/bookGuardia',GuardiaTreballadorController.bookGuardia);
router.post('/updateEstat',GuardiaTreballadorController.updateEstat);
// router.post('/updateGuardia',GuardiaTreballadorController.updateGuardia);

module.exports = router;