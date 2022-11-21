import { collection, addDoc, query, where, orderBy, getDocs, doc, runTransaction, deleteDoc, limit } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { 
    startLoading, 
    finishLoading, 
    startUpdate,
    finishUpdate,
    startUpdateSuccess,
    finishUpdateSuccess,
    obneterProveedoresCompras,
    obtenerDatosCompras,
    generarIndiceCompra,

    agregarNuevoProveedor,
    editarProveedor,
    eliminarProveedor,

    agregarNuevoPedido,
    editarPedido,
    eliminarPedido,

    agregarNuevaCompra,
    editarCompra,
    eliminarCompra,

} from "./comprasSlice";


export const guardarDocumentoFireBase = (ubicacion, datos) => {
    return async( dispatch ) => {
        dispatch( startUpdate() );
        const docRef = await addDoc( collection( db, ubicacion ), datos );
        if( docRef.id ) {
            datos.id = docRef.id;

            if ( ubicacion.includes('proveedores') ){
                dispatch( agregarNuevoProveedor( datos ) );
            }else if ( ubicacion.includes('pedidos') ){
                dispatch( agregarNuevoPedido( datos ) );
            }else if ( ubicacion.includes('compras') ){
                dispatch( agregarNuevaCompra( datos ) );
            }
            
            
            dispatch( finishUpdate() );
            dispatch( startUpdateSuccess() );
            setTimeout( ()=>{ dispatch( finishUpdateSuccess() ) }, 1500 );
        }
    }
}

export const editarDocumentoCompras = (ubicacion, datos) => {
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
            datos.id = docRef.id;
            if( ubicacion.includes('proveedores') ){
                dispatch( editarProveedor(datos) );
            }else if( ubicacion.includes('compras') ){
                dispatch( editarCompra(datos) );
            }
        } catch (e) {
            console.error( e );
        }
        dispatch( finishUpdate() );
        dispatch( startUpdateSuccess() );
        setTimeout( ()=>{ dispatch( finishUpdateSuccess() ) }, 1500 ); 
    }
}

export const eliminarDocumentoFirebase = (ubicacion, id) => {
    return async(dispatch) => {
        dispatch( startUpdate() );

        await deleteDoc( doc(db, ubicacion) );

        if( ubicacion.includes('proveedores') ){
            dispatch( eliminarProveedor(id) );
        }else if( ubicacion.includes('pedidos') ){
            dispatch( eliminarPedido(id) );
        }else if( ubicacion.includes('compras') ){
            dispatch( eliminarCompra(id) );
        }

        dispatch( finishUpdate() );
    }

}

export const registrarPagoCompra = (ubicacion, datos ) => {
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
                    const newSaldoPagos = [...datosDB.saldoPagos, ...datos.saldoPagos];
                    datosDB.saldoPagos = newSaldoPagos;
                    transaction.update(sfDocRef, { ...datosDB });
                    return ({...datosDB, id: sfDoc.id})
                }
            });
            dispatch( editarCompra(newDatosDB) );
        } catch (e) {
            console.error( e );
        }

        dispatch( finishUpdate() );
        dispatch( startUpdateSuccess() );
        setTimeout( ()=>{ dispatch( finishUpdateSuccess() ) }, 1500 ); 
    }
}

export const generarIndiceNuevaCompra = () => {
    return async( dispatch ) => {

        let items = [];
        // ITEMS
        const queryItems = query( collection( db, '/aplicaciones/compras/compras' ), orderBy('fecha', 'desc'), limit(1) );
        const snapshotItems = await getDocs(queryItems);
        snapshotItems.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            items = [ documento, ...items ];
        });

        if( items.length > 0 ){
            const indice = items[0].numero + 1;
            dispatch( generarIndiceCompra(indice) );
        }else{
            dispatch( generarIndiceCompra(1) );
        }
    }
}

export const obtenerColeccionComprasProveedores = () => {
    return async( dispatch )=> {
        dispatch( startLoading() );
        let proveedores = [];

        // PROVEEDORES
        const queryProveedores = query( collection( db, '/aplicaciones/compras/proveedores' ), orderBy('nombre', 'desc') );
        const snapshotProveedores = await getDocs(queryProveedores);
        snapshotProveedores.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            proveedores = [ documento, ...proveedores ];
        });

        dispatch( obneterProveedoresCompras( {proveedores} ) );
        dispatch( finishLoading() );     
    }
}

export const obtenerColeccionComprasPorFecha = (fechaInicial, fechaFinal) => {
    // formato fechas: AAAA-MM-DD 
    return async( dispatch )=> {
        const inicio = new Date(fechaInicial + 'T00:00:00');
        const fin = new Date(fechaFinal + 'T23:59:59');
        dispatch( startLoading() );
        let pedidos = [];
        let compras = [];

        // PEDIDOS
        const queryPedidos = query( collection( db, '/aplicaciones/compras/pedidos' ), 
        where("fecha", ">=", inicio.getTime()), where("fecha", "<=", fin.getTime()), 
        orderBy('fecha', 'asc') );

        const snapshotPedidos = await getDocs(queryPedidos);
        snapshotPedidos.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            pedidos = [ documento, ...pedidos ];
        });

        // COMPRAS
        const queryCompras = query( collection( db, '/aplicaciones/compras/compras' ),
        where("fecha", ">=", inicio.getTime()), where("fecha", "<=", fin.getTime()),
        orderBy('fecha', 'asc') );
        const snapshotCompras = await getDocs(queryCompras);
        snapshotCompras.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            compras = [ documento, ...compras ];
        });

        dispatch( obtenerDatosCompras( {pedidos, compras} ) );
        dispatch( finishLoading() );     
    }
}