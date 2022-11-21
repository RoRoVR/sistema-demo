import React from 'react'

export const FormCategorias = ( { handleSubmit, handleChange, nombre } ) => {
  return (
    <form onSubmit={ handleSubmit } >
      <div className="row"> 
        <div className='mb-2' >
          <label htmlFor="nombre"> Nombre: </label>
          <input 
            type="text" 
            className='form-control py-1'
            placeholder='Ej: Herramientas'
            autoComplete='off'
            id='nombre'
            name='nombre'
            onChange={ handleChange }
            value={ nombre }
          />
        </div>
      </div>       
    </form>
  )
}
