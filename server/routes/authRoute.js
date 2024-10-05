import express from 'express'
import { fotgotpassword, googleAuth, loginController, registerController, updateProfileController, updateUserByIdController, viewAllUsersController } from '../controller/authController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post("/register", registerController)

router.post("/login", loginController)

router.post("/auth/google", googleAuth)

router.post("/fotgot-password", fotgotpassword)

router.put("/profile", authMiddleware, updateProfileController);

router.get('/users', viewAllUsersController);

router.put('/user/:id',authMiddleware, isAdmin, updateUserByIdController);

export default router;