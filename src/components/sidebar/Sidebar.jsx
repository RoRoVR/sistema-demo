import logoLetra from '../../assets/svg/logo-letra BN.svg';
import logo from '../../assets/svg/logo.svg';
import perfil from '../../assets/img/perfil.jpg';
import { upperCamelCase } from '../../helpers/textConfig.js';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../../pages/login/slices/thunk';
import { NavLink } from "react-router-dom";

export const Sidebar = ( {active, setActive}  ) => {

  const dispatch = useDispatch();
  const { nombre, cargo, imgUrl, permisos } = useSelector( s => s.login );

  return (
    <div className={`main-sidebar position-relative ${active ? 'active': 'no-active'} `} >

      <button className={`btn-active ${active ? 'active':'no-active'}`} 
        onClick={() => setActive(!active)}
      > <i className="bi bi-caret-left-fill"></i> 
      </button>

        <img src={active ? logoLetra : logo} style={{height:'55px'}} />

        {/* APLICACIONES */}
        <div>

          {permisos.productos&&
            <NavLink 
            className={({ isActive }) => isActive ? 'sidebar-btn-aplication active mb-3' : 'sidebar-btn-aplication mb-3'}
            to='/productos'
            >
                <i className="bi bi-inboxes-fill"></i>            
                <span className='ms-3' >Productos</span>
            </NavLink>
          }

          {permisos.almacen&&
            <NavLink 
            className={({ isActive }) => isActive ? 'sidebar-btn-aplication active mb-3' : 'sidebar-btn-aplication mb-3'}
            to='/almacen'
            >
                <i className="bi bi-boxes"></i>            
                <span className='ms-3' >Almacén</span>
            </NavLink>
          }

          {permisos.compras&&
            <NavLink 
            className={({ isActive }) => isActive ? 'sidebar-btn-aplication active mb-3' : 'sidebar-btn-aplication mb-3'}
            to='/compras'
            >
                <i className="bi bi-currency-exchange"></i>            
                <span className='ms-3' >Compras</span>
            </NavLink>
          }

          {permisos.ventas&&
            <NavLink 
            className={({ isActive }) => isActive ? 'sidebar-btn-aplication active mb-3' : 'sidebar-btn-aplication mb-3'}
            to='/ventas'
            >
                <i className="bi bi-basket2-fill"></i>            
                <span className='ms-3' >Ventas</span>
            </NavLink>
          }

          {permisos.reportes&&
            <NavLink 
            className={({ isActive }) => isActive ? 'sidebar-btn-aplication active mb-3' : 'sidebar-btn-aplication mb-3'}
            to='/reportes'
            >
                <i className="bi bi-clipboard-data-fill"></i>            
                <span className='ms-3' >Reportes</span>
            </NavLink>
          }

          { permisos.usuarios&&
            <NavLink 
            className={({ isActive }) => isActive ? 'sidebar-btn-aplication active mb-3' : 'sidebar-btn-aplication mb-3'}
            to='/usuarios'
            >
                <i className="bi bi-people-fill"></i>            
                <span className='ms-3' >Usuarios</span>
            </NavLink>
          }

          {/* 
          <NavLink className='sidebar-btn-aplication mb-3' >
              <i className="bi bi-folder-fill"></i>            
              <span className='ms-3' >Proyectos</span>
          </NavLink>

          <NavLink className='sidebar-btn-aplication mb-3' >
              <i className="bi bi-gear-fill"></i>            
              <span className='ms-3' >Configuracion</span>
          </NavLink> 
          */}
        </div>

        {/* DATOS DE USUARIO */}
        <div className={`d-flex align-items-center ${ active ? 'justify-content-between' : 'justify-content-center'}`} >
          {
            active ? 
            <>
              <img src={imgUrl} style={{width:'50px', borderRadius:'50%', marginRight:'7px' }} />
              <div>
                <p className='m-0 fw-bold' style={{fontSize:'14px', maxWidth:'140px'}} >
                  { upperCamelCase( nombre ) }
                </p>
                <p className='m-0' style={{fontSize:'12px'}} >
                  { cargo.toUpperCase() }
                </p>
              </div>
            </>
          :
          ''
          }


          <div className='btn-icon-white' onClick={() => { dispatch( signOutUser() ) }}  >
            <i className="bi bi-box-arrow-left"></i>
          </div>
        </div>

    </div>
  )
}
