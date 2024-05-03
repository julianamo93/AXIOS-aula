import React, { useState, useEffect } from 'react';
import axios from 'axios';

//DEFINIR A INTERFACE DO USUARIO
interface User{
    id: number;
    name:string,
    email:string;
}
const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [formData, setFormData] = useState<User>({ id: 0, name: '', email: '' });

  useEffect(()=>{
    fetchUsers();
  },[]);
  const fetchUsers = () =>{
 axios.get('http://localhost:3001/users')
 .then(response => setUsers(response.data))
 .catch(error => console.error('Erro ao buscar usuários:', error));
  };
  
  const handleEdit = (user: User) => {
    setEditUserId(user.id);
    // (...) Spread Operator operador de espelhamento
    setFormData({ ...user }); // Garantir que o formData é uma cópia do usuário
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    axios.put(`http://localhost:3001/users/${formData.id}`, formData)
      .then(() => {
        const updatedUsers = users.map(u => u.id === formData.id ? formData : u);
        setUsers(updatedUsers); // Atualizar a lista de usuários
        setEditUserId(null);
        setFormData({ id: 0, name: '', email: '' }); // Resetar formData
      })
      .catch(error => console.error('Erro ao atualizar usuário:', error));
  };

  const handleCancel = () => {
    setEditUserId(null);
    setFormData({ id: 0, name: '', email: '' }); // Resetar formData ao cancelar
  };

  const handleDelete = (editUserId:number) =>{
    if (window.confirm('Tem certeza que deseja deletar?')){
        axios.delete(`https://localhost:3001/users/${editUserId}`)
        .then(() =>{
            alert('Usuário deletado com sucesso!')
            fetchUsers();
        })
        .catch(error => console.error('Erro ao deletar usuário', error));
    }
}

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-xl font-bold mb-4'>Lista de Usuários</h1>
      <table className='min-w-full table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2'>ID</th>
            <th className='px-4 py-2'>Usuário</th>
            <th className='px-4 py-2'>Email</th>
            <th className='px-4 py-2'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            editUserId === user.id ? (
              <tr key={user.id}>
                <td className='border px-4 py-2'>{user.id}</td>
                <td className='border px-4 py-2'>
                  <input type='text' name='name' value={formData.name} onChange={handleChange} className='border p-1 w-full' />
                </td>
                <td className='border px-4 py-2'>
                  <input type='email' name='email' value={formData.email} onChange={handleChange} className='border p-1 w-full' />
                </td>
                <td className='border px-4 py-2'>
                  <button onClick={handleUpdate} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>
                    Salvar
                  </button>
                  <button onClick={handleCancel} className='ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'>
                    Cancelar
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td className='border px-4 py-2'>{user.id}</td>
                <td className='border px-4 py-2'>{user.name}</td>
                <td className='border px-4 py-2'>{user.email}</td>
                <td className='border px-4 py-2'>
                  <button onClick={() => handleEdit(user)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(editUserId)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>
                    Deletar
                  </button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;