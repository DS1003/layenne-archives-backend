import prisma from '../prismaClient.js';

class PostController {
  // Méthode pour créer un post (déjà existante)
  static async createPost(req, res) {
    const { title, description, fileId } = req.body;
    const userId = req.user.id;

    try {
      const post = await prisma.post.create({
        data: {
          title,
          description,
          isPublic: true,
          fileId,
          userId,
        },
      });

      res.status(201).json({ message: 'Post créé avec succès', post });
    } catch (error) {
      console.error('Erreur lors de la création du post:', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  }

  // Méthode pour modifier un post
  static async updatePost(req, res) {
    const { id } = req.params;
    const { title, description, isPublic } = req.body;
    const userId = req.user.id;

    try {
      const post = await prisma.post.findUnique({ where: { id } });

      if (!post) {
        return res.status(404).json({ error: 'Post non trouvé' });
      }

      if (post.userId !== userId) {
        return res.status(403).json({ error: 'Accès non autorisé' });
      }

      const updatedPost = await prisma.post.update({
        where: { id },
        data: {
          title: title || post.title,
          description: description || post.description,
          isPublic: typeof isPublic !== 'undefined' ? isPublic : post.isPublic,
        },
      });

      res.status(200).json({ message: 'Post modifié avec succès', updatedPost });
    } catch (error) {
      console.error('Erreur lors de la modification du post:', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  }

  // Méthode pour supprimer un post
  static async deletePost(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    try {
      const post = await prisma.post.findUnique({ where: { id } });

      if (!post) {
        return res.status(404).json({ error: 'Post non trouvé' });
      }

      if (post.userId !== userId) {
        return res.status(403).json({ error: 'Accès non autorisé' });
      }

      await prisma.post.delete({ where: { id } });

      res.status(200).json({ message: 'Post supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression du post:', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  }
}

export default PostController;
