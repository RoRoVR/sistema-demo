import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { objetoMinusculas } from '../../../helpers/textConfig';
import { guardarDocumentoFireBase } from '../slices/productosThunk';
import { FormPrecios } from '../formularios/FormPrecios'

export const RegistrarPrecios = ({nuevoPrecio, setNuevoPrecio}) => {

    const dispatch = useDispatch(); 
    const {actualizandoDatos, actualizacionExitosa } = useSelector( s => s.productos );
    
    const formulario = useFormik({
        initialValues : {
            tipo:'',
        },
        onSubmit : ( values ) => {
            const valuesMin = objetoMinusculas(values);
            const ubicacion = '/aplicaciones/productos/precios';
            dispatch( guardarDocumentoFireBase( ubicacion, valuesMin ) );
        }
    });

  return (
    <div className="window">
        <div className="window-container-sm">
            <div className="window-head">
                <span>REGISTRAR NUEVO PRECIO</span>
                <div className="btn-exit" onClick={ () => { setNuevoPrecio(!nuevoPrecio) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body" >
                <FormPrecios
                    handleSubmit ={ formulario.handleSubmit }
                    handleChange = { formulario.handleChange }
                    tipo = { formulario.values.tipo }
                />
            </div>

            <div className="window-footer" >
                <button type='submit' className="btn btn-success me-2" onClick={ formulario.handleSubmit } disabled={actualizandoDatos} >
                    { actualizandoDatos &&
                        <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                    { actualizacionExitosa &&
                            <i className="bi bi-check-circle-fill me-2"></i>
                    }
                    Guardar
                </button>
                <div className="btn btn-danger" onClick={() => { setNuevoPrecio(!nuevoPrecio) }} >Cancelar</div>
            </div>

        </div>
    </div>  
  )
}
