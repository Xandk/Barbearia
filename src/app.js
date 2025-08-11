
//import de bibliotecas
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

//import de models
import User from './models/User.js';


dotenv.config(); // carrega as variáveis do .env

const app = express();

app.use(express.urlencoded({ extended: true }));  // ESSENCIAL para receber dados de formulários HTML. quando for receber JSON,trocar por express.json()

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)//aqui estamos conectando o servidor com o banco de dados. Esse paramento process.env.MONGO_URI esta pegando a url do meu banco de dados.
  
////////////////////////////////////////////////////


//a baixo esta sendo testado as rotas. Para testar, no navegador, digite localhost:3000/
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

//////////////////////////////////////



//abaixo tem a rota de cadastro (POST)

app.post('/register', async(req, res)=>{
  try{ 
    const{nome,email,senha} = req.body;

    //validação basica para que o usuario preencha todos os campos
    if(!nome || !email || !senha){
      return res.status(400).send("preencha todos os campos")
    }

    //verificação se um email ja esta sendo usado
    if (await User.findOne({ email })) {
      return res.status(400).send('Email já cadastrado');
    }//a função .findOne é usada para ver se ja existe um campo com o mesmo valor.

    //a constante a baixo é responsavel por criptografar nossas senhas.
    const criptografadorDeSenha = await bcrypt.hash(senha,10);

    //a baixo, é criado o usuario do banco
    const newUser = new User({nome, email, senha: criptografadorDeSenha});
    await newUser.save();

    res.status(201).send('usuario cadastrado!');  
}
catch (err) {
  console.error(err);
  res.status(500).send("erro no servidor");
}

});


////////////////////////////////

//vamos conectar nossa rota cadastro ao html  register, na pasta views.
import path from "path";
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

