// controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import { db } from '../config/firestore.config.js';

const usersRef = db.collection('users');

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const snapshot = await usersRef.where('username', '==', username).get();

    if (snapshot.empty) {
      console.log("Usuario no encontrado.");
      return res.status(401).json({ msg: 'Usuario no encontrado' });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    if (userData.password !== password) {
      console.log("contraseña incorrecta.");
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.log("Error al autenticar.");
    res.status(500).json({ msg: 'Error al autenticar', error: error.message });
  }
};
