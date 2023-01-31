import express from "express";
import GuardiaController from "../Controllers/GuardiaController";
import TreballadorController from "../Controllers/TreballadorController";
import Token from "../Model/Entities/Token";

const router = express.Router();

router.get('/getGuardia',TreballadorController.validateToken,GuardiaController.getGuardia);
router.get('/getAllGuardies',TreballadorController.validateToken,TreballadorController.validateToken,GuardiaController.getAllGuardies);
router.get('/getGuardiesByDay',TreballadorController.validateToken,GuardiaController.getGuardiesByDay);
router.get('/getGuardiesByDayAdmin',TreballadorController.validateToken,GuardiaController.getGuardiesByDayAdmin);
router.get('/getMonthGuardiesByDate',TreballadorController.validateToken,GuardiaController.getMonthGuardiesByDate);
router.get('/getMonthGuardiesByDateFromTreballador',TreballadorController.validateToken,GuardiaController.getMonthGuardiesByDateFromTreballador);
router.get('/getAllGuardiesFromTreballador',TreballadorController.validateToken,GuardiaController.getAllGuardiesFromTreballador);


router.post('/insertGuardia',TreballadorController.validateToken,GuardiaController.insertGuardia);
router.post('/updateGuardia',TreballadorController.validateToken,GuardiaController.updateGuardia);
router.post('/updateEstatGuardiaAdmin',TreballadorController.validateToken,GuardiaController.updateEstatGuardiaAdmin);

module.exports = router;