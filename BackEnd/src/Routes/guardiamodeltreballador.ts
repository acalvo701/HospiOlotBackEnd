import express from "express";
import GuardiaModelTreballadorController from "../Controllers/Admin/GuardiaModelTreballadorController";

const router = express.Router();

router.get('/getNomsEsquemaByIdTreballador',GuardiaModelTreballadorController.getNomsEsquemaByIdTreballador);

router.post('/insertNomEsquemaByIdTreballador',GuardiaModelTreballadorController.insertNomEsquemaByIdTreballador);

module.exports = router;