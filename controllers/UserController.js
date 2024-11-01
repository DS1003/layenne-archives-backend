import UserService from '../services/UserService.js';

class UserController {
  async updateProfilePicture(req, res) {
    const { userId } = req.params;
    const filePath = req.file.path; // Utilise multer pour gérer l'upload

    try {
      const updatedUser = await UserService.updateProfilePicture(userId, filePath);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la photo de profil' });
    }
  }

  // Autres méthodes de gestion d'utilisateur...
}

export default new UserController();
