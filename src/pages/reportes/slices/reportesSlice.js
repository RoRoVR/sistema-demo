import { createSlice } from '@reduxjs/toolkit';

export const reportesSlice = createSlice({
    name: 'reportes',
    initialState: {
        cargandoAplicacion: false,
        actualizandoDatos: false,
        actualizacionExitosa: false,

        reportes: []
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

        agregarNuevoReporte: ( state, action ) => {
            state.reportes = [ ...state.reportes, action.payload ];
        },

        obtenerDatosReportes: ( state, action ) => {
            state.reportes = action.payload.reportes;
        },  
    },
});

export const {
    startLoading, 
    finishLoading, 
    startUpdate,
    finishUpdate,
    startUpdateSuccess,
    finishUpdateSuccess,

    agregarNuevoReporte,
    obtenerDatosReportes
} = reportesSlice.actions;