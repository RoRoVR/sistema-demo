import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useFormList } from '../../../hooks/useFormList';
import { ProductosCotizaciones } from '../windows/ProductosCotizaciones';
import { useForm } from '../../../hooks/useForm';
// import { generarIndiceNuevaCompra, guardarDocumentoFireBase } from '../../slices/comprasThunk';
import { generarIndiceNuevaCotizacion, guardarDocumentoVentas } from '../slices/ventasThunk';
import { FormNuevaCotizacion } from '../components/FormNuevaCotizacion';
import { cuatroDecimales, unDecimal } from '../../../helpers/numConfig';
import { generarIndiceCotizacion } from '../slices/ventasSlice';

export const NuevaCotizacion = ({setNuevaCotizacion}) => {

        // pedido = { fecha:'date.toISOString().split('T')[0]', proveedor:'', items:[{cantidad:'',id:'', marca:'', modelo:'', nombre:''}] }

        const dispatch = useDispatch();
        const [sinItems, setSinItems] = useState(false); 
        const {cargo, nombre, contacto} = useSelector(s => s.login); 
        const {indiceCotizacion} = useSelector(s => s.ventas); 
        const inputFecha = useRef();  

        useEffect(() => {
            dispatch( generarIndiceNuevaCotizacion() );
        }, [])
    
        const { items } = useSelector(s => s.productos);
        const initialValues = [{nombre:'', marca:'', modelo:'', cantidad: '', precio:'', id: Date.now()}];
    
        const { actualizandoDatos, actualizacionExitosa } = useSelector(s => s.ventas);
        const [listItems, setListItems] = useState(items.map(i => {
            const newItem = {
                id: i.id,
                marca: i.marca.toUpperCase(),
                modelo: i.modelo,
                nombre: i.nombre,
                select: false,
                imgUrl: i.imgUrl,
                cantidad: 1,
                preciosVenta: i.preciosVenta,
            }
            return newItem
        }))
       
        const [productosItems, setProductosItems] = useState(false);
    
        // HOOK PARA OBJETOS
        const formObj = useForm({ cliente: '', contacto: ''});
        const [ valuesObj, handleInputChangeObj ] = formObj;
    
        // HOOK PARA LISTAS 
        const formList = useFormList( initialValues );
        const [ formValues, handleInputChange, listAdd, listDelete ] = formList;
    
    
    
        const guardarDocumento = (e) => {
            e.preventDefault();
    
            const newFormValues = formValues.map(v => ({...v, cantidad: parseInt(v.cantidad), precio: cuatroDecimales(parseFloat(v.precio))}));
            const formulario = { ...valuesObj, items: newFormValues };
            const date = new Date(inputFecha.current.value);
    
    
            formulario.total = calcularTotal();
            formulario.numero = indiceCotizacion;
            formulario.vendedor = { nombre, cargo, contacto };
            formulario.fecha = date.getTime();  // Extraemos la fecha en milisegundos
    
    
            const ubicacion = '/ventas/registroCotizaciones/cotizaciones';
    
            if(formulario.items.length === 0){
                cotizacionSinItems();
            }else{
                // console.log( formulario );
                dispatch( guardarDocumentoVentas( ubicacion, formulario ) );
                dispatch( generarIndiceCotizacion( indiceCotizacion + 1 ) );
            }
    
        }
    
        const calcularTotal = () => {
            let total = 0;
            formValues.forEach(({precio, cantidad}) => {
                if( isNaN( parseFloat(precio) ) ) total += 0;
                else total += parseFloat(precio) * parseInt(cantidad) ;
            });
            return ( isNaN(unDecimal(total))? 0 : unDecimal(total) );
        }
        const cotizacionSinItems = () => {
            setSinItems( true );
    
            setTimeout(()=>{
                setSinItems( false );
            }, 5000);
        }

  return (
    <div className="window">
        {/* VENTANAS */}
        { productosItems&& 
        <ProductosCotizaciones 
        productosItems={productosItems} 
        setProductosItems={setProductosItems} 
        listItems={listItems}
        listDelete={listDelete}
        setListItems={setListItems}
        listAdd={listAdd}
         />}
        <div className="window-container">
            <div className="window-head">
                <span>COTIZACION Nº {indiceCotizacion}</span>
                <div className="btn-exit" onClick={ () => { setNuevaCotizacion(s => !s) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>
            <div className="window-body">
                <form className="container-fluid" onSubmit={guardarDocumento} > 
                    <FormNuevaCotizacion
                    handleInputChangeObj = {handleInputChangeObj}
                    cliente ={valuesObj.cliente}
                    contacto ={valuesObj.contacto}
                    inputFecha={inputFecha}

                    handleInputChange={handleInputChange}
                    formValues={formValues}
                    listDelete={listDelete}

                    listItems={listItems}
                    setListItems={setListItems}
                    />
                    <div className="row pb-1">
                        <div className="col-3 text-start">
                            <span className='btn-text' onClick={()=>{listAdd({nombre:'', marca:'', modelo:'', cantidad: '', precio:'', id: Date.now()})}} >Espacio en blanco...</span>
                        </div>
                        <div className="col-3 text-start">
                            <span className='btn-text' onClick={()=>{setProductosItems(!productosItems)}} >Agregar item...</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-end">

                            <h4>Total: <span className="badge bg-primary">Bs. {calcularTotal()}</span> </h4>                            
                        </div>
                    </div>

                    <div className="row border-top pt-2">
                        <div className="col d-flex flex-row-reverse">

                            <button type='submit' className='btn btn-success' disabled={actualizandoDatos} >
                            { actualizandoDatos &&
                            <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            }
                            { actualizacionExitosa &&
                                    <i className="bi bi-check-circle-fill me-2"></i>
                            }
                                Guardar cotización
                            </button>

                            {sinItems &&
                            <span  className='mx-2 fw-bold text-danger' >No se encontraron items</span>}

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
