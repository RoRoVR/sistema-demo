import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { objetoMinusculas } from '../../../helpers/textConfig';
import { guardarDocumentoFireBase } from '../slices/productosThunk';
import { FormMarcas } from '../formularios/FormMarcas';
import { useState } from 'react';

export const RegistrarMarcas = ({ nuevaMarca, setNuevaMarca }) => {

    const [errorNombre, setErrorNombre] = useState(false);
    const dispatch = useDispatch();
    const {actualizandoDatos, actualizacionExitosa } = useSelector( s => s.productos );

    const formulario = useFormik({
        initialValues : {
            nombre:'',
            procedencia:''
        },
        onSubmit : ( values ) => {
            if( values.nombre.length > 10 ){
                setErrorNombre(true);
            }else{
                setErrorNombre(false);
                const valuesMin = objetoMinusculas(values);
                const ubicacion = '/aplicaciones/productos/marcas';
                // console.log( values );
                dispatch( guardarDocumentoFireBase( ubicacion, valuesMin ) );
            }
        }
    });

  return (
    <div className="window">
        <form className="window-container-md" onSubmit={ formulario.handleSubmit }>
            <div className="window-head">
                <span>REGISTRAR NUEVA MARCA</span>
                <div className="btn-exit" onClick={ () => { setNuevaMarca(!nuevaMarca) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body" >
                <FormMarcas 
                    handleSubmit ={ formulario.handleSubmit }
                    handleChange = { formulario.handleChange }
                    nombre = { formulario.values.nombre }
                    procedencia = { formulario.values.procedencia }
                    errorNombre={errorNombre}
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
                <div className="btn btn-danger" onClick={() => { setNuevaMarca(!nuevaMarca) }} >
                    Cancelar
                </div>
            </div>

        </form>
    </div>
  )
}
