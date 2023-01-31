import express from "express";
import CategoriaController from "../Controllers/Admin/CategoriaController";
import TreballadorController from "../Controllers/TreballadorController";

const router = express.Router();

router.get('/getAllCategories', TreballadorController.validateToken,CategoriaController.getAllCategories);

router.post('/insertCategoria', TreballadorController.validateToken,CategoriaController.insertCategoria);
router.post('/updateEstat', TreballadorController.validateToken,CategoriaController.updateEstat);

module.exports = router;