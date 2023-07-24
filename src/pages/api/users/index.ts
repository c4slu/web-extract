// pages/api/getData.js

import { NextApiRequest, NextApiResponse } from 'next';

import sql from 'mssql';
const {
  DB_SERVER,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  INSTANCIA,
} = process.env;


export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { startDate, endDate, table } = req.query;

  
  try {
    // Configuração de conexão com o banco de dados (substitua com suas credenciais)
    const config = {
      user: DB_USER || "",
      password: DB_PASSWORD || "",
      server: DB_SERVER || "",
      database: DB_DATABASE || "",
      options: {
        encrypt: false, // Habilita a criptografia da conexão
        trustServerCertificate: true, // Permite confiar no certificado do servidor (apenas para desenvolvimento, NÃO use em produção)
        enableArithAbort: true, // Habilita o "aborto de aritmética", geralmente é necessário para evitar erros em algumas consultas
        instanceName: INSTANCIA
      },
    };

    // Conecta ao banco de dados
    await sql.connect(config);

    // Query para extrair os dados (substitua "tabela" pelo nome da tabela que deseja extrair)
    const result = await sql.query(`SELECT * FROM NOTA WHERE data BETWEEN CAST('${startDate}' AS DATE) AND CAST('${endDate}' AS DATE) order by 1`);


    // Retorna os dados extraídos como resposta
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    res.status(500).json({ error: 'Erro ao obter dados.' });
  }
}
