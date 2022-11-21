import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { buscarClienteVentas} from '../slices/ventasThunk';
import { NuevoCliente } from '../windows/NuevoCliente';
import { useState } from 'react';
import { BuscarCliente } from '../windows/BuscarCliente';


export const BuscadorClientes = () => {
    const dispatch = useDispatch();
    const { busquedaCliente, actualizandoDatos } = useSelector(s => s.ventas );
    const { cliente, message } = busquedaCliente;
    const [nuevoCliente, setNuevoCliente] = useState(false);
    const [buscarCliente, setBuscarCliente] = useState(false);

    const formulario = useFormik({
        initialValues : {
            codigo:'',
        },
        onSubmit : ( values ) => {
            dispatch( buscarClienteVentas( values.codigo ) );
        }
    });
  return (
    <div className='col-12'>
        {/* VENTANAS */}
        {nuevoCliente&&
         <NuevoCliente setNuevoCliente={setNuevoCliente} />
        }
        {buscarCliente&&
        <BuscarCliente setBuscarCliente={setBuscarCliente} />
        }

        
        <div className="col-12">
            <span 
            className='text-primary fw-normal' 
            style={{ cursor:'pointer' }}
            onClick={() => { setNuevoCliente(!nuevoCliente) }} 
            > Registrar nuevo cliente...
            </span> 
            <span 
            className='text-primary fw-normal ms-5' 
            style={{ cursor:'pointer' }}
            onClick={() => { setBuscarCliente(!buscarCliente) }} 
            > Buscar cliente...
            </span> 
        </div>
        <form className="col-12 mb-2" onSubmit={ formulario.handleSubmit }>
            <div className='d-flex align-items-center' >
                <div className="col">
                    <label htmlFor="codigo" className='fw-bold' > 
                        Código:
                    </label>
                </div>
                <div className="col-5 ps-3">
                    <input 
                        type="number" 
                        className='form-control py-1 my-2'
                        autoComplete='off'
                        id='codigo'
                        name='codigo'
                        onChange={ formulario.handleChange }
                        value={ formulario.values.codigo }
                        required
                    />
                </div>
                <div className="col-6">
                    <button type='submit' className="btn btn-primary my-2 ms-3 d-flex align-items-center" disabled={actualizandoDatos} >
                        {actualizandoDatos &&
                            <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                        Buscar
                    </button>  
                </div>
            </div>
        </form>

        <div className="col-12">
            {cliente.nombre ? 
                <>
                    <div>
                        <span className='fw-bold' >Nombre: </span>
                        <span >{cliente.nombre}</span>
                    </div>
                    <div>
                        <span className='fw-bold' >CI/Código: </span>
                        <span >{cliente.codigo}</span>
                    </div>
                    <div>
                        <span className='fw-bold' >NIT: </span>
                        <span >{cliente.nit}</span>
                    </div>
                    <div>
                        <span className='fw-bold' >Correo: </span>
                        <span >{cliente.correo}</span>
                    </div>
                    <div>
                        <span className='fw-bold' >Direccion: </span>
                        <span >{cliente.direccion}</span>
                    </div>
                    <div>
                        <span className='fw-bold' >Contacto: </span>
                        <span >{cliente.contacto}</span>
                    </div>
                </>
                :
                
                <>
                    <div className="text-center">
                        <span className='text-danger' >{message}</span>
                    </div>
                    <div className="text-start">
                        <span className='text-muted' >Ingresa el código de cliente o su CI para buscarlo...</span>
                    </div>
                </>
            }
        </div>
    </div>
  )
}
