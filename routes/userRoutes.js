import express from 'express';
import UserController from '../controllers/UserController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Configure multer pour les fichiers temporaires

router.put('/:userId/photo', upload.single('photo'), UserController.updateProfilePicture);

export default router;
