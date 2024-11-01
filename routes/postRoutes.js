import express from 'express';
import { PrismaClient } from '@prisma/client'; // Assure-toi que cette ligne est présente

const router = express.Router();
const prisma = new PrismaClient();

// Créer un post
router.post('/', async (req, res) => {
  const { title, description, fileId, userId } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        description,
        fileId,
        userId,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du post' });
  }
});

// Lister les posts
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        likes: true,
        comments: true,
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des posts' });
  }
});

export default router; // Exportation avec export default
