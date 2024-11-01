import cloudinary from '../config/cloudinaryConfig.js';

class FileUploadService {
  async uploadImage(filePath) {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'user_photos',
    });
    return result.secure_url;
  }
}

export default new FileUploadService();
