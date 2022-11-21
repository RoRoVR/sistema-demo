import React from 'react';
import { generarFechaAMD, generarFechaHoraISOS } from '../../../helpers/dateConfig';
import { unDecimal } from '../../../helpers/numConfig';

export const FormNuevaCotizacion = ({handleInputChangeObj, cliente, contacto, handleInputChange, formValues, listDelete, listItems, setListItems, inputFecha}) => {

    const eliminarEspacio = (index, id) => {
        listDelete(index, id);
        const newListItems = listItems.map(i => {
            if(i.id === id) i.select = false;
            return i
        });
        setListItems(newListItems);
    }

  return (
    <>
    <div className="row mb-3">
        <div className="col text-start">
            <label className='fw-bold'  htmlFor="cliente"> Cliente: </label>
            <input 
                type="text" 
                className='form-control py-1'
                placeholder='Nombre del cliente'
                autoComplete='off'
                id='cliente'
                name='cliente'
                onChange={handleInputChangeObj}
                value={cliente}
                required
            />
        </div>
        <div className="col-3 text-start">
            <label className='fw-bold'  htmlFor="contacto"> Contacto: </label>
            <input 
                type="number" 
                className='form-control py-1'
                placeholder='Número de contacto'
                autoComplete='off'
                id='contacto'
                name='contacto'
                onChange={handleInputChangeObj}
                value={contacto}
            />
        </div>

        <div className="col-3 text-start">
            <label className='fw-bold' htmlFor="fecha"> Fecha: </label>
            <input 
                type="datetime-local" 
                className='form-control py-1'
                autoComplete='off'
                id='fecha'
                name='fecha'
                defaultValue={ generarFechaHoraISOS(Date.now()) }
                ref={inputFecha}
            />
        </div>
    </div>

    <div className="row px-2 mb-2">
        <div className="col-5 px-1 fw-bold text-start">
            DESCRIPCION
        </div>
        <div className="col-2 px-1 fw-bold text-start">
            MARCA
        </div>
        <div className="col px-1 fw-bold text-start">
            MODELO
        </div>
        <div className="col px-1 fw-bold text-start">
            CANTIDAD
        </div>
        <div className="col px-1 fw-bold text-start">
            P UNIT.
        </div>
        <div className="col px-1 fw-bold text-start">
            SUBTOTAL
        </div>
        <div style={{ width: '30px' }}>
            {/* NO BORRAR */}
            {/* ESPACIO DEL BOTON ELIMINAR */}
        </div>
    </div>

    {formValues.map((obj, index)=>(
        <div key={index} className="row mb-2 px-2">
            <div className="col-5 px-1">
                <input 
                className='form-control py-1' 
                type="text" 
                autoComplete='off'
                placeholder='Descripcion...'
                name= {`nombre_${index}`}
                onChange={handleInputChange}
                value={obj.nombre}
                required
                />
            </div>

            <div className="col-2 px-1">
                <input 
                className='form-control py-1' 
                type="text" 
                autoComplete='off'
                placeholder='Marca...'
                name= {`marca_${index}`}
                onChange={handleInputChange}
                value={obj.marca}
                />
            </div>
            
            <div className="col px-1">
                <input 
                className='form-control py-1' 
                type="text" 
                autoComplete='off'
                placeholder='Modelo...'
                name= {`modelo_${index}`}
                onChange={handleInputChange}
                value={obj.modelo}
                />
            </div>

            <div className="col px-1">
                <input 
                className='form-control py-1' 
                type="number" 
                autoComplete='off'
                placeholder='Cantidad...'
                name= {`cantidad_${index}`}
                onChange={handleInputChange}
                value={obj.cantidad}
                required
                />
            </div>

            <div className="col px-1">
                <input 
                className='form-control py-1' 
                type="number"  
                step="0.0001"             
                autoComplete='off'
                placeholder='Precio...'
                name= {`precio_${index}`}
                onChange={handleInputChange}
                value={obj.precio}
                required
                />
            </div>
            <div className="col px-1">
                <p className=' text-end fw-bold m-0 ' > { unDecimal(obj.cantidad * obj.precio) } Bs. </p>
            </div>

            <div 
            className="col-1 btn-icon-danger"
            onClick={()=>{eliminarEspacio(index, obj.id)}}
            >
                <i className="bi bi-trash-fill"></i>
            </div>
        </div>
    ))}


    </>
  )
}
