import express from 'express'
import { fotgotpassword, loginController, registerController } from '../controller/authController.js';

const router = express.Router();


router.post("/register", registerController)


router.post("/login", loginController)


router.post("/fotgot-password", fotgotpassword)


export default router;