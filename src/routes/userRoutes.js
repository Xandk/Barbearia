// Importando a biblioteca
import express from 'express';

// Importa as funções de cadastro e login que estão no controller
import { register, login } from '../controllers/userController.js';

// Importa módulos para trabalhar com caminhos de arquivos
import path from 'path';
import { fileURLToPath } from 'url';


///////////////////////

const router = express.Router();

// Obtem o diretório atual do arquivo para usar na função sendFile (caminho absoluto)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Rota POST para o cadastro de usuário, executa a função register no controller
router.post('/register', register);

// Rota POST para o login de usuário, executa a função login no controller
router.post('/login', login);



// Rota GET para servir a página HTML de cadastro (register.html) e a de login(login.html)
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'register.html'));
});
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'login.html'));
});

export default router;
