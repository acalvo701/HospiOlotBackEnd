import express from "express";
import GuardiaTreballadorController from "../Controllers/GuardiaTreballadorController";

const router = express.Router();

router.get('/bookGuardia',GuardiaTreballadorController.bookGuardia);
// router.get('/getAllGuardies',GuardiaTreballadorController.getAllGuardies);

// router.post('/insertGuardia',GuardiaTreballadorController.insertGuardia);
// router.post('/updateGuardia',GuardiaTreballadorController.updateGuardia);

module.exports = router;