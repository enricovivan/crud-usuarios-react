import { FormEvent, useState } from "react";
import Form from "../components/Form/Form";
import { FormInputs } from "../types/Forms/FormInputs";
import { Link } from "react-router-dom";

import axios from "axios";

interface FormRegister {
  login: string;
  senha: string;
  confirmSenha?: string;
  nome: string;
  email: string;
  anoNasc: string;
}

function CadastroUsuario() {
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

  const [formData, setFormData] = useState<FormRegister>({
    login: "",
    senha: "",
    confirmSenha: "",
    nome: "",
    email: "",
    anoNasc: "",
  });

  const [message, setMessage] = useState<string>("");

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.senha != formData.confirmSenha) {
      alert("As senhas precisam ser iguais!!!");
      return;
    }

    console.log(formData);
    saveUser();
  };

  const saveUser = async () => {
    const { login, senha, nome, email, anoNasc } = formData;

    if (login == '' || senha == '' || nome == '' || email == '' || anoNasc == '') {
      setMessage('Por favor, preencha todos os campos!')
      return
    }

    try {
      await axios
        .post("http://localhost:3000/api/users/save", {
          login,
          senha,
          nome,
          email,
          anoNasc,
        })
        .then((res) => {
          if (res.status != 200) return

          setMessage("Sucesso ao salvar o usuário!!!");

          // limpa os inputs
          setFormData({
            login: "",
            senha: "",
            confirmSenha: "",
            nome: "",
            email: "",
            anoNasc: "",
          });

        }).catch(err => {
          setMessage('Erro ao salvar o usuário!')
        });

    } catch (e) {
      console.log("Erro ao salvar o usuário: ", e);
    }
  };

  return (
    <>
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="p-5 bg-white rounded-lg shadowCustom">
          <h1 className="text-center mb-3 text-2xl font-semibold">
            Registre-se Imediatamente!!!
          </h1>

          <hr className="mb-4" />

          <div className="mb-3">
            <Form
              formItems={formRegister}
              formSubmit={formSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonName={"Cadastrar"}
            />
          </div>

          <Link to={"/"} className="text-blue-700 underline">
            Voltar para Login
          </Link>

          {message !== "" ? (
            <div>
              <hr className="mt-2 mb-3" />
              <p className="text-center text-green-700">{message}</p>
              <hr className="mt-3 mb-2" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default CadastroUsuario;
