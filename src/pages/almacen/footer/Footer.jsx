import React from 'react'
import { useState } from 'react'
import { ListaTareasPendientes } from '../windows/ListaTareasPendientes';

export const Footer = () => {
  const [listaTareasPendientes, setListaTareasPendientes] = useState(false);


  return (
    <div className='aplication-footer' >
      {/* VENTANAS */}
      {listaTareasPendientes&&
        <ListaTareasPendientes  
        listaTareasPendientes={listaTareasPendientes} 
        setListaTareasPendientes={setListaTareasPendientes}/>
      }



        <div className='btn btn-primary' onClick={()=>{ setListaTareasPendientes(!listaTareasPendientes) }} >Tareas Pendientes</div>
    </div>
  )
}
