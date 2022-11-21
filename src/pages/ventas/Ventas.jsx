import { useFormik } from "formik";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerColeccionProductosFirebase } from "../productos/slices/productosThunk";
import { Body } from './body/Body';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import { obtenerColeccionVentas, obtenerConfiguracionVentas } from "./slices/ventasThunk";

export const Ventas = () => {
  const dispatch = useDispatch();
  const { items } = useSelector( s => s.ventas );


  const busqueda = useFormik({
    initialValues: {
      buscar:'',
      marca:'',
      categoria:''
    }
  });

  useEffect(() => {
    dispatch( obtenerColeccionProductosFirebase() );
    dispatch( obtenerColeccionVentas() );
    dispatch( obtenerConfiguracionVentas() );
  }, [])
  

  return (
    <div>
        <Header
        buscar={busqueda.values.buscar}
        marca={busqueda.values.marca}
        categoria={busqueda.values.categoria}
        handleChange={ busqueda.handleChange }
        />
        <Body
        buscar={busqueda.values.buscar}
        marca={busqueda.values.marca}
        categoria={busqueda.values.categoria}
        items={items}
        />
        <Footer/>
    </div>
  )
}
