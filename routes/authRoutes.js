import express from 'express';
import AuthController from '../controllers/AuthController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route de connexion
router.post('/login', AuthController.login);

// Route protégée, par exemple pour créer un post
router.post('/protected-route', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Accès autorisé' });
});

export default router;
