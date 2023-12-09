
const UserModel = require('../model/userModel')

const saveUser = (req, res) => {
    const { login, senha, nome, email, anoNasc } = req.body;
    UserModel.saveUser(login, senha, nome, email, anoNasc, (err, result)=>{
        if (err){
            console.error('erro ao salvar o produto: ', err)
            return res.status(500).json({error: 'Erro ao salvar o usuario'})
        }
        res.status(200).json({message: 'Usuario salvo com sucesso', result})
    })
}

const updateUser = (req, res) => {
    const { login, senha, nome, email, anoNasc } = req.body;
    const {id} = req.params

    console.log('Editando item: ', id)
    console.log(req.body)

    UserModel.updateUser(id, login, senha, nome, email, anoNasc, (err, result)=>{
        if (err){
            return res.status(500).json({error: 'Falha ao atualizar usuario'})
        }
        res.status(200).json({message: 'Usuario atualizado com sucesso!!', result})
    })
}

const deleteUser = (req, res) => {
    const {id} = req.params
    UserModel.deleteUser(id, (err, result)=>{
        if (err){
            return res.status(500).json({error: "Erro ao deletar o user"})
        }
        res.status(200).json({message: 'Usuario deletado com sucesso', result})
    })
}

const findUserByID = (req, res) => {
    const {id} = req.params
    UserModel.findUserByID(id, (err, result)=>{
        if (err){
            return res.status(500).json({error: 'Erro ao encontrar usuario pelo id'})
        }
        res.status(200).json(result)
    })

}

const findAllUsers = (req, res) => {
    UserModel.findAllUsers((err, results)=>{
        if (err){
            return res.status(500).json({error: 'Erro ao listar todos os usuarios'})
        }
        return res.status(200).json(results)
    })
}

const loginUser = (req, res) => {

    const {login, senha} = req.body

    UserModel.loginUser(login, senha, (err, result)=>{
        if (err){
            return res.status(500).json({error: 'Erro ao buscar o usuário'})
        }
        if (!result) return res.status(404).json({error: 'Login ou Senha incorretos'})

        return res.status(200).json({authorized: true, result})
    })
}

module.exports = {saveUser, updateUser, deleteUser, findAllUsers, findUserByID, loginUser}