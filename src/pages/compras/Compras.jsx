import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "../../hooks/useForm";
import { obtenerColeccionProductosFirebase } from "../productos/slices/productosThunk";

import { Body } from "./body/Body"
import { Footer } from "./footer/Footer"
import { Header } from "./header/Header"
import { obtenerColeccionComprasPorFecha, obtenerColeccionComprasProveedores } from "./slices/comprasThunk";

export const Compras = () => {
  const dispatch = useDispatch();

  const date = new Date();
  const primer = new Date(date.getFullYear(), date.getMonth(), 1);
  const ultimo = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const initialState = {
    filtro: '',
    proveedor: '',
    // fechaInicio: `${ primer.toISOString().split('.')[0] }`,
    fechaInicio: `${ primer.toISOString().split('T')[0]}`,
    fechaFinal:`${ ultimo.toISOString().split('T')[0]}`
  };
  const [ valuesObj, handleInputChangeObj, valueManual ] = useForm( initialState );

  useEffect(() => {
    dispatch( obtenerColeccionComprasProveedores() );
    dispatch( obtenerColeccionComprasPorFecha(valuesObj.fechaInicio, valuesObj.fechaFinal) );
    dispatch( obtenerColeccionProductosFirebase() );
  }, [])
  
  return (
    <div>
      <Header valuesObj = { valuesObj } handleInputChangeObj={handleInputChangeObj} />
      <Body valuesObj = { valuesObj } />
      <Footer valuesObj = { valuesObj } />
    </div>
  )
}
