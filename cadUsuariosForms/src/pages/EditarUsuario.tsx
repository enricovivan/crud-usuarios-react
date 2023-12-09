import { useNavigate, useParams } from "react-router-dom"
import { UsersModel } from "../types/Users/UsersModel"
import { FormEvent, useContext, useEffect, useState } from "react"
import axios from "axios"
import { FormInputs } from "../types/Forms/FormInputs"
import Form from "../components/Form/Form"
import MessageContext from "../hooks/MessageContext"

interface FormEdit {
    login: string;
    senha: string;
    confirmSenha?: string;
    nome: string;
    email: string;
    anoNasc: string;
  }

function EditarUsuario(){

    const {userId} = useParams()
    const navigate = useNavigate()

    const { globalMessage, setGlobalMessage } = useContext(MessageContext)

    const formRegister: FormInputs[] = [
        {
          label: "Login",
          name: "login",
          placeholder: "Ex.: jose123",
          type: "text",
        },
        {
          label: "Senha",
          name: "senha",
          placeholder: "Ex.: ********",
          type: "password",
        },
        {
          label: "Confirmar Senha",
          name: "confirmSenha",
          placeholder: "Ex.: ********",
          type: "password",
        },
        {
          label: "Nome",
          name: "nome",
          placeholder: "Ex.: José Pedro",
          type: "text",
        },
        {
          label: "Email",
          name: "email",
          placeholder: "Ex.: jose@gmail.com",
          type: "email",
        },
        {
          label: "Ano Nascimento",
          name: "anoNasc",
          placeholder: "Ex.: 1489",
          type: "number",
        },
      ];


    const [formData, setFormData] = useState<FormEdit>({login: '', senha: '', confirmSenha: '', nome: '', email: '', anoNasc: ''})

    

    useEffect(()=>{

        getUserSendToUserEditando()

    }, [])

    const getUserSendToUserEditando = async () => {

        let editingUser: UsersModel = {id: 0, login: '', senha: '', nome: '', email: '', ano_nascimento: 0}

        try {

            // regex para descobrir se há apenas números no parametro da URL
            let isnum = /^\d+$/.test(userId ?? 'string')

            if (!isnum) {
                setGlobalMessage('A url aceita apenas números como ID! Não seja impertinente!!')
                navigate('/usuariosCadastrados')
            }

            await axios.get(`http://localhost:3000/api/users/${userId}`)
                .then(res => {
                    editingUser = res.data
                    if (!editingUser) {
                        navigate('/usuariosCadastrados')
                    }
                })
                .catch(err => alert(`O usuário com ID ${userId} não existe!!`))

            const {login, nome, email, ano_nascimento} = editingUser

            setFormData({
                login, nome, email, anoNasc: ano_nascimento.toString(), senha: '', confirmSenha: ''
            })
        } catch (e) {
            setGlobalMessage('O usuário que você tentou editar não existe!!!')
        }
        
    }
    
    const formSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (formData.senha != formData.confirmSenha) {
            alert("As senhas precisam ser iguais!!!");
            return;
        }

        updateUser()

    }

    const updateUser = async () => {

        const {login, senha, nome, email, anoNasc} = formData

        if (login == '' || senha == '' || nome == '' || email == '' || anoNasc == '') {
            alert('Por favor, preencha todos os campos!')
            return
        }

        await axios.patch(`http://localhost:3000/api/users/update/${userId}`, {
            login,
            senha,
            nome,
            email,
            anoNasc
        }).then(res => {
            if (res.status != 200) return
            alert(`Usuário ${nome} atualizado com sucesso!!!`)
            navigate('/usuariosCadastrados')
        })

    }

    const goBackToLogin = () => {

        let simNao = confirm('Deseja retornar à tela de login?\nOs dados do formulário que não foram enviados serão perdidos!')

        if (!simNao) return

        navigate('/')

    }

    const goBackToUsers = () => {

        let simNao = confirm('Deseja retornar à tela de usuários?\nOs dados do formulário que não foram enviados serão perdidos!')

        if (!simNao) return

        navigate('/usuariosCadastrados')

    }


    return (
        <>
            <div className="flex w-full min-h-screen justify-center items-center">
                <div className="p-5 bg-white rounded-lg shadowCustom">

                    <div className="flex w-full flex-row justify-between gap-x-5">
                        <button type="button" className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg" onClick={goBackToLogin}>Voltar para Login</button>
                        <button type="button" className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg" onClick={goBackToUsers}>Voltar para Usuários</button>
                    </div>
                    

                    <hr className="mb-3 mt-2"/>

                    <h1 className="text-center mb-3 text-2xl font-semibold">
                        Editando usuário com ID: {userId}
                    </h1>
                    
                    <hr className="mb-4" />

                    <div className="mb-3">
                        <Form
                            formItems={formRegister}
                            formSubmit={formSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            buttonName={"Editar"}
                        />
                    </div>

                    <p className="text-center text-slate-500">Digite uma nova senha para o usuário!!</p>

                </div>
            </div>
        </>
    )
}

export default EditarUsuario