import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// componentes

// PUBLIC
import LayoutPublic from './layouts/LayoutPublic';
import Register from './pageauth/Register';
import PageHome from './pagepublic/PageHome';

// PRIVATE
import ProtectedRoutes from './pageauth/ProtectedRoutes';

// ROL ADMIN
import LayoutAdministrador from './layouts/LayoutAdministrador';

// ROL CLIENTE
import LayoutCliente from './layouts/LayoutCliente';

// ROL GESTOR DE COMPLEJOS
import LayoutGestorComplejo from './layouts/LayoutGestorComplejo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas */} 
          <Route path='/' element={<LayoutPublic/>}>
            <Route index element={<PageHome/>}/>
            
            {/* Rutas de autenticación */}
            <Route path='/register' element={<Register/>}/>
          </Route>

          {/* Rutas Privadas */}
          <Route element={<ProtectedRoutes/>}>

          {/* Rutas para administradores */}
            <Route path='/administrador' element={<LayoutAdministrador/>}>
            </Route>

          {/* Rutas para clientes */}
            <Route path='/cliente' element={<LayoutCliente/>}>
            </Route>

          {/* Rutas para gestores de complejo */}
            <Route path='/gestorComplejo' element={<LayoutGestorComplejo/>}>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;