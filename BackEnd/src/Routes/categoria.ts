import express from "express";
import CategoriaController from "../Controllers/CategoriaController";

const router = express.Router();

// [GET]

router.get('/getAllCategories', CategoriaController.getAllCategories);

// [POST]

router.post('/insertCategoria', CategoriaController.insertCategoria);
router.post('/updateEstat', CategoriaController.updateEstat);

module.exports = router;