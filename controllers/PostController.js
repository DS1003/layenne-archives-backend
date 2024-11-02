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

    // PostController.js
    static async listPosts(req, res) {
        const { page = 1, limit = 10, search } = req.query;
        const skip = (page - 1) * limit;

        try {
            const filters = {};
            if (search) {
                filters.OR = [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
                ];
            }

            const posts = await prisma.post.findMany({
                where: filters,
                skip,
                take: parseInt(limit),
                orderBy: { createdAt: 'desc' },
                include: { files: true, createdBy: true } // Inclure les fichiers et l’auteur
            });

            const totalPosts = await prisma.post.count({ where: filters });

            return res.status(200).json({
                data: posts,
                totalPosts,
                totalPages: Math.ceil(totalPosts / limit),
                currentPage: parseInt(page)
            });
        } catch (error) {
            return res.status(500).json({ error: "Erreur lors de la récupération des posts." });
        }
    }


}

export default PostController;
