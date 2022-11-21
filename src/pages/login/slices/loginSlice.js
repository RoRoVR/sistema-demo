import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({

    name: 'login',
    initialState: {
        cargando: true,
        error:{},
        cargo: '',
        nombre: '',
        contacto: '',
        permisos: {},
        uid: '',
        imgUrl:'',
        email:'',
        password:''

   },

   reducers: {
    startLoadingLogin : ( state, /*action*/ ) => {
        state.cargando = true;
    },
    finishLoadingLogin : ( state, /*action*/ ) => {
        state.cargando = false;
    },
    errorLogin : ( state, action ) => {
        state.cargando = false;
        state.error = action.payload;
    },
    setUser : ( state, action ) => {
        state.cargando = false;
        state.error = {};
        state.cargo = action.payload.cargo;
        state.nombre = action.payload.nombre;
        state.contacto = action.payload.contacto;
        state.permisos = action.payload.permisos;
        state.uid = action.payload.uid;
        state.imgUrl = action.payload.imgUrl;
        state.email = action.payload.email;
        state.password = action.payload.password;
    },
    cleanUser : ( state ) => {
        state.cargando = false;
        state.error = {};
        state.cargo = '';
        state.nombre = '';
        state.permisos = {};
        state.uid = null;
        state.imgUrl = '';
        state.email = '';
        state.password = '';
    }

   },
});

export const { startLoadingLogin, finishLoadingLogin, setUser, errorLogin, cleanUser } = loginSlice.actions;