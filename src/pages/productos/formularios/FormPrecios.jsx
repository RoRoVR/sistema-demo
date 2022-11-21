import React from 'react'

export const FormPrecios = ( { handleSubmit, handleChange, tipo } ) => {
  return (
    <form onSubmit={ handleSubmit } >
      <div className="row"> 
        <div className='mb-2' >
          <label htmlFor="tipo"> Tipo: </label>
          <input 
            type="text" 
            className='form-control py-1'
            placeholder='Con descuento'
            autoComplete='off'
            id='tipo'
            name='tipo'
            onChange={ handleChange }
            value={ tipo }
          />
        </div>
      </div>       
    </form>
  )
}
