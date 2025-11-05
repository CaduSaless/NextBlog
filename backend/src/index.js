import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import  jwt from "jsonwebtoken"
import { pool } from './config/bd.js';
import cookieParser from 'cookie-parser'
import fileupload from 'express-fileupload'

//Inicializando as dependências
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://192.168.237.87:3000",
    "http://172.28.176.1:3000",],
  credentials: true
}

));
app.use(fileupload())

//Iniciando o servidor
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}/`);
})

//Rotas

// 1. Pegar todas as notícias
app.get('/news', async (req, res) => {
  const News = await pool.query("SELECT * from Posts ORDER BY id DESC");
  res.send(News.rows);
})


// 2. Pegar uma notícia específica (por id)
app.get('/news/:id', async (req, res) => {
  const { id } = req.params;
  const News = await pool.query("SELECT * from Posts WHERE id = $1", [id]);
  res.send(News.rows);
});

//  3. Criar uma notícia
app.post('/news', async (req, res) => {
  let imageName = req.files?.add_image.name || null;
  imageName? req.files.add_image.mv("../frontend/public/uploads/"+imageName) : imageName = "default.svg";

  const { title, resume, body, author } = req.body;
  if(!title || !resume || !body) {
    return res.status(400).json({ error: 'Faltou algum campo obrigatório.' });
  }
  let newPost;
  try {
    newPost = await pool.query(
      "INSERT INTO Posts (titulo, resumo, corpo, add_imagem, autor_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, resume, body, imageName, author]
    );
  } catch(error) {
    res.json({error: error});
  }
  res.status(201).json(newPost.rows[0]);
});

// 4. Atualizar uma notícia
app.put('/news/:id', async (req, res) => {
  let imageName = req.files?.add_image.name || null;
  imageName? req.files.add_image.mv("../frontend/public/uploads/"+imageName) : imageName = imageName;
  
  const { id } = req.params;
  const { title, resume, body } = req.body;
  if(!title || !resume || !body) {
    return res.status(400).json({ error: 'Faltou algum campo obrigatório.' });
  }

  let updatedPost;
  if (imageName) {
    updatedPost = await pool.query("UPDATE Posts SET titulo = $1, resumo = $2, corpo = $3, add_imagem = $4 WHERE id = $5 RETURNING *",
      [title, resume, body, imageName, id]
    );
  } else {
    updatedPost = await pool.query("UPDATE Posts SET titulo = $1, resumo = $2, corpo = $3 WHERE id = $4 RETURNING *",
      [title, resume, body, id]
    );
  }
  res.json(updatedPost.rows[0]);
});



//5. Autenticação do usuário: Apenas verifica se está ou não logado

app.get('/auth', async (req, res) => {
  const token = req.cookies['token_login']

  if(!token) {
    return res.status(401).json({message: 'Unauthorized'})
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const user = await pool.query("select * from usuarios where id = $1", [decoded.id])
    if(!user.rows[0]) {
      return res.status(401).json({message: 'Unauthorized'})
    }
    res.status(201).json(user.rows[0]);
  } catch(err) {
    return res.status(401).json({message: 'Ocorreu um erro, tente novamente'})
  } 
});

//6. Login: Efetua o login do usuário, criando um cookie para ser utilizado nas requisições

app.post('/auth/login', async (req, res) => {
  const { email, senha } = req.body;

  const user = await pool.query('select * from usuarios where email= $1', [email]);
  const password = user.rows[0].senha_hash;
  if(!user || password != senha) {
    return res.status(401).json({ message: "Invalid email or password" })
  }

  const token = jwt.sign({ id: user.rows[0].id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  const isProd = process.env.NODE_ENV === 'production';

  res.cookie('token_login', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd? 'none': 'lax',
    maxAge: 60 * 60 * 1000, // 1 hora
    path: '/',
  })

  res.json({ user });
});

//7. Cria um Login: Cria o login do usuário, além de também entregar o cookie para ser utilizado nas requisições


app.post('/auth/new', async (req, res) => {
  const { email, senha, nome } = req.body;

  if(!email || !senha || !nome) {
    return res.status(401).json({ message: "Missing arguments" })
  }
  const user = await pool.query('insert into usuarios (email, senha_hash, nome) values ($1, $2, $3) returning *', [email, senha, nome]);

  const token = jwt.sign({ id: user.rows[0].id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  const isProd = process.env.NODE_ENV === 'production';

  res.cookie('token_login', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd? 'none': 'lax',
    maxAge: 60 * 60 * 1000, // 1 hora
    path: '/',
  })

  res.json( user.rows[0] );
});

//8. *Defeituosa Desconectaria em tese, o usuário logado deixaria de estar logado.

app.get('/logout', async (req, res) => {
  const isProd = process.env.NODE_ENV === 'production';
  console.log(req.cookies['token_login'])
  try {
    res.clearCookie("token_login", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd? 'none' : 'lax',
      maxAge: 0,
      path: "/",
  });
  } catch(err) {
    return res.status(401).json({ message: "Erro ao fazer logout"})
  }

  return res.status(201).send("Cookie removido");
});
