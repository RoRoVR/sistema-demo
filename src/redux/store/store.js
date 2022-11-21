import { configureStore } from "@reduxjs/toolkit";
import { productosSlice } from "../../pages/productos/slices/productosSlice";
import { loginSlice } from "../../pages/login/slices/loginSlice";
import { comprasSlice } from "../../pages/compras/slices/comprasSlice";
import { almacenSlice } from "../../pages/almacen/slices/almacenSlice";
import { usuariosSlice } from "../../pages/usuarios/slices/usuariosSlice";
import { ventasSlice } from "../../pages/ventas/slices/ventasSlice";
import { reportesSlice } from "../../pages/reportes/slices/reportesSlice";


export const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        productos: productosSlice.reducer,
        compras: comprasSlice.reducer,
        almacen: almacenSlice.reducer,
        usuarios: usuariosSlice.reducer,
        ventas: ventasSlice.reducer,
        reportes: reportesSlice.reducer
    }

})