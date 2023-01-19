import express from "express";
import TreballadorController from "../Controllers/TreballadorController";

const router = express.Router();

router.get('/getTreballador',TreballadorController.getTreballador);
router.get('/getAllTreballadors',TreballadorController.getAllTreballadors);

router.post('/insertTreballador',TreballadorController.insertTreballador);
router.post('/updateTreballador',TreballadorController.updateTreballador);

module.exports = router;