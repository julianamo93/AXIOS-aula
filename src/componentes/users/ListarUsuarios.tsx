import React, {useEffect,useState} from "react";
import axios from "axios";

import {API_BASE_URL_USER} from './../../config';

interface user{
    id:number,
    user: string,
    email: string;
}
const ListarUsuarios: React.FC = () =>{
    const [users, setUsers] = useState<user[]>([]);

    useEffect(() =>{
        axios.get(`${API_BASE_URL_USER}`)
        .then(response => {
            setUsers(response.data)
        })
        .catch(error => console.log(error));
    },[]);
    return(
        <>
        <h1>LISTAR USUARIOS</h1>
            <ul>
                {users.map(usuario =>(
                    <li key={usuario.id}> {usuario.user} - {usuario.email}</li>
                ))}
            </ul>
        </>
   )
}
export default ListarUsuarios;