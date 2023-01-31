import express from "express";
import GuardiaModelTreballadorController from "../Controllers/GuardiaModelTreballadorController";

const router = express.Router();

router.get('/getEsquema',GuardiaModelTreballadorController.getNomsEsquemaByIdTreballador);

module.exports = router;