import express from "express";
import GuardiaController from "../../Controllers/GeneralUse/GuardiaController";
import TokenController from "../../Controllers/GeneralUse/TokenController";
import Token from "../../Model/Entities/Token";

const router = express.Router();

router.get('/getGuardia',TokenController.validateToken,GuardiaController.getGuardia);
router.get('/getAllGuardies',TokenController.validateToken,GuardiaController.getAllGuardies);
router.get('/getGuardiesByDay',TokenController.validateToken,GuardiaController.getGuardiesByDay);
router.get('/getMonthGuardiesByDate',TokenController.validateToken,GuardiaController.getMonthGuardiesByDate);
router.get('/getMonthGuardiesByDateFromTreballador',TokenController.validateToken,GuardiaController.getMonthGuardiesByDateFromTreballador);
router.get('/getAllGuardiesFromTreballador',TokenController.validateToken,GuardiaController.getAllGuardiesFromTreballador);

module.exports = router;