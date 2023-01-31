import express from "express";
import GuardiaModelTreballadorController from "../Controllers/GuardiaModelTreballadorController";

const router = express.Router();

router.get('/getNomsEsquemaByIdTreballador',GuardiaModelTreballadorController.getNomsEsquemaByIdTreballador);
router.get('/getNumberidGuardiaModelTreballador',GuardiaModelTreballadorController.getNumberidGuardiaModelTreballador);

router.post('/insertNomEsquemaByIdTreballador',GuardiaModelTreballadorController.insertNomEsquemaByIdTreballador);

module.exports = router;