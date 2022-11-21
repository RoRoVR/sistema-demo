import { collection, addDoc, query, orderBy, getDocs, doc, runTransaction, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../firebase/firebaseConfig";
import { cuatroDecimales } from "../../../helpers/numConfig";
import { 
    startLoading, 
    finishLoading, 
    startUpdate,
    finishUpdate,
    startUpdateSuccess,
    finishUpdateSuccess,

    agregarNuevoItem,
    editarItem,
    eliminarItem,

    agregarNuevaMarca,
    eliminarMarca,

    agregarNuevaCategoria,
    eliminarCategoria,

    agregarNuevaMedida,
    eliminarMedida,

    agregarNuevoPrecio,
    eliminarPrecio,

    obtenerDatosProductos
} from "./productosSlice";


export const guardarDocumentoConArchivoFireBase = ( ubicacion, datos, archivo ) => {
    return async( dispatch ) => {
        dispatch( startUpdate() );


        const storageRef = ref(storage, `aplications/productos/${archivo.lastModified}-${archivo.name}`);
        await uploadBytes( storageRef, archivo )
        .then( async (snapshot) => {
            console.log('la imagen se cargo correctamente');

            const imgPath = snapshot.ref.fullPath;
            const imgRef = ref( storage, imgPath );
            await getDownloadURL( imgRef ) // Obtenemos el Link
            .then( imgUrl => {
                datos.imgUrl = imgUrl;
                dispatch( guardarDocumentoFireBase( ubicacion, datos ) );
            } )
            .catch( e => {
                console.log(e.code);
                dispatch( finishUpdate() );

            } )
        } )
        .catch(e => {
            console.log(e);
            dispatch( finishUpdate() );
            console.log("Error al subir la imagen")
        })

    }
}


export const guardarDocumentoFireBase = (ubicacion, datos) => {
    return async( dispatch ) => {
        console.log('Guardando documento');
        dispatch( startUpdate() );
        const docRef = await addDoc( collection( db, ubicacion ), datos );
        if( docRef.id ) {
            datos.id = docRef.id;

            if ( ubicacion.includes('marcas') ){
                dispatch( agregarNuevaMarca( datos ) );
            }else if ( ubicacion.includes('categorias') ){
                dispatch( agregarNuevaCategoria( datos ) );
            }else if ( ubicacion.includes('medidas') ){
                dispatch( agregarNuevaMedida( datos ) );
            }else if ( ubicacion.includes('precios') ){
                dispatch( agregarNuevoPrecio( datos ) );
            }else if ( ubicacion.includes('items') ){
                dispatch( agregarNuevoItem( datos ) );
            }           
            
            dispatch( finishUpdate() );
            dispatch( startUpdateSuccess() );
            setTimeout( ()=>{ dispatch( finishUpdateSuccess() ) }, 1500 );
        }
    }
}

export const editarDocumentoConArchivoFireBase = ( ubicacion, datos, archivo ) => {
    return async( dispatch ) => {
        dispatch( startUpdate() );

        const storageRef = ref(storage, `aplications/productos/${archivo.lastModified}-${archivo.name}`);
        await uploadBytes( storageRef, archivo )
        .then( async (snapshot) => {
            console.log('la imagen se cargo correctamente');

            const imgPath = snapshot.ref.fullPath;
            const imgRef = ref( storage, imgPath );
            await getDownloadURL( imgRef ) // Obtenemos el Link
            .then( imgUrl => {
                datos.imgUrl = imgUrl;
                dispatch( editarDocumentoFirebase( ubicacion, datos ) );
            } )
            .catch( e => {
                console.log(e.code);
                dispatch( finishUpdate() );

            } )
        } )
        .catch(e => {
            console.log(e);
            dispatch( finishUpdate() );
            console.log("Error al subir la imagen")
        })

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
            if( ubicacion.includes('items') ){
                dispatch( editarItem(datos) );
            } 
        } catch (e) {
            console.error( e );
        }

        dispatch( finishUpdate() );
        dispatch( startUpdateSuccess() );
        setTimeout( ()=>{ dispatch( finishUpdateSuccess() ) }, 1500 ); 
    }
}

export const aumentarCantidadCostoItem = (ubicacion, item, newItem ) => {
    return async( dispatch ) => {
        dispatch( startUpdate() );

        const sfDocRef = doc( db, ubicacion );
        try {
            const newItemDB = await runTransaction( db, async( transaction ) => {
                const sfDoc = await transaction.get(sfDocRef);
                if(!sfDoc.exists()){
                    console.log( 'No se encontro el documento' );
                }else{
                    let itemDB = sfDoc.data();
                    const newCantidad = itemDB.cantidad + newItem.cantidadResivida;
                    const newCosto = cuatroDecimales(((itemDB.cantidad * itemDB.costo) + (newItem.cantidad * newItem.precio)) / (itemDB.cantidad + newItem.cantidad));
                    
                    itemDB.cantidad = newCantidad;
                    itemDB.costo = newCosto;
                    transaction.update(sfDocRef, { ...itemDB });
                    return ({...itemDB, id: sfDoc.id})
                }
            });
            dispatch( editarItem(newItemDB) );
        } catch (e) {
            console.error( e );
        }

        dispatch( finishUpdate() );
        dispatch( startUpdateSuccess() );
        setTimeout( ()=>{ dispatch( finishUpdateSuccess() ) }, 1500 ); 
    }
}

export const disminuirCantidadItem = (ubicacion, newItem ) => {
    return async( dispatch ) => {
        dispatch( startUpdate() );

        const sfDocRef = doc( db, ubicacion );
        try {
            const newItemDB = await runTransaction( db, async( transaction ) => {
                const sfDoc = await transaction.get(sfDocRef);
                if(!sfDoc.exists()){
                    console.log( 'No se encontro el documento' );
                }else{
                    let itemDB = sfDoc.data();
                    const newCantidad = itemDB.cantidad - parseInt(newItem.cantVenta);
                    
                    itemDB.cantidad = newCantidad;
                    transaction.update(sfDocRef, { ...itemDB });
                    return ({...itemDB, id: sfDoc.id})
                }
            });
            dispatch( editarItem(newItemDB) );
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

        if( ubicacion.includes('marcas') ){
            dispatch( eliminarMarca(id) );
        }else if( ubicacion.includes('categorias') ){
            dispatch( eliminarCategoria(id) );
        }else if( ubicacion.includes('medidas') ){
            dispatch( eliminarMedida(id) );
        }else if( ubicacion.includes('precios') ){
            dispatch( eliminarPrecio(id) );
        }else if( ubicacion.includes('items') ){
            dispatch( eliminarItem(id) );
        }

        dispatch( finishUpdate() );
    }

}

export const obtenerColeccionProductosFirebase = () => {
    return async( dispatch )=> {
        dispatch( startLoading() );

        let marcas = [];
        let categorias =[];
        let medidas = [];
        let precios = [];
        let items = [];

        // ITEMS
        const queryItems = query( collection( db, '/aplicaciones/productos/items' ), orderBy('num', 'asc') );
        const snapshotItems = await getDocs(queryItems);
        snapshotItems.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            items = [ documento, ...items ];
        });

        // MARCAS
        const queryMarcas = query( collection( db, '/aplicaciones/productos/marcas' ), orderBy('nombre', 'desc') );
        const snapshotMarcas = await getDocs(queryMarcas);
        snapshotMarcas.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            marcas = [ documento, ...marcas ];
        });
        
        // CATEGORIAS
        const queryCategorias = query( collection( db, '/aplicaciones/productos/categorias' ), orderBy('nombre', 'desc') );
        const snapshotCategorias = await getDocs(queryCategorias);
        snapshotCategorias.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            categorias = [ documento, ...categorias ];
        });
        
        
        // MEDIDAS
        const queryMedidas = query( collection( db, '/aplicaciones/productos/medidas' ), orderBy('nombre', 'desc') );
        const snapshotMedidas = await getDocs(queryMedidas);
        snapshotMedidas.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            medidas = [ documento, ...medidas ];
        });
        
        // PRECIOS
        const queryPrecios = query( collection( db, '/aplicaciones/productos/precios' ), orderBy('tipo', 'desc') );
        const snapshotPrecios = await getDocs(queryPrecios);
        snapshotPrecios.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            precios = [ documento, ...precios ];
        });

        dispatch( obtenerDatosProductos( {items, marcas, categorias, medidas, precios} ) );

        dispatch( finishLoading() );     
    }
}