import { FormEvent, useState } from "react"
import Form from "../components/Form/Form"
import { FormInputs } from "../types/Forms/FormInputs"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { URL_USERS } from "../configs/api"

interface FormLogin {
  login: string
  senha: string
}

function App() {

  const navigate = useNavigate()

  const formLogin: FormInputs[] = [
    {label: "Login", name: "login", type: "text", placeholder: "Ex.: usuarioAbacate123"},
    {label: "Senha", name: "senha", type: "password", placeholder: "Ex.: *******"},
  ]

  const [formData, setFormData] = useState<FormLogin | null>({login: '', senha: ''})

  const [message, setMessage] = useState<string>('')

  const submitForm = (e: FormEvent) => {
    e.preventDefault()

    if (!formData?.login || !formData?.senha) {
      alert("Insira todas as informações corretamente no formulário!!!")
      return
    }
      
    login()

  }

  const login = async () => {

    try {

      await axios.post(`${URL_USERS}/login`, formData)
        .then(_res => {
          setMessage('Login Realizado com Sucesso!')
          alert('Login Feito com Sucesso!!!\nRedirecionando para página de visualização de todos os usuários cadastrados!')
          navigate('/usuariosCadastrados')
        })
        .catch(_err => {
          setMessage('Login ou Senha incorretos')
          console.log("Este erro 404 foi definido por mim na API, para quando o usuário não existir no banco de dados, não é um erro de rota :)\nAss.: Enrico (eu mesmo)")
        })

    } catch (e){

      setMessage('Login ou Senha Incorretos!!')

    }

  }

  return (
    <>
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="p-5 bg-white rounded-lg shadowCustom">

          <h1 className="text-center mb-3 text-2xl font-semibold">Faça Login</h1>

          <hr className="mb-4" />

          <div className="mb-3">
            <Form formItems={formLogin} formSubmit={submitForm} formData={formData} setFormData={setFormData}/>
          </div>
          
          <div className="flex flex-row justify-between gap-x-3">
            <Link to={'/cadastroUsuario'} className="text-blue-700 underline">Quero me cadastrar</Link>
            <Link to={'/usuariosCadastrados'} className="text-blue-700 underline">Ver usuários cadastrados</Link>
          </div>
          
          {message != '' ? <div>
            <hr className="mt-2 mb-3"/>
            <p className="text-center text-red-600">{message}</p>
            <hr className="mt-3 mb-2"/>
          </div> : ''}
          

        </div>     
      </div>
    </>
  )
}

export default App
