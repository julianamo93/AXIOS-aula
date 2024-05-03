// src/UserUpdate.tsx
import React, { useState } from 'react';
import axios from 'axios';
//DEFINIR A INTERFACE DO USUARIO
interface User{
    id: number;
    name:string,
    email:string;
}
interface UserUpdateProps {
  user: User;
  setEditingUser: (user: User | null) => void;
}
const UserUpdate: React.FC<UserUpdateProps> = ({ user, setEditingUser }) => {
  const [formData, setFormData] = useState<User>(user);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios.put(`http://localhost:3001/users/${formData.id}`, formData)
      .then(() => {
        alert('Usuário atualizado com sucesso!');
        setEditingUser(null);
      })
      .catch(error => console.error('Erro ao atualizar usuário:', error));
  };

  return (
    <div className='absolute top-0 left-0 w-full h-full bg-white bg-opacity-75 flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='bg-white p-4 rounded shadow-xl'>
        <h2 className='text-lg font-bold mb-4'>Editar Usuário</h2>
        <div>
          <label className='block'>Usuário:</label>
          <input type='text' name='user' value={formData.name} onChange={handleChange} className='border p-1 mb-2' />
        </div>
        <div>
          <label className='block'>Email:</label>
          <input type='email' name='email' value={formData.email} onChange={handleChange} className='border p-1 mb-2' />
        </div>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Atualizar
        </button>
        <button type='button' onClick={() => setEditingUser(null)} className='ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default UserUpdate;
