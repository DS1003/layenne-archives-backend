import prisma from '../prismaClient.js';
import FileUploadService from './FileUploadService.js';

class UserService {
  async updateProfilePicture(userId, filePath) {
    const photoUrl = await FileUploadService.uploadImage(filePath);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { photo: photoUrl },
    });

    return updatedUser;
  }

  // Autres méthodes liées aux utilisateurs...
}

export default new UserService();
