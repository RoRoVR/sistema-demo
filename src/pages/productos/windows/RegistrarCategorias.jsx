import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { objetoMinusculas } from '../../../helpers/textConfig';
import { guardarDocumentoFireBase } from '../slices/productosThunk';
import { FormCategorias } from '../formularios/FormCategorias'

export const RegistrarCategorias = ({nuevaCategoria, setNuevaCategoria}) => {
    const dispatch = useDispatch(); 
    const {actualizandoDatos, actualizacionExitosa } = useSelector( s => s.productos );
    
    const formulario = useFormik({
        initialValues : {
            nombre:'',
        },
        onSubmit : ( values ) => {
            const valuesMin = objetoMinusculas(values);
            const ubicacion = '/aplicaciones/productos/categorias';
            dispatch( guardarDocumentoFireBase( ubicacion, valuesMin ) );
        }
    });

  return (
    <div className="window">
        <div className="window-container-md">
            <div className="window-head">
                <span>REGISTRAR NUEVA CATEGORIA</span>
                <div className="btn-exit" onClick={ () => { setNuevaCategoria(!nuevaCategoria) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body" >
                <FormCategorias
                    handleSubmit ={ formulario.handleSubmit }
                    handleChange = { formulario.handleChange }
                    nombre = { formulario.values.nombre }
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
                <div className="btn btn-danger" onClick={() => { setNuevaCategoria(!nuevaCategoria) }} >Cancelar</div>
            </div>

        </div>
    </div>
  )
}
