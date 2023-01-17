import express from "express";
import UnitatController from "../Controllers/UnitatController";

const router = express.Router();

router.get('/getAllUnitats',UnitatController.getAllUnitats);
// router.post('/login',UserController.login)
// router.get('/auth',UserController.validateToken,UserController.authenticated)


module.exports = router;