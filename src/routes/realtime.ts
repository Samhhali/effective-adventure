import express from "express";
import conteoller from '../controllers/realtime'
const router = express.Router();


router.get('/listdata', conteoller.read);

export = router;