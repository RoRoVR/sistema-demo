import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { resetBusquedaCliente } from '../slices/ventasSlice';
import { buscarClienteVentas, editarDocumentoVentas, registrarNuevoCliente } from '../slices/ventasThunk';

export const NuevoCliente = ({setNuevoCliente}) => {
    const dispatch = useDispatch();
    const {errorNuevoCliente, actualizandoDatos, actualizacionExitosa, busquedaCliente} = useSelector(s => s.ventas);
    const {cliente} = busquedaCliente;

    const formulario = useFormik({
        initialValues : {
            nombre: cliente.nombre ? cliente.nombre : '',
            codigo:cliente.codigo ? cliente.codigo : '',
            nit:cliente.nit ? cliente.nit : '',
            correo:cliente.correo ? cliente.correo : '',
            direccion:cliente.direccion ? cliente.direccion : '',
            contacto:cliente.contacto ? cliente.contacto : '',
        },
        onSubmit : ( values ) => {
            if( cliente.id ){
                const ubicacion = `/ventas/clientes/clientes/${cliente.id}`;
                console.log('Editando...');
                console.log(values);
                // dispatch( registrarNuevoCliente(ubicacion, values) );
                dispatch( editarDocumentoVentas( ubicacion, values ) );
            }else{
                const ubicacion = '/ventas/clientes/clientes';
                console.log('Registrando');
                console.log(values);
                dispatch( registrarNuevoCliente(ubicacion, values) );
            }
        }
    });


  return (
    <div className='window'>
        <form className="window-container-sm" onSubmit={ formulario.handleSubmit } >
            <div className="window-head">
                <span>{cliente.id ? 'EDITAR CLIENTE':'REGISTRAR NUEVO CLIENTE'}</span>
                <div className="btn-exit" onClick={ () => { setNuevoCliente(s => !s) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body">
                <div className="col-12 mb-2 ">
                    <span className='text-primary'style={{ fontSize:'14px' }} >*Campo obligatorio</span>
                </div>
                <div className='mb-2 col-12' >
                    <label htmlFor="nombre"> Nombre y apellido* </label>
                    <input 
                        type="text" 
                        className='form-control py-1'
                        placeholder='Nombre y apellido del nuevo cliente...'
                        autoComplete='off'
                        id='nombre'
                        name='nombre'
                        onChange={ formulario.handleChange }
                        value={ formulario.values.nombre }
                        required
                    />
                </div>
                {cliente.codigo?
                <div className='mb-2 col-12' >
                    <label htmlFor="codigo">CI* </label>
                    <input 
                        type="number" 
                        className='form-control py-1'
                        placeholder='El CI se usara como codigo de cliente...'
                        autoComplete='off'
                        id='codigo'
                        name='codigo'
                        defaultValue={cliente.codigo}
                        disabled
                    />
                    {errorNuevoCliente&&  <span className='text-danger' >La cedula ya fue registrada.</span>}
                </div>
                :
                <div className='mb-2 col-12' >
                    <label htmlFor="codigo">CI* </label>
                    <input 
                        type="number" 
                        className='form-control py-1'
                        placeholder='El CI se usara como codigo de cliente...'
                        autoComplete='off'
                        id='codigo'
                        name='codigo'
                        onChange={ formulario.handleChange }
                        value={ formulario.values.codigo }
                        required
                    />
                    {errorNuevoCliente&&  <span className='text-danger' >La cedula ya fue registrada.</span>}
                </div>
                }
                <div className='mb-2 col-12'>
                    <label htmlFor="nit">NIT </label>
                    <input 
                        type="number" 
                        className='form-control py-1'
                        placeholder='Nit de cliente si lo tiene...'
                        autoComplete='off'
                        id='nit'
                        name='nit'
                        onChange={ formulario.handleChange }
                        value={ formulario.values.nit }
                    />
                </div>
                <div className='mb-2 col-12' >
                    <label htmlFor="correo">Correo </label>
                    <input 
                        type="email" 
                        className='form-control py-1'
                        placeholder='Correo de contacto si lo tiene...'
                        autoComplete='off'
                        id='correo'
                        name='correo'
                        onChange={ formulario.handleChange }
                        value={ formulario.values.correo }
                    />
                </div>
                <div className='mb-2 col-12' >
                    <label htmlFor="direccion">Direccion </label>
                    <input 
                        type="text" 
                        className='form-control py-1'
                        placeholder='Direccion...'
                        autoComplete='off'
                        id='direccion'
                        name='direccion'
                        onChange={ formulario.handleChange }
                        value={ formulario.values.direccion }
                    />
                </div>
                <div className='mb-2 col-12' >
                    <label htmlFor="contacto">Contacto </label>
                    <input 
                        type="number" 
                        className='form-control py-1'
                        placeholder='Numero de telefono y/o celular...'
                        autoComplete='off'
                        id='contacto'
                        name='contacto'
                        onChange={ formulario.handleChange }
                        value={ formulario.values.contacto }
                    />
                </div>
            </div>
            <div className="window-footer">
                {cliente.codigo ?
                <button type='submit' className="btn btn-success me-2" disabled={actualizandoDatos} >
                    { actualizandoDatos &&
                        <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                    { actualizacionExitosa &&
                            <i className="bi bi-check-circle-fill me-2"></i>
                    }
                    Terminar edición
                </button>
                :
                <button type='submit' className="btn btn-success me-2" disabled={actualizandoDatos} >
                    { actualizandoDatos &&
                        <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                    { actualizacionExitosa &&
                            <i className="bi bi-check-circle-fill me-2"></i>
                    }
                    Registrar
                </button>
                }
            </div>
        </form>
    </div>
  )
}
