import express from "express";
import CategoriaController from "../../Controllers/Admin/CategoriaController";
import TokenController from "../../Controllers/GeneralUse/TokenController";

const router = express.Router();

router.get('/getAllCategories', TokenController.validateTokenAdmin,CategoriaController.getAllCategories);

router.post('/insertCategoria', TokenController.validateTokenAdmin,CategoriaController.insertCategoria);
router.post('/updateEstat', TokenController.validateTokenAdmin,CategoriaController.updateEstat);

module.exports = router;