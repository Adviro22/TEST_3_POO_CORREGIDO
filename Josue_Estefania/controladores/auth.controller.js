import jwt from 'jsonwebtoken';
import User from '../modelos/user.js';

// Función de registro
export const register = async (req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { username, correo, password } = req.body;

    // Validar los datos (por ejemplo, verificar que no falten campos)

    // Crear un nuevo usuario en la base de datos
    const newUser = new User({ username, correo, password });
    await newUser.save();

    // Generar un token JWT válido
    const token = jwt.sign({ userId: newUser._id }, 'clave-secreta');

    // Enviar el token en la respuesta
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Ocurrió un error al registrar al usuario.' });
  }
};

// Función de inicio de sesión
export const login = async (req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { username, password } = req.body;

    // Buscar el usuario en la base de datos por nombre de usuario y contraseña
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // Generar un token JWT válido
    const token = jwt.sign({ userId: user._id }, 'clave-secreta');

    // Enviar el token en la respuesta
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Ocurrió un error al iniciar sesión.' });
  }
};
