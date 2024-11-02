import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Accès refusé, token manquant' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Token invalide' });
    }

    // adminMiddleware.js
    async function adminMiddleware(req, res, next) {
        try {
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ message: "Accès refusé : réservée aux administrateurs." });
            }
            next();
        } catch (error) {
            return res.status(500).json({ error: "Erreur de vérification de rôle." });
        }
    }

    module.exports = adminMiddleware;

};

export default authMiddleware;
