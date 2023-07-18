import jwt from 'jsonwebtoken';

// Función para verificar la validez del token
export const verificarToken = (token, claveSecreta) => {
  try {
    // Verificar el token utilizando la clave secreta
    const decodedToken = jwt.verify(token, claveSecreta);

    // Si el token es válido, decodedToken contendrá el contenido del token decodificado
    // Puedes realizar acciones adicionales con los datos del token si es necesario

    return true; // El token es válido
  } catch (error) {
    // Si ocurre un error durante la verificación, significa que el token no es válido
    return false; // El token no es válido
  }
};
