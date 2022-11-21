import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { objetoMinusculas } from '../../../helpers/textConfig';
import { guardarDocumentoFireBase } from '../slices/productosThunk';
import { FormMedidas } from "../formularios/FormMedidas"
import { useState } from 'react';


export const RegistrarMedidas = ({ nuevaMedida, setNuevaMedida }) => {

    const [errorNombre, setErrorNombre] = useState(false);
    const dispatch = useDispatch(); 
    const {actualizandoDatos, actualizacionExitosa } = useSelector( s => s.productos);
    
    const formulario = useFormik({
        initialValues : {
            nombre:'',
        },
        onSubmit : ( values ) => {
            if( values.nombre.length > 3 ){
                setErrorNombre(true);
            }else{
                setErrorNombre(false);
                const valuesMin = objetoMinusculas(values);
                const ubicacion = '/aplicaciones/productos/medidas';
                dispatch( guardarDocumentoFireBase( ubicacion, valuesMin ) );
            }
        }
    });

  return (
    <div className="window">
        <form className="window-container-md" onSubmit={ formulario.handleSubmit }>
            <div className="window-head">
                <span>REGISTRAR NUEVA MEDIDA</span>
                <div className="btn-exit" onClick={ () => { setNuevaMedida(!nuevaMedida) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body" >
                <FormMedidas
                    handleSubmit ={ formulario.handleSubmit }
                    handleChange = { formulario.handleChange }
                    nombre = { formulario.values.nombre }
                    errorNombre = {errorNombre}
                />
            </div>

            <div className="window-footer" >
                <button type='submit' className="btn btn-success me-2" disabled={actualizandoDatos} >
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
                <div className="btn btn-danger" onClick={() => { setNuevaMedida(!nuevaMedida) }} >Cancelar</div>
            </div>

        </form>
    </div>    
  )
}
