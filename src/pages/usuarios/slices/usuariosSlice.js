import { createSlice } from '@reduxjs/toolkit';

export const usuariosSlice = createSlice({
    name: 'usuarios',
    initialState: {
        cargandoAplicacion: false,
        actualizandoDatos: false,
        actualizacionExitosa: false,

        usuarios: [],
    },
    reducers: {
        startLoading: (state) => {
            state.cargandoAplicacion = true;
        },
        finishLoading: (state) => {
            state.cargandoAplicacion = false;
        },
        startUpdate: ( state ) => {
            state.actualizandoDatos = true;
        },
        finishUpdate: ( state ) => {
            state.actualizandoDatos = false;
        },
        startUpdateSuccess: ( state ) => {
            state.actualizacionExitosa = true;
        },
        finishUpdateSuccess: ( state ) => {
            state.actualizacionExitosa = false;
        },

        editarUsuario: (state, action) => {
            // const newItems = state.items.filter(i => (i.id !== action.payload.id) ? i : action.payload );
            let newUsuarios = [];
            state.usuarios.map( u => {
                if( u.id === action.payload.id ){
                    newUsuarios.push( action.payload );
                }else{
                    newUsuarios.push( u );
                }
            } );
            // state.items = [ action.payload, ...newItems ];
            state.usuarios = [ ...newUsuarios ];
        },

        obtenerDatosUsuarios: (state, action) => {
            state.usuarios = action.payload.usuarios;
        },
        agregarNuevoUsuario: (state, action) => {
            state.usuarios = [ action.payload, ...state.usuarios ];
        }
    }
});

export const {
    startLoading, 
    finishLoading, 
    startUpdate,
    finishUpdate,
    startUpdateSuccess,
    finishUpdateSuccess,

    editarUsuario,

    obtenerDatosUsuarios,
    agregarNuevoUsuario,

} = usuariosSlice.actions;