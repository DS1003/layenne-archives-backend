import express from 'express';
import FileController from '../controllers/FileController.js';
import upload from '../middlewares/uploadMiddleware.js'; // Middleware pour l'upload des fichiers
import authMiddleware from '../middlewares/authMiddleware.js'; // Protection des routes

const router = express.Router();

// Route pour uploader un fichier (protégée pour l'admin)
router.post('/upload', authMiddleware, upload.single('file'), FileController.uploadFile);

export default router;
