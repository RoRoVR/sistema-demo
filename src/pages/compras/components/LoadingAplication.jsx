import React from 'react'

export const LoadingAplication = () => {
  return (
    <div className="bg-white position-absolute start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center"  >

        <div className="spinner-border" style={{width:'5rem', height: '5rem'}} role="status">
        <span className="visually-hidden">Cargando...</span>
        </div>

    </div>
  )
}
