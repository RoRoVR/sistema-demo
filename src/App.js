import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Productos } from "./pages/productos/Productos";
import { Login } from "./pages/login/Login";
import { Main } from "./pages/main/Main";
import { useDispatch, useSelector } from 'react-redux';
import { getUserByUid } from "./pages/login/slices/thunk";
import { useEffect } from "react";
import { auth } from "./firebase/firebaseConfig";
import { finishLoadingLogin } from "./pages/login/slices/loginSlice";
import { Compras } from "./pages/compras/Compras";
import { Almacen } from "./pages/almacen/Almacen";
import { Usuarios } from "./pages/usuarios/Usuarios";
import { Reportes } from "./pages/reportes/Reportes";
import { Ventas } from "./pages/ventas/Ventas";

function App() {
  const dispatch = useDispatch();
  const { uid } = useSelector( s => s.login );
  
  useEffect(() => { 
    const objenerDatosUsuario = () => {
        onAuthStateChanged( auth, (user) => {
            if( user ){
                dispatch( getUserByUid( user.uid ) );
            }else{
              dispatch( finishLoadingLogin() );
            }
        } )
      }
      objenerDatosUsuario();
    }, [])


  return (
    <>
      <BrowserRouter>
        <Routes>
          {
            uid?
            <Route path="/" element={  <Main/> } >

              <Route index element={ <Navigate to='/ventas'/> } />
              <Route path="productos" element={<Productos/>} />
              <Route path="almacen" element={<Almacen/>} />
              <Route path="compras" element={<Compras/>} />
              <Route path="ventas" element={ <Ventas/> } />
              <Route path="reportes" element={ <Reportes/> } />
              <Route path="usuarios" element={<Usuarios/>} />
              
            </Route>
            :
            <Route path="/"  element={<Login/>}/>
          }

          {/* RUTA A LA QUE SE REDIRECCIONA SI EL LINK NO EXISTE */}
          <Route path="*" element={<Navigate to='/'/>}/> 
        </Routes>
      </BrowserRouter>  
    </>
  );
}

export default App;
