import express from "express";
import GuardiaModelTreballadorController from "../../Controllers/Admin/GuardiaModelTreballadorController";
import TokenController from "../../Controllers/GeneralUse/TokenController";

const router = express.Router();

router.get('/getNomsEsquemaByIdTreballador',TokenController.validateTokenAdmin,GuardiaModelTreballadorController.getNomsEsquemaByIdTreballador);

router.post('/insertNomEsquemaByIdTreballador',TokenController.validateTokenAdmin,GuardiaModelTreballadorController.insertNomEsquemaByIdTreballador);

module.exports = router;