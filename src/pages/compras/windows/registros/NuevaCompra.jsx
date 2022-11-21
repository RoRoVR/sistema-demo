import { useState, useRef, useEffect } from 'react';
import { useFormList } from '../../../../hooks/useFormList';
import { useDispatch, useSelector } from "react-redux";
import { ProductosItems } from '../../footer/windows/ProductosItems';
import { useForm } from '../../../../hooks/useForm';
import { generarIndiceNuevaCompra, guardarDocumentoFireBase } from '../../slices/comprasThunk';
import { FormNuevaCompra } from '../../formularios/FormNuevaCompra';
import { cuatroDecimales } from '../../../../helpers/numConfig';
import { generarIndiceCompra } from '../../slices/comprasSlice';

export const NuevaCompra = ({ nuevaCompra, setNuevaCompra, pedido = { proveedor:'', items:[] } }) => {
    // pedido = { fecha:'date.toISOString().split('T')[0]', proveedor:'', items:[{cantidad:'',id:'', marca:'', modelo:'', nombre:''}] }

    const dispatch = useDispatch();
    const [sinItems, setSinItems] = useState(false); 
    const {cargo, nombre} = useSelector(s => s.login); 
    const inputFecha = useRef();  
    useEffect(() => {
        dispatch( generarIndiceNuevaCompra() );
    }, [])

    const { items } = useSelector(s => s.productos);
    const { compras, indice } = useSelector(s => s.compras);
    const itemsCompra = pedido.items.map(i => ({...i, precio:'', cantidadResibida:''}));

    const { actualizandoDatos, actualizacionExitosa } = useSelector(s => s.compras);
    const [listItems, setListItems] = useState(items.map(i => {
        const newItem = {
            id: i.id,
            marca: i.marca.toUpperCase(),
            modelo: i.modelo,
            nombre: i.nombre,
            select: false,
            imgUrl: i.imgUrl,
            cantidad:'',
            cantidadResivida:'',
            precio:''
        }

        pedido.items.forEach( i => {
            if( i.id === newItem.id ) newItem.select = true;
        } );
        
        return newItem
    }))
   
    const [productosItems, setProductosItems] = useState(false);

    // HOOK PARA OBJETOS
    const formObj = useForm({ proveedor: pedido.proveedor});
    const [ valuesObj, handleInputChangeObj, valueManual ] = formObj;

    // HOOK PARA LISTAS 
    const formList = useFormList( itemsCompra );
    const [ formValues, handleInputChange, listAdd, listDelete ] = formList;



    const guardarDocumento = (e) => {
        e.preventDefault();

        const newFormValues = formValues.map(v => ({...v, cantidad: parseInt(v.cantidad), precio: cuatroDecimales(parseFloat(v.precio))}));
        const formulario = { ...valuesObj, items: newFormValues };
        const date = new Date(inputFecha.current.value);


        formulario.total = calcularTotal();
        formulario.estado = 'loading';
        formulario.numero = indice;
        formulario.usuarioCompra = { nombre, cargo };
        formulario.usuarioRecibido = '';
        formulario.fechaRecibido = '';
        formulario.saldo = formulario.total;
        formulario.saldoPagos = [];
        formulario.fecha = date.getTime();  // Extraemos la fecha en milisegundos


        const ubicacion = '/aplicaciones/compras/compras';

        if(formulario.items.length === 0){
            compraSinItems();
        }else{
            // console.log( formulario );
            dispatch( guardarDocumentoFireBase(ubicacion, formulario) );
            dispatch( generarIndiceCompra( indice + 1 ) );

        }

    }

    const calcularTotal = () => {
        let total = 0;
        formValues.forEach(({precio, cantidad}) => {
            if( isNaN( parseFloat(precio) ) ) total += 0;
            else total += parseFloat(precio) * parseInt(cantidad) ;
        });
        return (cuatroDecimales(total));
    }
    const compraSinItems = () => {
        setSinItems( true );

        setTimeout(()=>{
            setSinItems( false );
        }, 5000);
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
                <span>REALIZAR COMPRA Nº{indice} </span>
                <div className="btn-exit" onClick={ () => { setNuevaCompra(!nuevaCompra) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body">
                <form className="container-fluid" onSubmit={guardarDocumento} >
                    
                    <FormNuevaCompra
                    handleInputChangeObj = {handleInputChangeObj}
                    proveedor ={valuesObj.proveedor}
                    valueManual={valueManual}
                    inputFecha={inputFecha}

                    handleInputChange={handleInputChange}
                    formValues={formValues}
                    listDelete={listDelete}

                    listItems={listItems}
                    setListItems={setListItems}
                    />
                    <div className="row pb-1">
                        <div className="col-3 text-start">
                            <span className='btn-text' onClick={()=>{listAdd({nombre:'', marca:'', modelo:'', cantidad: '', cantidadResibida:'',precio:'', id: Date.now()})}} >Espacio en blanco...</span>
                        </div>
                        <div className="col-3 text-start">
                            <span className='btn-text' onClick={()=>{setProductosItems(!productosItems)}} >Agregar item...</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-end">

                            <h4>Total a pagar: <span className="badge bg-primary">Bs. {calcularTotal()}</span> </h4>                            
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
                                Realizar compra
                            </button>

                            {sinItems &&
                            <span  className='mx-2 fw-bold text-danger' >No se encontraron items</span>}

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
