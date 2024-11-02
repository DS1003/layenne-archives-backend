import multer from 'multer';

// Configuration de multer pour stocker temporairement les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Répertoire temporaire pour les fichiers
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialiser le middleware multer
const upload = multer({ storage });

export default upload;
