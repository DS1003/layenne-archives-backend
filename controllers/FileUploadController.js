import fs from 'fs';
import FileUploadService from '../services/FileUploadService.js';

class FileUploadController {
  async uploadArchive(req, res) {
    const filePath = req.file.path;

    try {
      const fileUrl = await FileUploadService.uploadFile(filePath);
      
      // Supprime le fichier temporaire
      fs.unlinkSync(filePath);

      res.json({ url: fileUrl });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de l\'upload du fichier' });
    }
  }
}

export default new FileUploadController();
