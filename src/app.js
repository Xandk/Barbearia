
//import de bibliotecas
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

//import de models
import User from './models/User.js';

//import de routes
import userRoutes from './routes/userRoutes.js';


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



app.use('/', userRoutes);



