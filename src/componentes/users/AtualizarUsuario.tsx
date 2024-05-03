import React,{useState,useEffect} from "react";
import axios from "axios";
import {API_BASE_URL_USER} from './../../config';
import UserUpdate from "./UserUpdate";
//DEFINIR A INTERFACE DO USUARIO
interface IUser{
    id: number;
    name:string,
    email:string;
}
const AtualizarUsuario = () =>{
    const [users, setUsers] = useState<IUser[]>([]);
    const [count,setCount]= useState(0);
    const[editingUser,setEditingUser]=useState<IUser | null>(null);
    useEffect(() =>{
        axios.get(`${API_BASE_URL_USER}`)
        .then(response => {
            setUsers(response.data)
            setCount(response.data.length)
        })
        .catch(error => console.log(error));
    },[]);

return(
    <div className="container mx-auto p-4">
    <h1>Atualizar Usuário</h1>
    <p>TOTAL DE REGISTROS: {count}</p>
    <table className="table-auto">
        <thead>
            <tr>
                <th>ID:</th>
                <th>Nome do usuário: </th>
                <th>EMAIL: </th>
                <th>AÇÃO </th>
            </tr>
        </thead>
        <tbody>
            {users.map((usuario) =>(
                <tr key={usuario.id}> 
                <td className="border px-4 py-2">{usuario.id}</td>
                <td className="border px-4 py-2">{usuario.name}</td>
                <td className="border px-4 py-2">{usuario.email}</td>
                <td className="border px-4 py-2">
                    <button className="bg-blue-600 hover:bg-blue-200 text-white font-bold"
                    onClick={()=>setEditingUser(usuario)}>
                        EDITAR
                    </button>
                </td>
                </tr>
                

            ))}
        </tbody>

    </table>
    {editingUser && <UserUpdate user={editingUser} setEditingUser={setEditingUser} />}

    </div>

)
}
export default AtualizarUsuario;