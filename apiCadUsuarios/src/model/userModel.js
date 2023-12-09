
const {connection} = require('../config/db')

class UserModel {

    static saveUser(login, senha, nome, email, anoNasc, callback){

        const query = 'INSERT INTO users (login, senha, nome, email, ano_nascimento) VALUES (?, ?, ?, ?, ?)'

        connection.query(query, [login, senha, nome, email, anoNasc], (err, results)=>{
            if (err) {
                return callback(err, null)
            }   
            callback(null, results)
        })

    }

    static findUserByID(id, callback){
        const query = 'SELECT * FROM users WHERE id = ?'
        connection.query(query, [id], (err, results)=>{
            if (err) {
                return callback(null, err)
            }
            if (results.length === 0) {
                return callback(null, null)
            }
            callback(null, results[0])
        })
    }

    static findAllUsers(callback){
        const query = 'SELECT * FROM users'
        connection.query(query, (err,results)=>{
            if (err){
                return callback(null, err)
            }
            callback(null, results)
        })
    }

    static updateUser(id, login, senha, nome, email, anoNasc, callback){
        const query = 'UPDATE users SET login=?, senha=?, nome=?, email=?, ano_nascimento=? WHERE id=?'
        connection.query(query, [login, senha, nome, email, anoNasc, id], (err, results)=>{
            if (err) {
                return callback(null, err)
            }
            callback(null, results)
        })
    }

    static deleteUser(id, callback){
        const query = 'DELETE FROM users WHERE id=?'

        connection.query(query, [id], (err,results)=>{
            if(err){
                return callback(null, err)
            }
            callback(null, results)
        })
    }

    static loginUser(login, senha, callback) {
        const query = 'SELECT * FROM users WHERE login = ? and senha = ?'

        connection.query(query, [login, senha], (err, result)=>{
            if (err){
                return callback(null, err)
            }
            if (result.length == 0){
                return callback(null, err)
            }
            callback(null, result[0])
        })
    }

}

module.exports = UserModel