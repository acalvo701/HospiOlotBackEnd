import express from "express";
import CategoriaController from "../../Controllers/Admin/CategoriaController";
import TokenController from "../../Controllers/GeneralUse/TokenController";
import TreballadorController from "../../Controllers/Admin/TreballadorController";

const router = express.Router();

router.get('/getAllCategories', TokenController.validateToken,CategoriaController.getAllCategories);

router.post('/insertCategoria', TokenController.validateToken,CategoriaController.insertCategoria);
router.post('/updateEstat', TokenController.validateToken,CategoriaController.updateEstat);

module.exports = router;