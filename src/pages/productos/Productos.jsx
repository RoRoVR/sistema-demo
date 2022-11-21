import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Body } from "./body/Body"
import { Footer } from "./footer/Footer"
import { Header } from "./header/Header"
import { obtenerColeccionProductosFirebase } from "./slices/productosThunk";
import { Configuraciones } from "./windows/Configuraciones";
import { RegistrarProducto } from "./windows/RegistrarProducto";

export const Productos = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch( obtenerColeccionProductosFirebase() );
  }, [])
  
  const [registrarProducto, setRegistrarProducto] = useState(false);
  const [windowConfig, setWindowConfig] = useState(false);
  const [reporte, setReporte] = useState(false);

  const [nuevaMarca, setNuevaMarca] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState(false);
  const [nuevaMedida, setNuevaMedida] = useState(false);
  const [nuevoPrecio, setNuevoPrecio] = useState(false);

  const busqueda = useFormik({
    initialValues: {
      buscar:'',
      marca:'',
      categoria:'',
      estado:''
    }
  });


  return (
    <div>

      {/* VENTANAS */}
      { registrarProducto && 
      <RegistrarProducto registrarProducto = { registrarProducto } setRegistrarProducto={setRegistrarProducto}/>
      }

      { windowConfig&& <Configuraciones
        windowConfig={windowConfig} setWindowConfig={setWindowConfig}
        nuevaMarca ={ nuevaMarca } setNuevaMarca={setNuevaMarca}
        nuevaCategoria={nuevaCategoria} setNuevaCategoria={setNuevaCategoria}
        nuevaMedida={nuevaMedida} setNuevaMedida={setNuevaMedida}
        nuevoPrecio={nuevoPrecio} setNuevoPrecio={setNuevoPrecio}
      /> }


      <Header
      buscar={busqueda.values.buscar}
      marca={busqueda.values.marca}
      categoria={busqueda.values.categoria}
      handleChange={ busqueda.handleChange }
      estado={busqueda.values.estado}
      />
      <Body
      buscar={busqueda.values.buscar}
      marca={busqueda.values.marca}
      categoria={busqueda.values.categoria}
      reporte = { reporte } setReporte = { setReporte }
      estado={busqueda.values.estado}
      />
      <Footer 
        registrarProducto = { registrarProducto } setRegistrarProducto={setRegistrarProducto}       
        windowConfig={windowConfig} setWindowConfig={setWindowConfig}
        reporte = { reporte } setReporte = { setReporte }    
      />   
    </div>
  )
}
