import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { objetoMinusculas } from '../../../../helpers/textConfig';
import { FormProveedor } from '../../formularios/FormProveedor'
import { guardarDocumentoFireBase } from '../../slices/comprasThunk';

export const RegistrarProveedor = ({ resgistrarProveedor, setResgistrarProveedor }) => {

    const dispatch = useDispatch();
    const {actualizandoDatos, actualizacionExitosa } = useSelector( s => s.compras);

    const formulario = useFormik({
        initialValues : {
            nombre:'',
            encargado:'',
            nit:'',
            ciudad:'',
            direccion:'',
            contacto:'',
        },
        onSubmit : ( values ) => {
            const valuesMin = objetoMinusculas(values);
            const ubicacion = '/aplicaciones/compras/proveedores';
            dispatch( guardarDocumentoFireBase( ubicacion, valuesMin ) );
        }
    });

  return (
    <div className="window">
        <div className="window-container-sm">
            <div className="window-head">
                <span>REGISTRAR NUEVO PROVEEDOR</span>
                <div className="btn-exit" onClick={ () => { setResgistrarProveedor(!resgistrarProveedor) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body" >
                <FormProveedor
                    handleSubmit ={ formulario.handleSubmit }
                    handleChange = { formulario.handleChange }
                    nombre = { formulario.values.nombre }
                    encargado = { formulario.values.encargado }
                    nit={ formulario.values.nit }
                    ciudad = { formulario.values.ciudad }
                    direccion = { formulario.values.direccion }
                    contacto = { formulario.values.contacto }
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
                <div className="btn btn-danger" onClick={() => { setResgistrarProveedor(!resgistrarProveedor) }} >Cancelar</div>
            </div>

        </div>
    </div>
  )
}
