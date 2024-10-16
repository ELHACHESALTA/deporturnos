import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import "preline/preline";
import { useEffect } from 'react';

// componentes

// PUBLIC
import LayoutPublic from './layouts/LayoutPublic';
import Login from './pageauth/Login';
import Register from './pageauth/Register';
import PageHome from './pagepublic/PageHome';
import PageError from './pagepublic/PageError';

// PRIVATE
import ProtectedRoutes from './pageauth/ProtectedRoutes';

// ROL ADMIN
import LayoutAdministrador from './layouts/LayoutAdministrador';
import Panel from './pageadministrador/Panel';
import Bienvenida from './pageadministrador/Bienvenida';

// ROL CLIENTE
import LayoutCliente from './layouts/LayoutCliente';
import WelcomeCliente from './pagecliente/WelcomeCliente';
import VerCanchas from './pagecliente/VerCanchas';
import Cancha from './pagecliente/Cancha';
import MisFavoritos from './pagecliente/MisFavoritos';
import MisTurnosCliente from './pagecliente/MisTurnosCliente';
import ReprogramarTurno from './pagecliente/ReprogramarTurno';
import Complejo from './pagecliente/Complejo';

// ROL GESTOR DE COMPLEJOS
import LayoutGestorComplejo from './layouts/LayoutGestorComplejo';
import WelcomeGestor from './pagegestorcomplejo/WelcomeGestor';
import MiComplejo from './pagegestorcomplejo/MiComplejo';
import MisCanchas from './pagegestorcomplejo/MisCanchas';
import MisTurnos from './pagegestorcomplejo/MisTurnos';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
      <script src="https://cdn.jsdelivr.net/npm/preline/dist/preline.min.js"></script>
    </div>
  );
}

function MainContent() {
  const location = useLocation();

  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, [location.pathname]);

  return (
    <Routes>
      {/* Rutas Públicas */} 
      <Route path='/' element={<LayoutPublic />}>
        <Route index element={<PageHome />} />

        {/* Rutas de autenticación */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Ruta para errores */}
        <Route path='*' element={<PageError />} />
      </Route>

      {/* Rutas Privadas */}
      <Route element={<ProtectedRoutes />}>
        {/* Rutas para administradores */}
        <Route path='/administrador' element={<LayoutAdministrador />}>
          <Route index element={<Bienvenida />} />
          <Route path='panel' element={<Panel />} />
        </Route>

        {/* Rutas para clientes */}
        <Route path='/cliente' element={<LayoutCliente />}>
          <Route index element={<WelcomeCliente />} />
          <Route path='verCanchas' element={<VerCanchas/>}/>
          <Route path='cancha/:id' element={<Cancha/>}/>
          <Route path='misFavoritos' element={<MisFavoritos/>}/>
          <Route path='misTurnosCliente' element={<MisTurnosCliente/>}/>
          <Route path='reprogramarTurno' element={<ReprogramarTurno/>}/>
          <Route path='complejo/:id' element={<Complejo/>}/>
        </Route>

        {/* Rutas para gestores de complejo */}
        <Route path='/gestorComplejo' element={<LayoutGestorComplejo />}>
          <Route index element={<WelcomeGestor />} />
          <Route path='miComplejo' element={<MiComplejo />} />
          <Route path='misCanchas' element={<MisCanchas />} />
          <Route path='misTurnos' element={<MisTurnos />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
