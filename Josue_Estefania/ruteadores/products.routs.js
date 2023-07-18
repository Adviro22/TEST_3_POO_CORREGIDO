import { Router } from "express";
import * as productsCtrl from '../controladores/products.controllers.js';
import { verificarToken } from '../authUtils.js';

const router = Router();

// Middleware de autenticación
router.use((req, res, next) => {
  const token = req.headers['authorization']; // Obtener el token del encabezado Authorization

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }

  const claveSecreta = 'clave-secreta'; // La misma clave secreta que utilizaste para firmar el token
  const esTokenValido = verificarToken(token, claveSecreta);

  if (!esTokenValido) {
    return res.status(401).json({ message: 'Token inválido o ha expirado.' });
  }

  // Si el token es válido, se permite el acceso a las rutas protegidas
  next();
});

// Rutas protegidas de productos
router.get('/', productsCtrl.findAllProducts);
router.get('/findOne', productsCtrl.findOneProduct);
router.post('/', productsCtrl.addProducts);
router.put('/:id', productsCtrl.updateProduct);
router.delete('/', productsCtrl.deleteProduct);

export default router;
