import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, query, orderBy, getDocs, doc, runTransaction, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage, auth } from "../../../firebase/firebaseConfig";
import {
    startLoading, 
    finishLoading, 
    startUpdate,
    finishUpdate,
    startUpdateSuccess,
    finishUpdateSuccess,

    editarUsuario,

    obtenerDatosUsuarios,
    agregarNuevoUsuario,
} from "./usuariosSlice";



export const guardarDocumentoConArchivoUsuarios = ( ubicacion, datos, archivo ) => {
    return async( dispatch ) => {
        dispatch( startUpdate() );

        const storageRef = ref(storage, `/usuarios/${archivo.lastModified}-${archivo.name}`);
        await uploadBytes( storageRef, archivo )
        .then( async (snapshot) => {
            console.log('la imagen se cargo correctamente');

            const imgPath = snapshot.ref.fullPath;
            const imgRef = ref( storage, imgPath );
            await getDownloadURL( imgRef ) // Obtenemos el Link
            .then( imgUrl => {
                datos.imgUrl = imgUrl;
                dispatch( guardarDocumentoUsuarios( ubicacion, datos ) );
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

export const guardarDocumentoUsuarios = (ubicacion, datos) => {
    return async( dispatch, getState ) => {
        console.log('Guardando documento');
        dispatch( startUpdate() );


        createUserWithEmailAndPassword(auth, datos.email, datos.password)
        .then(async({user}) => {
            const newDatos = { ...datos, uid: user.uid }
            console.log(newDatos);
            // dispatch( mantenerSesionIniciada() );

            //Despues de registrar se inicia secion automaticamente con el nuevo usuario, asi q lo cerramos y volvemos a iniciar secion con el usuario q ya teniamos iniciado.
            const { login } = getState(s => s);
            const { email, password } = login;
            await signOut(auth).then(() => {
                signInWithEmailAndPassword( auth, email, password )
                .then(async() => {
                    const docRef = await addDoc( collection( db, ubicacion ), newDatos );
                    if( docRef.id ) {
                        newDatos.id = newDatos.id;
                        if ( ubicacion.includes('usuarios') ){
                            dispatch( agregarNuevoUsuario( newDatos ) );
                        }
                        dispatch( finishUpdate() );
                        dispatch( startUpdateSuccess() );
                        setTimeout( ()=>{ dispatch( finishUpdateSuccess() ) }, 1500 );              
                    }
                })                 
            })
        })
        .catch((e)=>{
            dispatch( finishUpdate() );
            console.log( e.code );
            console.log(e.message);
        });
    }
}

export const editarDocumentoUsuarios = (ubicacion, datos) => {
    return async(dispatch) => {
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
            if( ubicacion.includes('usuarios') ){
                dispatch( editarUsuario(datos) );
            } 
        } catch (e) {
            console.error( e );
        }

        dispatch( finishUpdate() );
        dispatch( startUpdateSuccess() );
        setTimeout( ()=>{ dispatch( finishUpdateSuccess() ) }, 1500 );
    }
}

export const obtenerColeccionUsuarios = () => {
    return async( dispatch ) => {
        dispatch ( startLoading() );

        let usuarios = [];

        //USUARIOS
        const queryUsuarios = query( collection( db, '/usuarios' ), orderBy('nombre', 'desc') );
        const snapshotUsuarios = await getDocs(queryUsuarios);
        snapshotUsuarios.forEach((doc) => {
            const documento = { id: doc.id, ...doc.data() };
            usuarios = [ documento, ...usuarios ];
        });

        dispatch( obtenerDatosUsuarios( {usuarios} ) );
        dispatch( finishLoading() );
    }
}