import React from 'react'

export const AlertNotification = ({ alertNotification, setAlertNotification, titulo, mensaje, funcion }) => {
  return (
    <div className='container-alert' >
      <div className="alert-title"> {titulo} </div>

      <div className="alert-body">
      {mensaje}
      </div>

      <div className="alert-footer">
        <button 
        className='alert-footer-btn-primary'
        onClick={()=>{
          funcion();
          setTimeout(()=>{
            setAlertNotification(!alertNotification)
          }, 1000);
        }}
        >Aceptar</button>

        <button 
        className='alert-footer-btn-secondary'
        onClick={()=>{ setAlertNotification(!alertNotification) }}  
        >Cancelar</button>
      </div>     

    </div>
  )
}
