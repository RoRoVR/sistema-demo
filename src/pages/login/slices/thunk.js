import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebaseConfig";
import { cleanUser, errorLogin, setUser, startLoadingLogin, finishLoadingLogin } from "./loginSlice"

export const getUser = ( email, password) => {
    
    return async ( dispatch ) => {
        signInWithEmailAndPassword( auth, email, password )
        .then( ({user}) => { // LOGIN EXITOSO
            console.log("Login exitoso");
            dispatch( getUserByUid( user.uid ) );
        } )
        .catch( (error) => { //ERROR EL LOGIN
            // console.log( error.code );
            if( error.code == 'auth/user-not-found' ){
                dispatch( errorLogin( { input: 'email', message:'Usuario no encontrado' } ) ); 
            }else if( error.code == 'auth/wrong-password' ){
                dispatch( errorLogin( { input: 'password', message:'Contraseña Incorrecta' } ) );
            }
        } )
    }
}

export const getUserByUid = ( uid ) => {
    return async ( dispatch ) => {
        dispatch( startLoadingLogin() );

        const usuarios = await getDocs( collection( db, 'usuarios' ) );
        let usuarioVerificado = false;
        usuarios.forEach( user => {
            if ( user.data().uid == uid ){
                dispatch( setUser( user.data() ) );
                usuarioVerificado = true;
            }
        });
        if( !usuarioVerificado ){
            dispatch(finishLoadingLogin());
        }
    }
}

export const signOutUser = () => {
    
    return ( dispatch ) => {
        dispatch( startLoadingLogin() );

        signOut(auth).then(() => {
            dispatch( cleanUser() );
      
        }).catch((error) => {
          // An error happened.
        });
    }
}