import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cuatroDecimales } from "../../../helpers/numConfig";
import { useFormList } from "../../../hooks/useFormList";
import { FormRegistrar } from "../formularios/FormRegistrar";
import { guardarDocumentoConArchivoFireBase, guardarDocumentoFireBase } from "../slices/productosThunk";
import { RegistrarCategorias } from "./RegistrarCategorias";
import { RegistrarMarcas } from "./RegistrarMarcas";
import { RegistrarMedidas } from "./RegistrarMedidas";


export const RegistrarProducto = ({ registrarProducto , setRegistrarProducto  }) => {

    const [errorNombre, setErrorNombre] = useState(false);
    const [errorModelo, setErrorModelo] = useState(false);
    const [habilitado, setHabilitado] = useState(true);

    const [nuevaMarca, setNuevaMarca] = useState(false);
    const [nuevaCategoria, setNuevaCategoria] = useState(false);
    const [nuevaMedida, setNuevaMedida] = useState(false);

    // LOGO DEFAULD
    const [imgUrl, setImgUrl] = useState('https://firebasestorage.googleapis.com/v0/b/soluciones-electricas-tja.appspot.com/o/logos%2FLogo%20Nuevo.png?alt=media&token=b4b2fc18-1752-4ba0-b573-85b314d485f3');

    




    const [inputFile, setInputFile] = useState('');
    const [modeloRepetido, setModeloRepetido] = useState(false);


    const dispatch = useDispatch();
    const { precios, actualizandoDatos, actualizacionExitosa, items } = useSelector( s => s.productos );
    const preciosVenta = precios.map(p => ({tipo: p.tipo, precio: 0}));
    const [formValues, handleInputChange] = useFormList( preciosVenta );
    // console.log( formValues );

    const formulario = useFormik({
        initialValues: {
            nombre:'',
            marca:'',
            modelo:'',
            categoria:'',
            procedencia:'',
            cantidad:0,
            cantidadMinima:0,
            medida:'',
            costo:0,
        },
        onSubmit: (values) => {

            //VERIFICAR CANTIDAD DE CARACTERES
            if( values.nombre.length > 40 ){
                setErrorNombre(true);
            }else if(values.modelo.length > 8){
                setErrorNombre(false);
                setErrorModelo(true);
            }else{
                setErrorNombre(false);
                setErrorModelo(false);
                const ubicacion = '/aplicaciones/productos/items';
                // Convertimos los precios de venta en precios de 4 DECIMALES
                let newPreciosVenta = formValues.map( p => ({...p, precio: p.precio === ''? 0 : parseFloat(cuatroDecimales(p.precio))}) );
                // let newPreciosVenta = values.preciosVenta.map(p => ({...p, precio: cuatroDecimales(p.precio)}));
                let newValues = { habilitado, 
                    ...values,
                    num: Date.now(),
                    cantidad: parseInt(values.cantidad), 
                    cantidadMinima: parseInt(values.cantidadMinima), 
                    costo: cuatroDecimales(values.costo),
                    preciosVenta: newPreciosVenta  
                };
                let errorModelo = false;
                // const valuesMinusculas = objetoMinusculas( newValues );
                for (let i = 0; i < items.length; i++) {
                    if( newValues.modelo.toLowerCase() === items[i].modelo.toLowerCase()){
                        errorModelo = true;
                        break;
                    }  
                }
                if( errorModelo ){
                    setModeloRepetido(true);
                    setTimeout(()=>{
                        setModeloRepetido(false);
                    }, 5000)
                }else{
                    if( inputFile ){
                        console.log('Con imagen');
                        console.log( newValues );
                        // dispatch( guardarDocumentoConArchivoFireBase( ubicacion, newValues, inputFile ) );
        
                    }else{
                        console.log('Sin imagen');
                        newValues.imgUrl = imgUrl;
                        console.log( newValues );
                        // dispatch( guardarDocumentoFireBase( ubicacion, newValues ) ); 
                    }
                } 
            }
        }
    });

  return (
    <div className="window" onSubmit={ formulario.handleSubmit } >

    {/* VENTANAS */}
      { nuevaMarca&& <RegistrarMarcas nuevaMarca={ nuevaMarca } setNuevaMarca={ setNuevaMarca } />}
      { nuevaCategoria&& <RegistrarCategorias nuevaCategoria={ nuevaCategoria } setNuevaCategoria={ setNuevaCategoria } /> }
      { nuevaMedida&& <RegistrarMedidas nuevaMedida={ nuevaMedida } setNuevaMedida={ setNuevaMedida } /> }
        <form className="window-container">
            <div className="window-head">
                <span>REGISTRAR NUEVO PRODUCTO</span>
                <div className="btn-exit" onClick={()=> setRegistrarProducto(!registrarProducto) } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body" >
                <FormRegistrar
                setNuevaMarca={setNuevaMarca}
                setNuevaCategoria={setNuevaCategoria}
                setNuevaMedida={setNuevaMedida}
                imgUrl={ imgUrl }
                setImgUrl={ setImgUrl }
                setInputFile={ setInputFile }
                habilitado={ habilitado }
                setHabilitado={ setHabilitado }
                nombre={ formulario.values.nombre }
                marca={ formulario.values.marca }
                modelo={ formulario.values.modelo }
                categoria={ formulario.values.categoria }
                procedencia={ formulario.values.procedencia }
                cantidad={ formulario.values.cantidad }
                cantidadMinima={ formulario.values.cantidadMinima }
                medida={ formulario.values.medida }
                costo={ formulario.values.costo }
                preciosVenta={ preciosVenta }
                handleChange={ formulario.handleChange }
                modeloRepetido={modeloRepetido}
                errorNombre={errorNombre}
                errorModelo={errorModelo}
                formValues={formValues}
                handleInputChange={handleInputChange}
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
                <div className="btn btn-danger" onClick={()=> setRegistrarProducto(!registrarProducto) } >Cancelar</div>
            </div>

        </form>
    </div>
    )
}
