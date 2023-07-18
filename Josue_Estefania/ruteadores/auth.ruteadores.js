import express from 'express';
import { register, login } from '../controladores/auth.controller.js';
import { verificarToken } from '../authUtils.js';

const router = express.Router();

router.post('/register', register); // Manejar la solicitud POST a /register con la función register
router.post('/login', login); // Manejar la solicitud POST a /login con la función login

// Nueva ruta para verificar la validez del token
router.post('/verifyToken', (req, res) => {
  const { token } = req.body;
  const claveSecreta = 'clave-secreta'; // La misma clave secreta que utilizaste para firmar el token

  const esTokenValido = verificarToken(token, claveSecreta);

  if (esTokenValido) {
    res.status(200).json({ message: 'El token es válido.' });
  } else {
    res.status(401).json({ message: 'El token no es válido o ha expirado.' });
  }
});

export default router;
