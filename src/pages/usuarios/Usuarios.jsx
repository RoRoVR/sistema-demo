import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Body } from './body/Body'
import { Footer } from './footer/Footer'
import { Header } from './header/Header'
import { obtenerDatosUsuarios } from './slices/usuariosSlice'
import { obtenerColeccionUsuarios } from './slices/usuariosThunk'
import { NuevoUsuario } from './windows/NuevoUsuario'

export const Usuarios = () => {
  const dispatch = useDispatch();
  const [nuevoUsuario, setNuevoUsuario] = useState(false);

  useEffect(() => {
    dispatch( obtenerColeccionUsuarios() );    
  }, [])
  

  return (
    <div>

      {/* VENTANAS */}
      {nuevoUsuario&&
        <NuevoUsuario setNuevoUsuario={setNuevoUsuario} />
      }

        <Header/>
        
        <Body/>

        <Footer
        setNuevoUsuario={setNuevoUsuario}
        />
    </div>
  )
}
