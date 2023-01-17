import express from "express";
import UnitatController from "../Controllers/UnitatController";

const router = express.Router();

router.get('/getAllUnitats',UnitatController.getAllUnitats);
router.post('/insertUnitat',UnitatController.insertUnitat);
router.post('/updateEstat',UnitatController.updateEstat);


module.exports = router;