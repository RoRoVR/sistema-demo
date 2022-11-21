import { useFormik } from 'formik';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { upperCamelCase } from '../../../helpers/textConfig';
import { unDecimal } from '../../../helpers/numConfig';
import { disminuirCantidadItem } from '../../productos/slices/productosThunk';
import { guardarDocumentoReportes } from '../../reportes/slices/reportesThunk';
import { BuscadorClientes } from '../components/BuscadorClientes';
import { ItemListCompras } from '../components/ItemListCompras';
import { editarConfiguracion, generarIndiceVenta, resetBusquedaCliente } from '../slices/ventasSlice';
import { generarIndiceNuevaVenta, guardarDocumentoVentas, obtenerColeccionVentas, refrescarColeccionVentas } from '../slices/ventasThunk';
import { generarFechaHoraISOS } from '../../../helpers/dateConfig';
import { AlertNotification } from '../components/AlertNotification';
import { DetallesVenta } from './DetallesVenta';

export const NuevaVenta = ({ setNuevaVenta, listCompras, listComprasReset, handleInputChange, handleInputChangeManual, quitarItem, setDatosCompra, setDetallesVenta }) => {

    const dispatch = useDispatch();
    const { precios } = useSelector( s => s.productos );
    const { configuracion } = useSelector( s => s.ventas );
    const precioBase = useRef();

    useEffect(() => {
        dispatch( refrescarColeccionVentas() );
        dispatch( generarIndiceNuevaVenta() );
    }, [])
    
    const { busquedaCliente, indiceVenta, actualizandoDatos, actualizacionExitosa } = useSelector(s => s.ventas);
    const { cliente } = busquedaCliente;
    const { nombre, cargo, contacto, uid } = useSelector(s => s.login);
    const [errorDatosCliente, setErrorDatosCliente] = useState(false);
    const [errorCantidad, setErrorCantidad] = useState(false);
    const [alertNotification, setAlertNotification] = useState(false);

    const formulario = useFormik({
        initialValues: {
            tipoPago: 'efectivo',
            fecha: generarFechaHoraISOS( Date.now() ),
            descripcion:''
        },
        onSubmit: () => {
            if( cliente.codigo ){
                setErrorDatosCliente(false);
                let cantSuccess = true;

                // Revisamos por segunda ves si existe la cantidad
                for (let i = 0; i < listCompras.length; i++) {
                    if( listCompras[i].cantidad - listCompras[i].cantVenta < 0 ){
                        cantSuccess = false;
                        break;
                    } 
                }

                if( cantSuccess ){ // Las cantidades son buenas
                    // guardarNuevaVenta();
                    setAlertNotification(!alertNotification);
                }else{
                    setErrorCantidad(true);
                }
            }else{
                setErrorDatosCliente(true);
                setErrorCantidad(false);
            }
        }
    });

    const guardarNuevaVenta = () => {
        setErrorCantidad(false);
        const {values} = formulario;
        const date = new Date(values.fecha);
        let pagos = [];
        if( values.tipoPago === 'efectivo' ){
            const pagoRealizado = {
                detalle: values.descripcion,
                fecha: date.getTime(),
                monto: generarTotal(),
                usuario:{
                    nombre,
                    uid                              
                }
            }
            pagos = [pagoRealizado];
        }

        
        const newDatosCompra = {
            vendedor:{
                nombre,
                cargo, 
                contacto,                               
            },
            numero: indiceVenta,
            fecha: date.getTime(), 
            items: listCompras,
            cliente,
            idCliente: cliente.codigo,
            precioBase: `${ precioBase.current.value }`,
            pagos,
            tipoPago: values.tipoPago,
            total: generarTotal(),
        };

        setDatosCompra( newDatosCompra );
        const ubicacionVentas = '/ventas/registroVentas/ventas';
        // console.log( datosCompra );

        dispatch( generarIndiceVenta( indiceVenta + 1 ) );
        disminuirCantidadItemsVendidos();
        dispatch( guardarDocumentoVentas( ubicacionVentas, newDatosCompra ) );
        setTimeout(() => {
            dispatch( obtenerColeccionVentas());
            dispatch( resetBusquedaCliente() );
            setDetallesVenta(s => !s);
            setNuevaVenta(s => !s);
        }, 1500);
        listComprasReset();
    }

    const cambiarPrecio = ({target}) => {
        listCompras.forEach((c, index) => {
            const newPrecio = c.preciosVenta.find( p => p.tipo === target.value);

            handleInputChangeManual( 'precioVenta', index, newPrecio.precio );
        });
        dispatch( editarConfiguracion( {precioBase: target.value} ) );
      }

    const disminuirCantidadItemsVendidos = () => {
        listCompras.forEach(item => {
            const ubicacion = `/aplicaciones/productos/items/${ item.id }`; 
            dispatch( disminuirCantidadItem( ubicacion, item ) );
        });

    }
    
    const generarTotal = () => {
        let total = 0;
        listCompras.forEach(c => {
            total += (c.cantVenta * c.precioVenta)           
        });
        return unDecimal(total)
    }

    const salirNuevaVenta = () => {
        dispatch( resetBusquedaCliente() );
        setNuevaVenta(s => !s);
    }

  return (
    <div className='window'>
        <div className="window-container">
            {/* VENTANAS */}
            {alertNotification&&
            <AlertNotification
            setAlertNotification={setAlertNotification}
            alertNotification={alertNotification}
            titulo={`RESUMEN DE VENTA Nº${ indiceVenta }`}
            mensaje={
                <div className='text-start' >
                    <p className='m-0' > <span className='fw-bold' >Cliente:</span> {  upperCamelCase(cliente.nombre) }</p>
                    <p className='m-0' > <span className='fw-bold' >Tipo de pago:</span> { upperCamelCase(formulario.values.tipoPago) }</p>
                    <p className='m-0' > <span className='fw-bold' >Precio base:</span> { upperCamelCase(precioBase.current.value) }</p>
                    <p className='m-0' > <span className='fw-bold' >Cantidad de items:</span> { listCompras.length }</p>
                </div>
            }
            funcion={guardarNuevaVenta}
            />
            }

            <div className="window-head">
                <span>REGISTRAR VENTA Nº{indiceVenta}</span>
                <div className="btn-exit" onClick={salirNuevaVenta} >
                    <i className="bi bi-x"></i>
                </div>
            </div>
            <div className="window-body">
                <div className="container">
                    <div className="row mb-2">
                        <div className="col-6">
                            <BuscadorClientes/>
                        </div>
                        <div className="col-6 d-flex">
                            <form className="row" onSubmit={formulario.handleSubmit}>
                                <div className="col-4 pe-5">
                                    <label htmlFor="tipoPago">Tipo de pago</label>
                                    <select 
                                    id='tipoPago'
                                    className='form-select form-select-sm'
                                    name = 'tipoPago'
                                    onChange={formulario.handleChange}
                                    value={formulario.values.tipoPago}
                                    >
                                        <option value="efectivo">Efectivo</option>
                                        <option value="credito">Credito</option>
                                    </select>  
                                </div>
                                <div className="col-4 pe-5">
                                    <label htmlFor="precioBase">Precio base</label>
                                    <div className="col">
                                        <select 
                                        className="form-select form-select-sm"
                                        id='precioBase'
                                        name='precioBase'
                                        ref={precioBase}
                                        onChange={ cambiarPrecio }
                                        value={ configuracion.precioBase }
                                        >
                                            {
                                            precios.map( p => (
                                                <option key={p.id} value={p.tipo}>{ upperCamelCase( p.tipo )}</option>
                                            ) )
                                            }

                                        </select>         
                                    </div>  
                                </div>
                                <div className="col-4">
                                    <label htmlFor="fecha">Fecha</label>
                                    <input 
                                    type='datetime-local'
                                    className='form-control form-control-sm'
                                    id='fecha'
                                    name = 'fecha'
                                    onChange={formulario.handleChange}
                                    value={formulario.values.fecha}
                                    required

                                    />
                                </div>
                                {(formulario.values.tipoPago === 'efectivo')&&
                                <>
                                    <div className="col-12">
                                        <label htmlFor="descripcion">Descripcion</label>
                                        <input 
                                        type='text'
                                        className='form-control form-control-sm'
                                        id='descripcion'
                                        name='descripcion'
                                        onChange={formulario.handleChange}
                                        value={formulario.values.descripcion}
                                        />
                                    </div>
                                    <div className="col-12 mt-2">
                                        <h5 className='fw-bold'>TOTAL A COBRAR: {generarTotal()} Bs.</h5>
                                    </div>
                                </>
                                }
                                <div className="col-12">
                                <button type='submit' className='btn btn-success'>
                                    { actualizandoDatos &&
                                    <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    }
                                    { actualizacionExitosa &&
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                    }
                                        VENDER
                                </button>
                                    { errorDatosCliente&& <span className='text-danger ms-3' > Se requieren los datos del cliente </span>}
                                    { errorCantidad&& <span className='text-danger ms-2'> Cantidades muy altas. Revise los ítems.</span>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <table className="table table-hover" >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Marca</th>
                            <th scope="col">Medida</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">P/Base</th>
                            <th scope="col">P/Unit</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider" >
                        {listCompras.map((c, index) => (
                            <ItemListCompras 
                            key={index} 
                            c={c} 
                            index={index} 
                            handleInputChange={handleInputChange} 
                            quitarItem = {quitarItem} />
                        ))
                        }
                        <tr className='fw-bold h5' >
                            <td colSpan='8' className='text-end' >TOTAL</td>
                            <td colSpan='2' className='text-start'>
                             {generarTotal()}Bs.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
