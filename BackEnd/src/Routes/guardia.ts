import express from "express";
import GuardiaController from "../Controllers/GuardiaController";
import TokenController from "../Controllers/TokenController";
import Token from "../Model/Entities/Token";

const router = express.Router();

router.get('/getGuardia',TokenController.validateToken,GuardiaController.getGuardia);
router.get('/getAllGuardies',TokenController.validateToken,GuardiaController.getAllGuardies);
router.get('/getGuardiesByDay',TokenController.validateToken,GuardiaController.getGuardiesByDay);
router.get('/getGuardiesByDayAdmin',TokenController.validateToken,GuardiaController.getGuardiesByDayAdmin);
router.get('/getMonthGuardiesByDate',TokenController.validateToken,GuardiaController.getMonthGuardiesByDate);
router.get('/getMonthGuardiesByDateFromTreballador',TokenController.validateToken,GuardiaController.getMonthGuardiesByDateFromTreballador);
router.get('/getAllGuardiesFromTreballador',TokenController.validateToken,GuardiaController.getAllGuardiesFromTreballador);


router.post('/insertGuardia',TokenController.validateToken,GuardiaController.insertGuardia);
router.post('/updateGuardia',TokenController.validateToken,GuardiaController.updateGuardia);
router.post('/updateEstatGuardiaAdmin',TokenController.validateToken,GuardiaController.updateEstatGuardiaAdmin);

module.exports = router;