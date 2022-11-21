import { FormNuevoPedido } from '../formularios/FormNuevoPedido';
import { useFormList } from '../../../../hooks/useFormList';
import { ProductosItems } from './ProductosItems';
import { useState } from 'react';
import { useForm } from '../../../../hooks/useForm';
import { useDispatch, useSelector } from "react-redux";
import { guardarDocumentoFireBase } from '../../slices/comprasThunk';
import { useRef } from 'react';
import { generarFechaAMD} from '../../../../helpers/dateConfig';
import { pdfNuevoPedido } from '../../pdf/pdfNuevoPedido';

export const NuevoPedido = ({ nuevoPedido, setNuevoPedido }) => {
    let date = Date.now();
    const dispatch = useDispatch();
    const inputFecha = useRef()

    const { items } = useSelector(s => s.productos);
    const [errorDescarga, setErrorDescarga] = useState(false);
    const { actualizandoDatos, actualizacionExitosa } = useSelector(s => s.compras);
    const [listItems, setListItems] = useState(items.map(i => {
        const newItem = {
            id: i.id,
            marca: i.marca.toUpperCase(),
            modelo: i.modelo,
            nombre: i.nombre,
            select: false,
            imgUrl: i.imgUrl,
            cantidad:''
        }
        return newItem
    }))
  
    const [productosItems, setProductosItems] = useState(false);

    // HOOK PARA OBJETOS
    const formObj = useForm({ proveedor:''});
    const [ valuesObj, handleInputChangeObj, valueManual ] = formObj;

    // HOOK PARA LISTAS 
    const formList = useFormList([{nombre:'', marca:'', modelo:'', cantidad:'', id: Date.now() }]);
    const [ formValues, handleInputChange, listAdd, listDelete ] = formList;

    const guardarDocumento = (e) => {
        e.preventDefault();
        // const date = new Date(inputFecha.current.value);
        const items = formValues.map( i => ({ ...i, cantidad: parseInt(i.cantidad) }) );
        const formulario = { ...valuesObj, items, fecha: date };
        const ubicacion = '/aplicaciones/compras/pedidos';

        // console.log( formulario );
        dispatch( guardarDocumentoFireBase(ubicacion, formulario) );
    }

    const descargarNuevoPedido = () => {
        let error = false;
        const datos = {
            fecha:  generarFechaAMD(date),
            proveedor: valuesObj.proveedor
        }
        let items = [];

        formValues.forEach((i, index) => {
            if( i.nombre === '' || i.cantidad === '' || valuesObj.proveedor === '' ){
                error = true;
                return;
            }else{
                items.push([(index+1), i.nombre, i.marca, i.modelo, i.cantidad ]);
            }
        });
        
        if( !error ){
            setErrorDescarga(error);
            console.log( items );
            pdfNuevoPedido( items, datos );
        }     
        else setErrorDescarga(error)
    }


  return (
    <div className='window'>

        {/* VENTANAS */}
        { productosItems&& 
        <ProductosItems 
        productosItems={productosItems} 
        setProductosItems={setProductosItems} 
        listItems={listItems}
        listDelete={listDelete}
        setListItems={setListItems}
        listAdd={listAdd}
         />}

        <div className="window-container">
            <div className="window-head">
                <span>REALIZAR NUEVO PEDIDO</span>
                <div className="btn-exit" onClick={ () => { setNuevoPedido(!nuevoPedido) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body">
                <form className="container-fluid" onSubmit={guardarDocumento} >
                    <FormNuevoPedido
                    handleInputChangeObj = {handleInputChangeObj}
                    proveedor = {valuesObj.proveedor}
                    valueManual = {valueManual}
                    inputFecha = {inputFecha}
                    date = {date}

                    handleInputChange={handleInputChange}
                    formValues={formValues}
                    listDelete={listDelete}

                    listItems={listItems}
                    setListItems={setListItems}
                    />
                    <div className="row pb-1">
                        <div className="col-3">
                            <span className='btn-text' onClick={()=>{listAdd({nombre:'', marca:'', modelo:'', cantidad:'', id: Date.now()})}} >Espacio en blanco...</span>
                        </div>
                        <div className="col-3">
                            <span className='btn-text' onClick={()=>{setProductosItems(!productosItems)}} >Agregar item...</span>
                        </div>
                    </div>

                    <div className="row border-top pt-2">
                        <div className="col d-flex flex-row-reverse">
                            <button type='submit' className='btn btn-success'>
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
                            <div className="btn btn-danger me-3" onClick={descargarNuevoPedido} > <i className="bi bi-file-earmark-pdf-fill"></i> Descargar</div>
                            {errorDescarga&&
                                <span className='fw-bold text-danger me-3 text-center' >Llena los espacios de DESCRIPCION y CANTIDAD de todos los ítems, asi como el PROVEEDOR</span>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
