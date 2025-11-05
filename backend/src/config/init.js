import { pool } from "./bd.js";

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        senha_hash VARCHAR(255) NOT NULL
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Posts (
        id SERIAL PRIMARY KEY,
        resumo VARCHAR(300) NOT NULL,
        corpo TEXT NOT NULL,
        titulo VARCHAR(200) NOT NULL,
        add_imagem VARCHAR(255) NOT NULL,
        autor_id INT REFERENCES Usuarios(id)
      );
    `);

    console.log("Tabelas criadas ou já existiam!");
  } catch (err) {
    console.error("Erro ao criar tabelas:", err);
  }
};

export default createTables;
