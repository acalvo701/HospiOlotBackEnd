import express from "express";
import GuardiaModelController from "../Controllers/GuardiaModelController";

const router = express.Router();


router.get('/countTreballadorsOfGuardia',GuardiaModelController.getEsquema);

router.post('/cancelGuardia',GuardiaModelController.updateEsquemaRow);

module.exports = router;