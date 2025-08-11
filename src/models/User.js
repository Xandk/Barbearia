import mongoose from "mongoose";

//Criando o schemma

const userS = new mongoose.Schema({
    //o unique garante que um campo so vai aparecer uma vez, no caso, não pode ter dois usuarios com o mesmo email


    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    senha:{
        type: String,
        required: true,
    }

}, {timestamps: true});//A opção timestamps: true no Mongoose adiciona automaticamente dois campos de data a cada documento: createdAt e updatedAt. O campo createdAt registra a data e hora em que o documento foi criado pela primeira vez, enquanto updatedAt registra a data e hora da última atualização do documento. 

const User = mongoose.model('User', userS);
export default User;

//a função .model vai ser usada como um controlador para nosso banco de dados, onde a gente vai poder criar, buscar, atualizar ou deletar documentos