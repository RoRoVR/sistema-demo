import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AlertNotification } from "../../components/AlertNotification";
import { eliminarDocumentoFirebase } from "../../slices/productosThunk";

export const ConfiguracionItemCategorias = ({ id, nombre }) => {
    const [alertNotification, setAlertNotification] = useState(false);
    const dispatch = useDispatch();
    const { actualizandoDatos } = useSelector(s => s.productos);
    

    const eliminarDocumento = ()=>{
        dispatch( eliminarDocumentoFirebase(`/aplicaciones/productos/categorias/${id}`, id));
    }
  return (
    <>
        {alertNotification&& <AlertNotification
        alertNotification={alertNotification}
        setAlertNotification={setAlertNotification}
        titulo={'eliminar marca'}
        mensaje={`Estas a punto de eliminar la categoria ${nombre.toUpperCase()} ¿Deseas continuar?`}
        funcion={eliminarDocumento}

        />}
        <li className='list-group-item d-flex align-items-center' >

            <div className="d-flex flex-column" >
                <span>{nombre.toUpperCase()}</span>   
            </div>
            <button 
            className="btn-icon-danger ms-auto"
            onClick={() => { setAlertNotification(!alertNotification) } }
            disabled={ actualizandoDatos }
            >
                {
                    actualizandoDatos ? 
                    <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    :
                    <i className="bi bi-trash-fill"></i>
                }                                                   
            </button>
        </li>
    </>
  )
}
