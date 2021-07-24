import express from "express";
import conteoller from '../controllers/cities'
const router = express.Router();

// router.get('/things', conteoller.getAllthings);
router.get('/', conteoller.getAllCities);
router.get('/citybyid/:id', conteoller.getDocByID);
router.get('/citybyname/:name', conteoller.getDocByName);
router.put('/updatecity/:id',conteoller.updateCity)
router.post('/addcity', conteoller.addCity);
router.delete('/delcity/:id', conteoller.deleteCity);


export = router;