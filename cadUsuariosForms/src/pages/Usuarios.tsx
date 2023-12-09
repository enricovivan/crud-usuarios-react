import { useContext, useEffect, useState } from "react";
import { UsersModel } from "../types/Users/UsersModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageContext from "../hooks/MessageContext";
import { URL_USERS } from "../configs/api";

function Usuarios() {
  const navigate = useNavigate();
  const {globalMessage, setGlobalMessage} = useContext(MessageContext)

  const [loadedUsers, setLoadedUsers] = useState<UsersModel[]>([]);

  useEffect(() => {
    loadUsers();
  }, [loadedUsers]);

  const loadUsers = async () => {
    await axios
      .get(URL_USERS)
      .then((res) => {
        setLoadedUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = async (userId: number) => {
    console.log(`Deletando usuario com id: ${userId}`)

    let user: UsersModel = {id: 0, login: '', senha: '', nome: '', email: '', ano_nascimento: 0}
    
    await axios.get(`${URL_USERS}/${userId}`)
        .then(res => {
            user = res.data
        })
        .catch(_err => {
            alert("Erro ao buscar usuário!!, Atualize a página.")
            return
        })

    let option = confirm(`Deseja mesmo excluir o usuário ${user?.nome}?`)

    if (!option) return

    await axios.delete(`${URL_USERS}/delete/${userId}`)
        .then(_res => {
            alert(`Usuário ${user?.nome} excluído com sucesso!!!`)
        })
        .catch(_err => {
            alert(`Erro ao excluir o usuário ${user?.nome}`)
        })

    loadUsers()

  }

  const editarUser = (userId: number) => {
    console.log(`Editando usuário com id: ${userId}`)
    navigate(`/user/${userId}`)
  }

  const renderTable = () => {
    if (loadedUsers.length == 0) {
      return (
        <div className="w-96">
          <p className="text-center">Não há usuários cadastrados!</p>
        </div>
      );
    }

    return (
      <table className="table-auto border-collapse">
        <caption className="caption-top text-red-500 mb-2">
          <b>Importante:</b> Favor não roubar a conta do amiguinho, é feio!
          <hr className="w-1/2 bg-red-500 border border-red-500 mb-3" />
        </caption>
        <thead>
          <tr className="border-b border-slate-500">
            <th className="">ID</th>
            <th className="">LOGIN</th>
            <th className="">SENHA</th>
            <th className="">NOME</th>
            <th className="">EMAIL</th>
            <th className="">ANO NASCIMENTO</th>
            <th>EDITAR</th>
            <th>EXCLUIR</th>
          </tr>
        </thead>
        <tbody>
          {loadedUsers.map((item) => (
            <tr key={item.id} className="border-b border-slate-500">
              <td className="px-5 py-2 text-center">{item.id}</td>
              <td className="px-5 py-2 text-center">{item.login}</td>
              <td className="px-5 py-2 text-center">{item.senha}</td>
              <td className="px-5 py-2 text-center">{item.nome}</td>
              <td className="px-5 py-2 text-center">{item.email}</td>
              <td className="px-5 py-2 text-center">{item.ano_nascimento}</td>
              <td className="px-5 py-2"><button type="button" onClick={()=>editarUser(item.id)} className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white">Editar</button></td>
              <td className="px-5 py-2"><button type="button" onClick={()=>deleteUser(item.id)} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded-lg text-white">Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div className="flex flex-col w-full min-h-screen justify-center items-center">

        {globalMessage != '' ? <div className="my-5 flex flex-row justify-between items-center gap-x-3">

            <p className="text-center text-red-500">{globalMessage}</p>

            <button type="button" className="text-white text-xs w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full"
            onClick={()=>setGlobalMessage('')}
            >X
            </button>

        </div> : ''}
        

        <div className="p-5 bg-white rounded-lg shadowCustom">

            <div className="flex flex-row justify-between items-center w-full">
            <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                    onClick={() => navigate("/")}
                >
                Voltar para Login
                </button>

                <button
                    type="button"
                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
                    onClick={() => navigate("/cadastroUsuario")}
                >
                Cadastrar Novo Usuário
                </button>
            </div>
          

          <hr className="mt-4 mb-3" />

          {renderTable()}

        </div>
      </div>
    </>
  );
}

export default Usuarios;
