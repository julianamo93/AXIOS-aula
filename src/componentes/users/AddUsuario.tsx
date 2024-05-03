import axios from "axios";
import React,{useState} from "react";
//DEFINIR A INTERFACE DO USUARIO
interface IUser{
    name:string,
    email:string;
}
const AddUsuario: React.FC  = () =>{
    //adiciona o estado para manter os dados de formulario
   const[formData, setFormData] = useState<IUser>({name:'', email:''});
    //manipulação de envio de dados do formulario
    // vai ser enviado para o db.json
    const  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault(); // PREVENIR COMPOTAMENTO PADRÃO DE FORMULARIO
        try{
                    //enviar os dados para jsonserver
            // para comunicação com axios, o metodo para adicionar é post
            await axios.post('http://localhost:3001/users',formData);
            alert('Usuário adicionado com sucesso');
            //resetando o formulario apos insert
            setFormData({name:'', email:''}); 
        }
        catch(error){
            console.error('erro ao adicionar usuario ', error);
            alert('erro ao adicionar');
        }
    };
    // criar uma função para lidar com as mudanças nos campos de forms
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({
        ...formData,
        [event.target.name]: event.target.value
        });
    }; 
    return(
        <>
        <h1>ADICIONAR USUARIO</h1>

        <form onSubmit={handleSubmit}>
            <label>NOME:</label>
            <input type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-600 "
                    required />
        
            <label>EMAIL:</label>
            <input type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-600 " 
                    required />
            <button className="bg-blue-500" type="submit">Add Usuário</button>
        </form>
        </>
    )
}
export default AddUsuario;
