import { createSlice } from '@reduxjs/toolkit';

export const comprasSlice = createSlice({
   name: 'compras',
   initialState: {
        cargandoAplicacion: false,
        actualizandoDatos: false,
        actualizacionExitosa: false,
        indice: 0,

        proveedores: [],
        pedidos: [],
        compras: [],
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
        
        generarIndiceCompra: ( state, action ) => {
            state.indice = action.payload;
        },
        agregarNuevoProveedor: ( state, action ) => {
            state.proveedores = [ action.payload, ...state.proveedores ];
        },
        editarProveedor: (state, action) => {
            const newProveedores = state.proveedores.filter(p => p.id !== action.payload.id );
            state.proveedores = [ action.payload, ...newProveedores ];
        },
        eliminarProveedor: (state, action) => {
            const newProveedores = state.proveedores.filter(p => p.id !== action.payload );
            state.proveedores = newProveedores;
        },

        agregarNuevoPedido: ( state, action ) => {
            state.pedidos = [ action.payload, ...state.pedidos ];
        },
        editarPedido: (state, action) => {
            const newPedido = state.pedidos.filter(p => p.id !== action.payload.id );
            state.pedidos = [ action.payload, ...newPedido ];
        },
        eliminarPedido: (state, action) => {
            const newPedido = state.pedidos.filter(p => p.id !== action.payload );
            state.pedidos = newPedido;
        },

        agregarNuevaCompra: ( state, action ) => {
            state.compras = [ action.payload, ...state.compras ];
        },
        editarCompra: (state, action) => {
            const newCompra = state.compras.filter(p => p.id !== action.payload.id );
            state.compras = [ ...newCompra, action.payload, ];
        },
        eliminarCompra: (state, action) => {
            const newCompra = state.compras.filter(p => p.id !== action.payload );
            state.compras = newCompra;
        },

        obneterProveedoresCompras: ( state, action ) => {
            state.proveedores = action.payload.proveedores;
        },
        obtenerDatosCompras: ( state, action ) => {
            state.pedidos = action.payload.pedidos;
            state.compras = action.payload.compras;
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
    obneterProveedoresCompras,
    obtenerDatosCompras,
    
    generarIndiceCompra,
    agregarNuevoProveedor,
    editarProveedor,
    eliminarProveedor,

    agregarNuevoPedido,
    editarPedido,
    eliminarPedido,

    agregarNuevaCompra,
    editarCompra,
    eliminarCompra,

} = comprasSlice.actions;