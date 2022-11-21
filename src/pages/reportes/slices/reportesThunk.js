import { collection, addDoc, query, orderBy, where, getDocs, doc, runTransaction, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase/firebaseConfig";

import { 
    startLoading, 
    finishLoading, 
    startUpdate,
    finishUpdate,
    startUpdateSuccess,
    finishUpdateSuccess,

    agregarNuevoReporte,
    obtenerDatosReportes
} from "./reportesSlice";


export const guardarDocumentoReportes = (ubicacion, datos) => {
    return async( dispatch ) => {
        console.log( 'guardando reporte en DB' );
        dispatch( startUpdate() );
        const docRef = await addDoc( collection( db, ubicacion ), datos );
        if( docRef.id ) {
            datos.id = docRef.id;
            if ( ubicacion.includes('reportes') ){
                dispatch( agregarNuevoReporte( datos ) );
            }       
            
            dispatch( finishUpdate() );
            dispatch( startUpdateSuccess() );
            setTimeout( ()=>{ dispatch( finishUpdateSuccess() ) }, 1500 );
        }
    }
}

export const obtenerColeccionReportesPorFecha = (fechaInicial, fechaFinal) => {
    // formato fechas: AAAA-MM-DD 
    return async( dispatch )=> {
        const inicio = new Date(fechaInicial + 'T00:00:00');
        const fin = new Date(fechaFinal + 'T23:59:59');
        dispatch( startLoading() );
        let reportes = [];

        // REPORTES
        const queryReportes = query( collection( db, '/reportes' ), 
        where("fecha", ">=", inicio.getTime()), where("fecha", "<=", fin.getTime()), 
        orderBy('fecha', 'asc') );

        const snapshotReportes = await getDocs(queryReportes);
        snapshotReportes.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            reportes = [ documento, ...reportes ];
        });

        dispatch( obtenerDatosReportes( {reportes} ) );
        dispatch( finishLoading() );     
    }
}


