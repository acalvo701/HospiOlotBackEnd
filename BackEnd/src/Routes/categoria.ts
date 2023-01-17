import express from "express";
import CategoriaController from "../Controllers/CategoriaController";

const router = express.Router();

// [GET]

router.get('/getAllCategories', CategoriaController.getAllCategories);

module.exports = router;