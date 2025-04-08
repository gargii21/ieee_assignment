import { Router } from "express";
const router = Router();

import { createUser, getAllUsers } from "../controllers/userController.js";

router.post('/createUsers',createUser);
router.get('/getUsers', getAllUsers);

export default router;