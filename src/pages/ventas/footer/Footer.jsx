import { useState } from "react";
import { BuscarCliente } from "../windows/BuscarCliente";
import { Configuracion } from "../windows/Configuracion";
import { ListCotizaciones } from "../windows/ListCotizaciones";
import { ListGastos } from "../windows/ListGastos";
import { ListVentas } from "../windows/ListVentas";
import { NuevaCotizacion } from "../windows/NuevaCotizacion";


export const Footer = () => {
  const [configuracion, setConfiguracion] = useState(false);
  const [buscarCliente, setBuscarCliente] = useState(false);
  const [listCotizaciones, setListCotizaciones] = useState(false);
  const [listVentas, setListVentas] = useState(false);
  const [listGastos, setListGastos] = useState(false);


  return (
    <div className='aplication-footer' >
      {/* VENTAS */}
      {configuracion&&
        <Configuracion setConfiguracion={setConfiguracion} />
      }
      {buscarCliente&&
        <BuscarCliente setBuscarCliente={setBuscarCliente} />
      }
      {listVentas&&
        <ListVentas setListVentas={setListVentas} />
      }
      {listCotizaciones&&
        <ListCotizaciones setListCotizaciones={setListCotizaciones} />
      }
      {listGastos&&
      <ListGastos setListGastos={setListGastos} />
      }


      <div className="container-fluid">
        <div className="row">
          <div className="col-10">
            <div className="btn btn-primary ms-2" onClick={() => {setListVentas(!listVentas)}} >Ventas</div>
            <div className="btn btn-primary ms-2" onClick={() => {setListCotizaciones(!listCotizaciones)}} >Cotizaciones</div>
            <div className="btn btn-primary ms-2" onClick={() => {setBuscarCliente(!buscarCliente)}} >Clientes</div>
          </div>
          <div className="col-2 d-flex">

            <div className="btn btn-secondary ms-auto me-2" onClick={ () => { setListGastos(!listGastos) } } >Gastos</div>
            <div className="btn-icon-secondary" onClick={()=>{ setConfiguracion(!configuracion) }} ><i className="bi bi-gear-fill"></i></div>
          </div>
        </div>
      </div>
    </div>
  )
}
