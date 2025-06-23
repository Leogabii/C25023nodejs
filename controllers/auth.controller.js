import { db, collection, getDocs } from '../services/firestore.service.js';
import jwt from 'jsonwebtoken';

export async function login(req, res) {
  const { username, password } = req.body;
  const usuariosRef = collection(db, 'usuario');
  const snapshot = await getDocs(usuariosRef);
  const userDoc = snapshot.docs.find(doc => {
    const data = doc.data();
    return data.username === username && data.password === password;
  });

  if (!userDoc) return res.status(401).json({ mensaje: 'Credenciales incorrectas' });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}