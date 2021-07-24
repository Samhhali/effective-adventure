import express from "express";
import conteoller from '../controllers/auth'
const router = express.Router();

router.get('/users', conteoller.getUsers);
router.get('/users/:id', conteoller.getUserbyID);
router.post('/users/adduser', conteoller.addUser);
router.put('/users/updateuser/:id', conteoller.updateUser);
router.delete('/users/deluser/:id', conteoller.DeleteUser);


export = router;