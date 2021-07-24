import express from "express";
import conteoller from '../controllers/files'
const router = express.Router();


router.get('/listfiles', conteoller.listFiles);
router.post('/upload', conteoller.Upload);
router.post('/download', conteoller.Download);

export = router;
