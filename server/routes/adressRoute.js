import express from 'express';
import { createAddress, deleteAddress, getAddressById, getAllAddressesByUser, updateAddress } from '../controller/adressController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create',authMiddleware, createAddress);
router.put('/update/:id',authMiddleware, updateAddress);
router.delete('/delete/:id',authMiddleware, deleteAddress);
router.get('/all/user',authMiddleware, getAllAddressesByUser);
router.get('/single/user/:id',authMiddleware, getAddressById);

export default router;