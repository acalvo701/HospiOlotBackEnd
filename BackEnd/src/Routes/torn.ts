import express from "express";
import TornController from "../Controllers/TornController";

const router = express.Router();

router.get('/getAlltorns',TornController.getAllTorns);
// router.post('/login',UserController.login)
// router.get('/auth',UserController.validateToken,UserController.authenticated)


module.exports = router;