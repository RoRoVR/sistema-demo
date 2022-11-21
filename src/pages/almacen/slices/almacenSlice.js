import { createSlice } from '@reduxjs/toolkit';

export const almacenSlice = createSlice({
   name: 'almacen',
   initialState: {
        cargandoAplicacion: false,
        actualizandoDatos: false,
        actualizacionExitosa: false,
        tareasPendientes: []
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
        obtenerTareasPendientes : (state, action) => {
            state.tareasPendientes = action.payload.compras;
        }
   },
});

export const { 
    startLoading, 
    finishLoading, 
    startUpdate,
    finishUpdate,
    startUpdateSuccess,
    finishUpdateSuccess,
    obtenerDatosCompras,
    obtenerTareasPendientes,
} = almacenSlice.actions;