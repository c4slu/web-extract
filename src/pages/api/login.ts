// ./pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';

const validUsername = 'caslu'; // Substitua pelo nome de usuário válido
const validPassword = '123';   // Substitua pela senha válida

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (username === validUsername && password === validPassword) {
      // Se as credenciais estiverem corretas, retorne um status 200 (OK)
      res.status(200).json({ message: 'Login bem-sucedido!' });
    } else {
      // Se as credenciais estiverem incorretas, retorne um status 401 (Unauthorized)
      res.status(401).json({ error: 'Credenciais inválidas.' });
    }
  } else {
    // A rota só aceita o método POST
    res.status(405).end();
  }
}
