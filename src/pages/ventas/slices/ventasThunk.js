import { collection, addDoc, query, orderBy, getDocs, doc, runTransaction, deleteDoc, getDoc, where, limit } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../firebase/firebaseConfig";
import { guardarDocumentoReportes } from "../../reportes/slices/reportesThunk";
import { 
    obtenerListaVentas,
    obtenerListaCotizaciones,
    obtenerListaClientes,
    obtenerListaGastos,
    agregarNuevaVenta,
    agregarNuevaCotizacion,
    agregarNuevoGasto,
    agregarNuevoTipoGasto,
    eliminarTipoGasto,
    agregarNuevoCliente,
    generarIndiceVenta,
    generarIndiceCotizacion,
    clienteEncontrado,
    clienteNoEncontrado,
    errorRegistrarCliente,
    noErrorRegistrarCliente,
    startLoading, 
    finishLoading, 
    startUpdate,
    finishUpdate,
    startUpdateSuccess,
    finishUpdateSuccess,

    editarConfiguracion,
    editarVenta,
    editarCliente,

    obtenerConfiguracion,
    obtenerDatosVentas,
    resetBusquedaCliente,
} from "./ventasSlice";

export const obtenerColeccionListaVentasPorFecha = (fechaInicial, fechaFinal) => {
    // formato fechas: AAAA-MM-DD 
    return async( dispatch )=> {
        const inicio = new Date(fechaInicial + 'T00:00:00');
        const fin = new Date(fechaFinal + 'T23:59:59');
        dispatch( startUpdate() );
        let registroVentas = [];

        const ventasRef = collection(db, "ventas/registroVentas/ventas");

        // REPORTES
        const queryVentas = query(ventasRef, 
        where("fecha", ">=", inicio.getTime()), 
        where("fecha", "<=", fin.getTime()), 
        orderBy('fecha', 'asc') );

        const snapshotVentas = await getDocs(queryVentas);
        snapshotVentas.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            registroVentas = [ documento, ...registroVentas ];
        });

        dispatch( obtenerListaVentas( {registroVentas} ) );
        dispatch( finishUpdate() );     
    }
}

export const obtenerColeccionListaCotizacionesPorFecha = (fechaInicial, fechaFinal) => {
    // formato fechas: AAAA-MM-DD 
    return async( dispatch )=> {
        const inicio = new Date(fechaInicial + 'T00:00:00');
        const fin = new Date(fechaFinal + 'T23:59:59');
        dispatch( startUpdate() );
        let registroCotizaciones = [];

        // REPORTES
        const queryCotizaciones = query( collection( db, '/ventas/registroCotizaciones/cotizaciones' ), 
        where("fecha", ">=", inicio.getTime()), where("fecha", "<=", fin.getTime()), 
        orderBy('fecha', 'asc') );

        const snapshotCotizaciones = await getDocs(queryCotizaciones);
        snapshotCotizaciones.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            registroCotizaciones = [ documento, ...registroCotizaciones ];
        });

        dispatch( obtenerListaCotizaciones( {registroCotizaciones} ) );
        dispatch( finishUpdate() );     
    }
}

export const obtenerColeccionRegistroGastosPorFecha = (fechaInicial, fechaFinal) => {
    // formato fechas: AAAA-MM-DD 
    return async( dispatch )=> {
        const inicio = new Date(fechaInicial + 'T00:00:00');
        const fin = new Date(fechaFinal + 'T23:59:59');
        dispatch( startUpdate() );
        let registroGastos = [];

        // REPORTES
        const queryRegistroGastos = query( collection( db, '/ventas/registroGastos/gastos' ), 
        where("fecha", ">=", inicio.getTime()), where("fecha", "<=", fin.getTime()), 
        orderBy('fecha', 'asc') );

        const snapshotRegistroGastos = await getDocs(queryRegistroGastos);
        snapshotRegistroGastos.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            registroGastos = [ documento, ...registroGastos ];
        });

        dispatch(  obtenerListaGastos( {registroGastos} ) );
        dispatch( finishUpdate() );     
    }
}

export const buscarColeccionListaVentasPorNumero = (numero) => {
    return async(dispatch) => {
        dispatch(startUpdate());

        let registroVentas = [];

        // REPORTES
        const queryVentas = query( collection( db, '/ventas/registroVentas/ventas' ), where("numero", "==", numero));

        const snapshotVentas = await getDocs(queryVentas);
        snapshotVentas.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            registroVentas = [ documento, ...registroVentas ];
        });

        dispatch( obtenerListaVentas( {registroVentas} ) );
        dispatch( finishUpdate() );     
    }
}

export const buscarColeccionListaCotizacionPorNumero = (numero) => {
    return async(dispatch) => {
        dispatch(startUpdate());

        let registroCotizaciones = [];

        // REPORTES
        const queryCotizacion = query( collection( db, '/ventas/registroCotizaciones/cotizaciones' ), where("numero", "==", numero));

        const snapshotCotizacion = await getDocs(queryCotizacion);
        snapshotCotizacion.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            registroCotizaciones = [ documento, ...registroCotizaciones ];
        });

        dispatch( obtenerListaCotizaciones( {registroCotizaciones} ) );
        dispatch( finishUpdate() );     
    }
}

export const registrarPagoVenta = (ubicacion, datos ) => {
    return async( dispatch ) => {
        dispatch( startUpdate() );
        const sfDocRef = doc( db, ubicacion );
        try {
            const newDatosDB = await runTransaction( db, async( transaction ) => {
                const sfDoc = await transaction.get(sfDocRef);
                if(!sfDoc.exists()){
                    console.log( 'No se encontro el documento' );
                }else{
                    let datosDB = sfDoc.data();
                    const newPagos = [...datosDB.pagos, ...datos.pagos];
                    datosDB.pagos = newPagos;
                    transaction.update(sfDocRef, { ...datosDB });
                    return ({...datosDB, id: sfDoc.id})
                }
            });
            dispatch( editarVenta(newDatosDB) );
        } catch (e) {
            console.error( e );
        }

        dispatch( finishUpdate() );
        dispatch( startUpdateSuccess() );
        setTimeout( ()=>{ dispatch( finishUpdateSuccess() ) }, 1500 ); 
    }
}

export const registrarNuevoCliente = (ubicacion, datos) => {
    return async(dispatch) => {
        dispatch(startUpdate());

        let clientes = [];
        // CLIENTES
        const queryClientes = query( collection( db, '/ventas/clientes/clientes' ), where( 'codigo', '==', datos.codigo  ));
        const snapshotClientes = await getDocs(queryClientes);
        snapshotClientes.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data()};
            clientes = [ documento, ...clientes ];
        });
        if( clientes.length > 0 ){
            dispatch( errorRegistrarCliente() );
            dispatch(finishUpdate());
        }else{
            //Procedemos a registrar el cliente
            dispatch( noErrorRegistrarCliente() );
            dispatch( guardarDocumentoVentas(ubicacion, datos) );
        }
    }
}

export const buscarClienteVentas = (codigo) => {
    return async(dispatch) => {
        dispatch(startUpdate());

        let clientes = [];
        // CLIENTES
        const queryClientes = query( collection( db, '/ventas/clientes/clientes' ), where( 'codigo', '==', codigo  ));
        const snapshotClientes = await getDocs(queryClientes);
        snapshotClientes.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data()};
            clientes = [ documento, ...clientes ];
        });
        if( clientes.length > 0 ){
            //Se encontro el cliente
            dispatch( clienteEncontrado(clientes[0]) );
            dispatch( finishUpdate() );
        }else{
            dispatch( clienteNoEncontrado() );
            dispatch(finishUpdate());
        }
    }
}

export const generarIndiceNuevaCotizacion= () => {
    return async( dispatch ) => {

        let items = [];
        // ITEMS
        const queryItems = query( collection( db, '/ventas/registroCotizaciones/cotizaciones' ), orderBy('fecha', 'desc'), limit(1) );
        const snapshotItems = await getDocs(queryItems);
        snapshotItems.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            items = [ documento, ...items ];
        });

        if( items.length > 0 ){
            const indice = items[0].numero + 1;
            dispatch( generarIndiceCotizacion(indice) );
        }else{
            dispatch( generarIndiceCotizacion(1) );
        }
    }
}

export const generarIndiceNuevaVenta = () => {
    return async( dispatch ) => {

        let items = [];
        // ITEMS
        const queryItems = query( collection( db, '/ventas/registroVentas/ventas' ), orderBy('numero', 'desc'), limit(1) );
        const snapshotItems = await getDocs(queryItems);
        snapshotItems.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            items = [ documento, ...items ];
        });

        if( items.length > 0 ){
            console.log(items[0]);
            const indice = items[0].numero + 1;
            dispatch( generarIndiceVenta(indice) );
        }else{
            dispatch( generarIndiceVenta(1) );
        }
    }
}

export const guardarDocumentoVentas = (ubicacion, datos) => {
    return async(dispatch) =>{
        console.log('Guardando doc ventas en DB');
        dispatch( startUpdate() );
        const docRef = await addDoc( collection( db, ubicacion ), datos );

        if( docRef.id ) {
            let newReporte = {idDetalle: docRef.id};
            datos.id = docRef.id;

            if ( ubicacion.includes('cliente') ){
                dispatch( clienteEncontrado(datos) );
                dispatch( agregarNuevoCliente(datos) );
            }else if( ubicacion.includes('registroVentas') ){
                
                if( datos.tipoPago === 'efectivo' ){
                    // pago[0] lleva toda la informacion que requerimos en el reporte
                    newReporte = { ...newReporte, ...datos.pagos[0], tipo:'ventas' }
                    dispatch( guardarDocumentoReportes('/reportes', newReporte) );
                }
                dispatch( agregarNuevaVenta(datos) );

            }else if( ubicacion.includes('registroCotizaciones') ){
                dispatch( agregarNuevaCotizacion(datos) );
            }else if( ubicacion.includes('registroGastos') ){

                newReporte = {...newReporte, ...datos, tipo: 'gastos'};
                dispatch( guardarDocumentoReportes('/reportes', newReporte) );
                dispatch( agregarNuevoGasto(datos) );

            }
            else if( ubicacion.includes('tiposGastos') ){
                dispatch( agregarNuevoTipoGasto(datos) );
            }           
        }
        dispatch( finishUpdate() );
        dispatch( startUpdateSuccess() );
        setTimeout( ()=>{ dispatch( finishUpdateSuccess() ) }, 1500 );
    }
}

export const editarDocumentoVentas = (ubicacion, datos) => {
    return async( dispatch ) => {
        dispatch( startUpdate() );
        const docRef = doc( db, ubicacion );
        try {
            await runTransaction( db, async( transaction ) => {
                const sfDoc = await transaction.get(docRef);

                if(!sfDoc.exists()){
                    console.log( 'No se encontro el documento' );
                }else{
                    transaction.update( docRef, datos );
                }

            });
            if( ubicacion.includes('configuracion') ){
                dispatch( editarConfiguracion(datos) );
            }else if( ubicacion.includes('clientes') ){
                datos.id = docRef.id;
                dispatch( editarCliente(datos) );
                dispatch( clienteEncontrado(datos) );
            } 
        } catch (e) {
            console.error( e );
        }

        dispatch( finishUpdate() );
        dispatch( startUpdateSuccess() );
        setTimeout( ()=>{ dispatch( finishUpdateSuccess() ) }, 1500 ); 
    }
}
export const eliminarDocumentoVentas = (ubicacion, id) => {
    return async(dispatch) => {
        dispatch( startUpdate() );
        await deleteDoc( doc(db, ubicacion) );

        if( ubicacion.includes('clientes') ){
            dispatch( resetBusquedaCliente() );
        }
        else if( ubicacion.includes('tiposGastos') ){
            dispatch( eliminarTipoGasto(id) );
        }
        dispatch( finishUpdate() );
    }

}

export const obtenerColeccionClientes = () => {
    return async( dispatch ) => {
        dispatch( startUpdate() );      
        let registroClientes = [];
        // ITEMS
        const queryClientes = query( collection( db, '/ventas/clientes/clientes' ), orderBy('nombre', 'desc') );
        const snapshotClientes = await getDocs(queryClientes);
        snapshotClientes.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            registroClientes = [ documento, ...registroClientes ];
        });
        dispatch( obtenerListaClientes( {registroClientes} ) );
        dispatch( finishUpdate() );
    }
}

export const obtenerColeccionVentas = () => {
    return async( dispatch ) => {
        dispatch(startLoading());
        
        let items = [];
        let tiposGasto = [];

        // ITEMS
        const queryItems = query( collection( db, '/aplicaciones/productos/items' ), orderBy('num', 'asc') );
        const snapshotItems = await getDocs(queryItems);
        snapshotItems.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data(), select: false };
            items = [ documento, ...items ];
        });

        // TIPOS DE GASTO
        const queryTiposGasto = query( collection( db, '/ventas/tiposGastos/tiposGastos' ), orderBy('tipo', 'asc') );
        const snapshotTiposGasto = await getDocs(queryTiposGasto);
        snapshotTiposGasto.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            tiposGasto = [ documento, ...tiposGasto ];
        });

        dispatch( obtenerDatosVentas( {items, tiposGasto} ) );
        dispatch(finishLoading());
    }
}
export const refrescarColeccionVentas = () => {
    return async( dispatch, getState ) => {
        
        const { ventas } = getState( s => s );
        let items = [];
        // ITEMS
        const queryItems = query( collection( db, '/aplicaciones/productos/items' ), orderBy('num', 'asc') );
        const snapshotItems = await getDocs(queryItems);
        snapshotItems.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            items = [ documento, ...items ];
        });
        let newItems = []; // items con las cantiddades ya modificadas
        ventas.items.map( i => {
            // Buscamos el item que coinsida por el ID
            const itemDB = items.find(item => {
                return item.id === i.id
            });
            newItems = [...newItems, { ...i, cantidad: itemDB.cantidad }];
        })

        dispatch( obtenerDatosVentas( {items: newItems} ) );
    }
}

export const obtenerConfiguracionVentas = () => {
    return async( dispatch ) => {

        let configuracion = {};

        //CONFIGURACION
        const docRef = doc( db, 'ventas', 'configuracion' );
        const docSnap = await getDoc( docRef );

        if( docSnap.exists() ){
            configuracion = { ...docSnap.data() };
             dispatch( editarConfiguracion(configuracion) );
        }else{
            console.log("No existe el documento de configuracion");
        }

    }
}