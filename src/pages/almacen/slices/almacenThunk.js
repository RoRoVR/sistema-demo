import { collection, addDoc, query, where, orderBy, getDocs, doc, runTransaction, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { 
    startLoading, 
    finishLoading, 
    startUpdate,
    finishUpdate,
    startUpdateSuccess,
    finishUpdateSuccess,
    obtenerDatosCompras,
    obtenerTareasPendientes,
 } from "./almacenSlice"


export const obtenerTareasPendientesAlmecen = () => {
    return async( dispatch ) => {
        dispatch( startLoading() );
        let compras = [];

        // COMPRAS
        const queryCompras = query( collection( db, '/aplicaciones/compras/compras' ), where("estado", "==", "loading"), orderBy('fecha', 'asc') );

        const snapshotCompras = await getDocs(queryCompras);
        snapshotCompras.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            compras = [ documento, ...compras ];
        });
 
        dispatch( obtenerTareasPendientes({compras}) );
        dispatch( finishLoading() );
    }
}

export const editarDocumentoFirebase = (ubicacion, datos) => {
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
        } catch (e) {
            console.error( e );
        }

        dispatch( finishUpdate() );
        dispatch( startUpdateSuccess() );
        setTimeout( ()=>{ dispatch( finishUpdateSuccess() ) }, 1500 ); 
    }
}