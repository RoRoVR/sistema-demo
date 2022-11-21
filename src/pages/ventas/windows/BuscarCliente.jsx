import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { obtenerColeccionClientes } from '../slices/ventasThunk';
import { NuevoCliente } from './NuevoCliente';
import { clienteEncontrado, resetBusquedaCliente } from '../slices/ventasSlice';

export const BuscarCliente = ({setBuscarCliente}) => {   

    const [nuevoCliente, setNuevoCliente] = useState(false);
    const dispatch = useDispatch();
    const { registroClientes, busquedaCliente, actualizandoDatos } = useSelector(s => s.ventas );
    const { cliente } = busquedaCliente;

    useEffect(() => {
        dispatch( obtenerColeccionClientes() );
    }, [])

    const formulario = useFormik({
        initialValues: {
            nombre: ''
        }
    });

    //ITEMS FILTRADOS
  const showRegistroClientes = registroClientes.filter(c => c.nombre.toLowerCase().includes(formulario.values.nombre.trim().toLowerCase()) );

    const seleccionarCliente = (datos) => {
        dispatch( clienteEncontrado(datos) );
    }

  return (
    <div className='window' >
        {/* VENTANAS */}
        {nuevoCliente&&
            <NuevoCliente setNuevoCliente={setNuevoCliente} />
        }
        <div className="window-container-md" >
            <div className="window-head">
                <span>BUSCADOR DE CLIENTES</span>
                <div className="btn-exit" onClick={ () => {
                    dispatch( resetBusquedaCliente() );
                    setBuscarCliente(s => !s);
                    } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className='col-7'>
                            <div className="d-flex align-items-center">
                                <label htmlFor="nombre"> Nombre de cliente: </label>
                                <span 
                                className='text-primary ms-3'
                                onClick={() => { 
                                    setNuevoCliente( s => !s );
                                    dispatch( resetBusquedaCliente() ); 
                                }}
                                style={{ cursor:'pointer' }}
                                >
                                    Registrar nuevo...
                                </span>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="col me-2">
                                    <input 
                                        type="text" 
                                        className='form-control py-1'
                                        autoComplete='off'
                                        id='nombre'
                                        name='nombre'
                                        onChange={formulario.handleChange}
                                        value = { formulario.values.nombre }
                                    />
                                </div>
                            </div>

                            <div className="window-body-col my-3">
                                {actualizandoDatos&&
                                    <div className='mb-3 d-flex justify-content-center align-items-center ' >
                                        <div className="spinner-border spinner-border-sm text-secondary">
                                            <span className="visually-hidden">Cargando...</span>
                                        </div>
                                        <span className='text-muted ms-2' >Cargando lista...</span>
                                    </div>
                                }
                                <div className="list-group">
                                    {showRegistroClientes.map((c, index) => (
                                        <button 
                                        key={index} 
                                        type='button' 
                                        className="list-group-item list-group-item-action"
                                        onClick={() => { seleccionarCliente(c) }}
                                        >
                                            <span className='fw-bold'> {index + 1}. </span>{ c.nombre }
                                        </button>
                                    ))

                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-5 pt-4">
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

                                <div className="btn-icon-success mt-2" onClick={() => {setNuevoCliente(!nuevoCliente)}}>
                                    <i className="bi bi-pencil-square"></i>
                                </div>
                            </>
                            :
                            <>
                                <div className="text-start">
                                    <span className='text-muted' >Selecciona un cliente de la lista...</span>
                                </div>
                            </>
                        }
                        </div>
                    </div>
                </div>
            </div>

            <div className="window-footer">
                <div className="btn btn-success" onClick={() => {setBuscarCliente(s => !s)}} >Guardar</div>
            </div>
        </div>
    </div>
  )
}
