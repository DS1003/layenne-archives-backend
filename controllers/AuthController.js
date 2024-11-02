import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';

class AuthController {
  // Enregistre un nouvel utilisateur/admin
  static async register(req, res) {
    const { username, email, password, role } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role,
        },
      });

      // Génération du token JWT
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' } // Token valide pendant 1 jour
      );

      res.status(201).json({ message: 'Utilisateur créé avec succès', token, user });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
  }

  // Connexion d'un utilisateur/admin
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Mot de passe incorrect' });
      }

      // Génération du token JWT
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.status(200).json({ message: 'Connexion réussie', token, user });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
  }
}

export default AuthController;
