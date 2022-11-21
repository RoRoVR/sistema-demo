import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cuatroDecimales } from "../../../helpers/numConfig";
import { useFormList } from "../../../hooks/useFormList";
import { AlertNotification } from "../../compras/components/AlertNotification";
import { editarDocumentoCompras } from "../../compras/slices/comprasThunk";
import { aumentarCantidadCostoItem, editarDocumentoProductos } from "../../productos/slices/productosThunk";
import { FormRevisarTarea } from "../formularios/FormRevisarTarea";
import { obtenerTareasPendientesAlmecen } from "../slices/almacenThunk";

export const RevisarTareaPendiente = ( { revisarItem, setRevisarItem, item } ) => {
    // HOOK PARA LISTAS 
    const formList = useFormList( item.items );
    const date = new Date(item.fecha);
    const refDetalle = useRef();
    const dispatch = useDispatch();
    const [alertNotification, setAlertNotification] = useState(false)

    const { actualizandoDatos, actualizacionExitosa } = useSelector(s => s.compras);
    const { cargo, nombre } = useSelector(s => s.login); //Usuario actual
    if( actualizacionExitosa ){
        setTimeout(()=>{
            setRevisarItem(false);
            dispatch( obtenerTareasPendientesAlmecen() );
        },1000);
    }

    const { items } = useSelector(s => s.productos);

    const [ formValues, handleInputChange ] = formList;
  
    const guardarRevision = () => {

        const ubicacion = `/aplicaciones/compras/compras/${item.id}`;
        const intFormValues = formValues.map( i => ({...i, cantidadResivida: parseInt(i.cantidadResivida)})); // Convierte la cantidad resivida a enteros
        const date = Date.now();
        const newItems = {...item, items:intFormValues, fechaRecibido: date, usuarioRecibido:{cargo, nombre}, detalle: refDetalle.current.value};
        newItems.estado = revisarEstado( intFormValues );
        // console.log( newItems );
        actualizarDatosProductos(intFormValues);
        dispatch( editarDocumentoCompras( ubicacion, newItems ) );
    }

    const actualizarDatosProductos = (newItems) => {
        newItems.forEach(newItem => {
            for (let i = 0; i < items.length; i++) {
                if( newItem.id === items[i].id ){
                    const ubicacion = `/aplicaciones/productos/items/${items[i].id}`;
                     dispatch( aumentarCantidadCostoItem( ubicacion, items[i], newItem) );
                    // dispatch( editarDocumentoProductos( ubicacion, newProducto ) );
                    break;
                }
            }
        });
    }

    const revisarEstado = ( items ) => {
        let estado = "success";
        for (let i = 0; i < items.length; i++) {
            if(items[i].cantidad !== items[i].cantidadResivida){
                estado = "warning";
                break;
            }
        }
        return estado;
    }

  return (
    <div className="window" >
        <form className="window-container" onSubmit={(e) => {
            e.preventDefault();
            setAlertNotification(!alertNotification);
            }} >
            {/* VENTANAS */}
            {alertNotification&&
            <AlertNotification
            alertNotification={alertNotification} 
            setAlertNotification={setAlertNotification} 
            titulo='Terminar revisión de compra' 
            mensaje='Ten en cuenta que la revisión de 
            la compra modificara precios y cantidades 
            de los ítems. Además, ya no podrás modificar 
            esta revisión. ¿Deseas continuar?'
            funcion={guardarRevision}
            />
            }


            <div className="window-head">
                <span> COMPRA Nº{item.numero} DE { date.toISOString().split('T')[0] } A { item.proveedor } </span>
                <div className="btn-exit" onClick={ () => { setRevisarItem(!revisarItem) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body">
                <FormRevisarTarea
                formValues={formValues}
                handleInputChange={handleInputChange}
                refDetalle={refDetalle}
                />

            </div>

            <div className="window-footer">
                <button type="submit" className="btn btn-success ">
                    {actualizandoDatos&&
                        <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                    { actualizacionExitosa&&
                        <i className="bi bi-check-circle-fill me-2"></i>
                    }
                    Guardar
                </button>   
            </div>
        </form>
    </div>
  )
}
