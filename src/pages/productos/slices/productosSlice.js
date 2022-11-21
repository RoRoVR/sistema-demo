import { createSlice } from '@reduxjs/toolkit';

export const productosSlice = createSlice({
   name: 'productos',
   initialState: {
        cargandoAplicacion: false,
        actualizandoDatos: false,
        actualizacionExitosa: false,

        marcas: [],
        categorias:[],
        medidas: [],
        precios: [],

        items: [],
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

        agregarNuevoItem: ( state, action ) => {
            state.items = [ action.payload, ...state.items ];
        },
        editarItem: (state, action) => {
            // const newItems = state.items.filter(i => (i.id !== action.payload.id) ? i : action.payload );
            let newItems = [];
            state.items.map( i => {
                if( i.id === action.payload.id ){
                    newItems.push( action.payload );
                }else{
                    newItems.push( i );
                }
            } );
            // state.items = [ action.payload, ...newItems ];
            state.items = [ ...newItems ];

        },
        eliminarItem: (state, action) => {
            const newItems = state.items.filter(i => i.id !== action.payload );
            state.items = newItems;
        },

        agregarNuevaMarca: ( state, action ) => {
            state.marcas = [ action.payload, ...state.marcas ];
        },
        eliminarMarca: (state, action) => {
            const newMarcas = state.marcas.filter(p => p.id !== action.payload );
            state.marcas = newMarcas;
        },
        agregarNuevaCategoria: ( state, action ) => {
            state.categorias = [ action.payload, ...state.categorias ];
        },
        eliminarCategoria: (state, action) => {
            const newCategorias = state.categorias.filter(p => p.id !== action.payload );
            state.categorias = newCategorias;
        },
        agregarNuevaMedida: ( state, action ) => {
            state.medidas = [ action.payload, ...state.medidas ];
        },
        eliminarMedida: (state, action) => {
            const newMedidas = state.medidas.filter(p => p.id !== action.payload );
            state.medidas = newMedidas;
        },
        agregarNuevoPrecio: ( state, action ) => {
            state.precios = [ ...state.precios, action.payload ];
        },
        eliminarPrecio: (state, action) => {
            const newPrecios = state.precios.filter(p => p.id !== action.payload );
            state.precios = newPrecios;
        },
        obtenerDatosProductos: ( state, action ) => {
            state.items = action.payload.items;
            state.marcas = action.payload.marcas;
            state.categorias = action.payload.categorias;
            state.medidas = action.payload.medidas;
            state.precios = action.payload.precios;
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
} = productosSlice.actions;