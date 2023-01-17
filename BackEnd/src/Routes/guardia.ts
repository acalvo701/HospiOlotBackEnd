import express from "express";
import GuardiaController from "../Controllers/GuardiaController";

const router = express.Router();

router.get('/getAllGuardies',GuardiaController.getAllGuardies);
// router.post('/login',UserController.login)
// router.get('/auth',UserController.validateToken,UserController.authenticated)


module.exports = router;