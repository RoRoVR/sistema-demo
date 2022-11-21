import { useState } from 'react';
import { ListaProveedoresMin } from '../windows/ListaProveedoresMin';
import { generarFechaHoraISOS } from '../../../../helpers/dateConfig';

export const FormNuevoPedido = ({handleInputChangeObj, proveedor, valueManual, handleInputChange, formValues, listDelete, listItems, setListItems, inputFecha, date}) => {
    const [listaProveedoresMin, setListaProveedoresMin] = useState(false);

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

    {listaProveedoresMin&& 
    <ListaProveedoresMin
    listaProveedoresMin={listaProveedoresMin}
    setListaProveedoresMin={setListaProveedoresMin}
    valueManual={valueManual}
    />
    }


    <div className="row mb-3">
        <div className="col text-start">
            <label className='fw-bold'  htmlFor="proveedor"> Proveedor: </label>
            <span 
            className='ms-3 btn-text' 
            onClick={()=>{setListaProveedoresMin(!listaProveedoresMin)}}
            >Agregar de lista...</span>
            <input 
                type="text" 
                className='form-control py-1'
                placeholder='Nombre del proveedor y/o empresa...'
                autoComplete='off'
                id='proveedor'
                name='proveedor'
                onChange={handleInputChangeObj}
                value={proveedor}
                required
            />
        </div>
        <div className="col-3 text-start">
            <label className='fw-bold' htmlFor="fecha"> Fecha: </label>
            <input 
                type="datetime-local" 
                className='form-control py-1'
                placeholder='Hernesto Campos'
                autoComplete='off'
                defaultValue={ generarFechaHoraISOS(date) }
                id='fecha'
                name='fecha'
                ref={inputFecha}
                required
            />
        </div>
    </div>

    <div className="row px-2 mb-2">
        <div className="col px-1 fw-bold text-start">
            DESCRIPCION
        </div>
        <div className="col-2 px-1 fw-bold text-start">
            MARCA
        </div>
        <div className="col-2 px-1 fw-bold text-start">
            MODELO
        </div>
        <div className="col-2 px-1 fw-bold text-start">
            CANTIDAD
        </div>
        <div style={{ width: '30px' }}>
            {/* NO BORRAR */}
            {/* ESPACIO DEL BOTON ELIMINAR */}
        </div>
    </div>

    {formValues.map((obj, index)=>(
        <div key={index} className="row mb-2 px-2">
            <div className="col px-1">
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
            
            <div className="col-2 px-1">
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

            <div className="col-2 px-1">
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
