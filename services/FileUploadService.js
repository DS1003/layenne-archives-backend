import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configuration de Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class FileUploadService {
  static async uploadFile(filePath) {
    try {
      const result = await cloudinary.v2.uploader.upload(filePath, {
        resource_type: 'auto', // Détection automatique du type de fichier (image, vidéo, etc.)
      });

      return result.secure_url; // Retourne l'URL sécurisée du fichier
    } catch (error) {
      console.error('Erreur lors de l\'upload sur Cloudinary:', error);
      throw new Error('Erreur lors de l\'upload du fichier');
    }
  }
}

export default FileUploadService;
