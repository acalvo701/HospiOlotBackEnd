import express from "express";
import GuardiaModelController from "../Controllers/GuardiaModelController";

const router = express.Router();

router.get('/getEsquema',GuardiaModelController.getEsquema);

router.post('/updateEsquemaRow',GuardiaModelController.updateEsquemaRow);

module.exports = router;