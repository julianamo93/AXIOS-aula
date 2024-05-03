import AddUsuario from "./componentes/users/AddUsuario"
import AtualizarUsuario from "./componentes/users/AtualizarUsuario"
import ListarUsuarios from "./componentes/users/ListarUsuarios"
import UserTable from "./componentes/users/UserTable"


function App() {

  return (
    <>
    <ListarUsuarios></ListarUsuarios>
    <hr/>
    <AddUsuario></AddUsuario>
    <hr/>
    <br />
    <br />   <br />
    <AtualizarUsuario></AtualizarUsuario>
    <br />   <br />
    <UserTable></UserTable>
    </>
  )
}

export default App
