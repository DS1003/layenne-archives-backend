import FileUploadService from '../services/FileUploadService.js';
import prisma from '../prismaClient.js';

class FileController {
    static async uploadFile(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'Aucun fichier téléchargé' });
            }

            // Upload le fichier sur Cloudinary
            const fileUrl = await FileUploadService.uploadFile(req.file.path);

            // Enregistre l'URL du fichier dans la base de données
            const file = await prisma.file.create({
                data: {
                    url: fileUrl,
                    type: req.file.mimetype,
                    name: req.file.originalname,
                },
            });

            res.status(201).json({ message: 'Fichier uploadé avec succès', file });
        } catch (error) {
            console.error('Erreur lors de l\'upload de fichier:', error);
            res.status(500).json({ error: 'Erreur lors de l\'upload de fichier' });
        }
    }

    // FileController.js
    static async listFiles(req, res) {
        const { type, page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        try {
            const filters = {};
            if (type) filters.type = type; // Filtrer par type (audio, vidéo, etc.)

            const files = await prisma.file.findMany({
                where: filters,
                skip,
                take: parseInt(limit),
                orderBy: { createdAt: 'desc' }
            });

            const totalFiles = await prisma.file.count({ where: filters });

            return res.status(200).json({
                data: files,
                totalFiles,
                totalPages: Math.ceil(totalFiles / limit),
                currentPage: parseInt(page)
            });
        } catch (error) {
            return res.status(500).json({ error: "Erreur lors de la récupération des fichiers." });
        }
    }

}

export default FileController;
