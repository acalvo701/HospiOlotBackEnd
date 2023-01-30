import express from "express";
import GuardiaController from "../Controllers/GuardiaController";
import TreballadorController from "../Controllers/TreballadorController";
import Token from "../Model/Entities/Token";

const router = express.Router();

router.get('/getGuardia',GuardiaController.getGuardia);
router.get('/getAllGuardies',TreballadorController.validateToken,GuardiaController.getAllGuardies);
router.get('/getGuardiesByDay',GuardiaController.getGuardiesByDay);
router.get('/getGuardiesByDayAdmin',GuardiaController.getGuardiesByDayAdmin);
router.get('/getMonthGuardiesByDate',GuardiaController.getMonthGuardiesByDate);
router.get('/getMonthGuardiesByDateFromTreballador',GuardiaController.getMonthGuardiesByDateFromTreballador);
router.get('/getAllGuardiesFromTreballador',GuardiaController.getAllGuardiesFromTreballador);


router.post('/insertGuardia',GuardiaController.insertGuardia);
router.post('/updateGuardia',GuardiaController.updateGuardia);
router.post('/updateEstatGuardiaAdmin',GuardiaController.updateEstatGuardiaAdmin);

module.exports = router;