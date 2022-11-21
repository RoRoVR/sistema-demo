import { createSlice } from "@reduxjs/toolkit"

export const ventasSlice = createSlice({
    name: 'ventas',
    initialState: {
        cargandoAplicacion: false,
        actualizandoDatos: false,
        actualizacionExitosa: false,
        indiceVenta: 0,
        indiceCotizacion: 0,

        configuracion: {},
        items:[],
        // newItems:[],
        tiposGasto:[],
        busquedaCliente:{
            encontrado: false,
            message:'',
            cliente:{}
        },
        verificandoCliente: false,
        errorNuevoCliente: false,
        errorClienteNoRegistrado: false,
        registroVentas:[],
        registroCotizaciones: [],
        registroGastos: [],
        registroClientes: [],
    },
    reducers:{
        agregarNuevaVenta: ( state, action ) => {
            state.registroVentas = [ action.payload, ...state.registroVentas ];
        },
        agregarNuevaCotizacion: ( state, action ) => {
            state.registroCotizaciones = [ action.payload, ...state.registroCotizaciones ];
        },
        agregarNuevoGasto: ( state, action ) => {
            state.registroGastos = [ action.payload, ...state.registroGastos ];
        },
        agregarNuevoTipoGasto: ( state, action ) => {
            state.tiposGasto = [ action.payload, ...state.tiposGasto ];
        },
        eliminarTipoGasto: ( state, action ) => {
            const newTiposGasto = state.tiposGasto.filter(g => g.id !== action.payload );
            state.tiposGasto = newTiposGasto;
        },
        agregarNuevoCliente: ( state, action ) => {
            state.registroClientes = [ action.payload, ...state.registroClientes ];
        },
        editarCliente:( state, action ) => {
            let newRegistroClientes = [];
            state.registroClientes.map( c => {
                if( c.id === action.payload.id ){
                    newRegistroClientes.push( action.payload );
                }else{
                    newRegistroClientes.push( c );
                }
            } );
            state.registroClientes = [ ...newRegistroClientes ];
        },
        obtenerListaVentas: ( state, action ) => {
            state.registroVentas = action.payload.registroVentas;
        },
        obtenerListaCotizaciones: ( state, action ) => {
            state.registroCotizaciones = action.payload.registroCotizaciones;
        },
        obtenerListaGastos: ( state, action ) => {
            state.registroGastos = action.payload.registroGastos;
        },
        obtenerListaClientes: ( state, action ) => {
            state.registroClientes = action.payload.registroClientes;
        },
        generarIndiceVenta: ( state, action ) => {
            state.indiceVenta = action.payload;
        },
        generarIndiceCotizacion: ( state, action ) => {
            state.indiceCotizacion = action.payload;
        },
        clienteEncontrado: (state, action) => {
            state.busquedaCliente = {
                encontrado: true,
                message:'',
                cliente:{...action.payload}
            };
        },
        clienteNoEncontrado: (state) => {
            state.busquedaCliente = {
                encontrado: false,
                message:'No se encontro al cliente',
                cliente:{}
            };
        },
        resetBusquedaCliente: (state) => {
            state.busquedaCliente = {
                encontrado: false,
                message:'',
                cliente:{}
            };
        },
        errorRegistrarCliente: (state) => {
            state.errorNuevoCliente = true;
        },
        noErrorRegistrarCliente: (state) => {
            state.errorNuevoCliente = false;
        },
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
        seleccionarItem: ( state, action ) => { // MARCA SELECT CON TRUE O FALSE, DEPENDIENDO A SI SE AGREGO O QUITO DE LA LISTA
            state.items = action.payload;
        },

        editarConfiguracion:(state, action) => {
            state.configuracion = {...action.payload};
        }, 
        editarVenta: (state, action) => {
            let newRegistroVentas = [];
            state.registroVentas.map( v => {
                if( v.id === action.payload.id ){
                    newRegistroVentas.push( action.payload );
                }else{
                    newRegistroVentas.push( v );
                }
            } );
            state.registroVentas = [ ...newRegistroVentas ];
        },
        obtenerConfiguracion: (state, action) => {
            state.configuracion = action.payload.configuracion;
        },
        obtenerDatosVentas: ( state, action ) => {
            state.items = action.payload.items;
            state.tiposGasto = action.payload.tiposGasto;
        },

    }
});

export const {
    agregarNuevaVenta,
    agregarNuevaCotizacion,
    agregarNuevoGasto,
    agregarNuevoTipoGasto,
    eliminarTipoGasto,
    agregarNuevoCliente,
    obtenerListaVentas,
    obtenerListaCotizaciones,
    obtenerListaGastos,
    obtenerListaClientes,
    generarIndiceVenta,
    generarIndiceCotizacion,
    clienteEncontrado,
    clienteNoEncontrado,
    resetBusquedaCliente,
    errorRegistrarCliente,
    noErrorRegistrarCliente,
    startLoading, 
    finishLoading, 
    startUpdate,
    finishUpdate,
    startUpdateSuccess,
    finishUpdateSuccess,

    editarConfiguracion,
    editarVenta,
    editarCliente,

    seleccionarItem,

    obtenerConfiguracion,
    obtenerDatosVentas,
} = ventasSlice.actions;