import express from "express";
import TokenController from "../../Controllers/GeneralUse/TokenController";

const router = express.Router();

router.post('/login',TokenController.login)
router.post('/refreshToken',TokenController.refreshToken);

module.exports = router;