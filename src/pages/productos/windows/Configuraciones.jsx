import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertNotification } from "../components/AlertNotification";
import { eliminarDocumentoFirebase } from "../slices/productosThunk";
import { ConfiguracionItemCategorias } from "./configuracion-items/ConfiguracionItemCategorias";
import { ConfiguracionItemMarcas } from "./configuracion-items/ConfiguracionItemMarcas";
import { ConfiguracionItemMedidas } from "./configuracion-items/ConfiguracionItemMedidas";
import { ConfiguracionItemPrecios } from "./configuracion-items/ConfiguracionItemPrecios";
import { RegistrarCategorias } from "./RegistrarCategorias";
import { RegistrarMarcas } from "./RegistrarMarcas";
import { RegistrarMedidas } from "./RegistrarMedidas";
import { RegistrarPrecios } from "./RegistrarPrecios";

export const Configuraciones = (
    {   windowConfig,setWindowConfig,
        nuevaMarca, setNuevaMarca, 
        nuevaCategoria, setNuevaCategoria, 
        nuevaMedida, setNuevaMedida,
        nuevoPrecio, setNuevoPrecio}
    ) => {
    
        const { marcas, categorias, medidas, precios } = useSelector( s => s.productos );
        const dispatch = useDispatch();
        const [alertNotification, setAlertNotification] = useState(false);

        const eliminarDocumento = (ubicacion, id) => {
            console.log(ubicacion);
            console.log(id);
            // dispatch( eliminarDocumentoFirebase(`/aplicaciones/productos/marcas/${m.id}`, m.id))

        }

  return (
    <div className="window">

        {/* VENTANAS */}
        { nuevaMarca&& <RegistrarMarcas nuevaMarca={ nuevaMarca } setNuevaMarca={ setNuevaMarca } />}
        { nuevaCategoria&& <RegistrarCategorias nuevaCategoria={ nuevaCategoria } setNuevaCategoria={ setNuevaCategoria } /> }
        { nuevaMedida&& <RegistrarMedidas nuevaMedida={ nuevaMedida } setNuevaMedida={ setNuevaMedida } /> }
        { nuevoPrecio&& <RegistrarPrecios nuevoPrecio={ nuevoPrecio } setNuevoPrecio={ setNuevoPrecio } /> }

        <div className="window-container-md">
            <div className="window-head">
                <span>CONFIGURACIONES</span>
                <div className="btn-exit" onClick={ () => { setWindowConfig(!windowConfig) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body" >
                <div className="accordion accordion-flush" id="accordionFlushExample">

                    {/* MARCAS */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            <span className="fw-bold" >LISTA DE MARCAS</span>
                        </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <ul className="list-group list-group-flush" >
                                    {marcas.map(m => (<ConfiguracionItemMarcas 
                                    key={m.id} id={m.id} 
                                    nombre={m.nombre} 
                                    procedencia={m.procedencia} />))}
                                </ul>

                                <span 
                                className="text-primary" 
                                style={{ cursor:'pointer' }} 
                                onClick={()=>{setNuevaMarca(!nuevaMarca)}} 
                                >Registrar nueva marca...
                                </span>
                                
                            </div>
                        </div>
                    </div>

                    {/* CATEGORIAS */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            <span className="fw-bold" >LISTA DE CATEGORIAS</span>
                        </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">

                                <ul className="list-group list-group-flush" >
                                    {categorias.map(c => ( <ConfiguracionItemCategorias key={c.id} id={c.id} nombre={c.nombre} /> ))}
                                </ul>

                                <span 
                                className="text-primary" 
                                style={{ cursor:'pointer' }} 
                                onClick={()=>{setNuevaCategoria(!nuevaCategoria)}} 
                                >Registrar nueva categoria...
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* MEDIDAS */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            <span className="fw-bold" >LISTA DE MEDIDAS</span>
                        </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">

                                <ul className="list-group list-group-flush" >
                                    {medidas.map(m => ( <ConfiguracionItemMedidas key={m.id} id={m.id} nombre={m.nombre} /> ))}
                                </ul>                              


                                <span 
                                className="text-primary" 
                                style={{ cursor:'pointer' }} 
                                onClick={()=>{setNuevaMedida(!nuevaMedida)}} 
                                >Registrar nueva medida...
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                            <span className="fw-bold" >LISTA DE PRECIOS</span>
                        </button>
                        </h2>
                        <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">

                                <ul className="list-group list-group-flush" >
                                    {precios.map(p => ( <ConfiguracionItemPrecios key={p.id} id={p.id} tipo={p.tipo} /> ))}
                                </ul>   


                                <span 
                                className="text-primary" 
                                style={{ cursor:'pointer' }} 
                                onClick={()=>{setNuevoPrecio(!nuevoPrecio)}} 
                                >Registrar nuevo precio...
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
                


            </div>
        </div>
    </div>
  )
}
