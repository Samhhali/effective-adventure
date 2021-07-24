import express from "express";
import conteoller from '../controllers/bucket'
const router = express.Router();


router.get('/listbucket', conteoller.listBucket);

export = router;
