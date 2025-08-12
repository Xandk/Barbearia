//importando biblioteca

import bcrypt from 'bcryptjs';

//importando user de models que vamos usar mais pra frente
import User from '../models/User.js';

/////////////////////////////////////////


//abaixo, está sendo criado o sistema de cadastro
export const register = async(req,res) =>{
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
  res.status(500).send("erro no servidor");}
};

///////////////////////////////
//abaixo vai ser criado o sistema de login
export const login = async (req, res) => {
    try {
    const { email, senha } = req.body;

    //validação basica para que o usuario preencha todos os campos
    if (!email || !senha) {
      return res.status(400).send("Preencha todos os campos");
    }

    //verificação se usuario existe, a partir de seu email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Usuário não encontrado");
    }

    //verificação se a senha está correta
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(400).send("Senha incorreta");
    }

    //caso passe por todas as verificações, o login é realizado
    res.status(200).send("Login realizado com sucesso!");

  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
};