import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { objetoMinusculas, upperCamelCase } from '../../../../helpers/textConfig';
import { FormEditarProveedor } from '../../formularios/editar/FormEditarProveedor';
import { editarDocumentoCompras } from '../../slices/comprasThunk';

export const EditarProveedor = ({editarProveedor, setEditarProveedor, id, nombre, encargado, nit, ciudad, direccion, contacto}) => {

    const dispatch = useDispatch();
    const {actualizandoDatos, actualizacionExitosa } = useSelector( s => s.compras);   

    const formulario = useFormik({
        initialValues : {
            nombre: upperCamelCase(nombre),
            encargado: upperCamelCase(encargado),
            nit,
            ciudad: upperCamelCase(ciudad),
            direccion: upperCamelCase(direccion),
            contacto,
        },
        onSubmit : ( values ) => {
            const valuesMin = objetoMinusculas(values);
            dispatch( editarDocumentoCompras( `/aplicaciones/compras/proveedores/${id}`, valuesMin ) );
        }
    });


  return (
    <div className="window">

        <div className="window-container-sm">
            <div className="window-head">
                <span>EDITAR PROVEEDOR</span>
                <div className="btn-exit" onClick={ () => { setEditarProveedor(!editarProveedor) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body" >
                <FormEditarProveedor
                handleSubmit = { formulario.handleSubmit }
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
                <div className="btn btn-danger" onClick={() => { setEditarProveedor(!editarProveedor) }} >Cancelar</div>
            </div>

        </div>
    </div>
  )
}
