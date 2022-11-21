import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import { guardarDocumentoVentas, obtenerColeccionRegistroGastosPorFecha } from "../slices/ventasThunk";
import { upperCamelCase } from "../../../helpers/textConfig";
import { generarFechaHoraAMD } from "../../../helpers/dateConfig";
import { ReporteGastos } from "./ReporteGastos";

export const ListGastos = ({ setListGastos }) => {

    const date = new Date();
    const primer = new Date(date.getFullYear(), date.getMonth(), 1);
    const primerDia = primer.toISOString().split('T')[0];
    const ultimo = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const ultimoDia = ultimo.toISOString().split('T')[0];
    const dispatch = useDispatch();
    const { registroGastos, actualizandoDatos, actualizacionExitosa, tiposGasto } = useSelector(s => s.ventas);
    const { nombre, uid } = useSelector(s => s.login);

    const inputFechaIni = useRef();
    const inputFechaFin = useRef();
    const [reporteGastos, setReporteGastos] = useState(false);
    const [selectTipoGasto, setSelectTipoGasto] = useState('');

    const showRegistroGastos = registroGastos.filter(r => r.tipoGasto.includes(selectTipoGasto));

    useEffect(() => {
        dispatch( obtenerColeccionRegistroGastosPorFecha( primerDia, ultimoDia ) );      
    }, []);

    const formulario = useFormik({
        initialValues:{
            monto:'',
            detalle: '',
            tipoGasto:''
        },
        onSubmit: (v) => {
            const fecha = Date.now();
            const newGasto = {...v, fecha, usuario:{nombre, nombre, uid} };
            const ubicacion = '/ventas/registroGastos/gastos';

            console.log(newGasto);
            dispatch( guardarDocumentoVentas(ubicacion, newGasto) );
        }
    });
 
    const buscarPorFecha = () => {
        const i = inputFechaIni.current.value;
        const f = inputFechaFin.current.value;
        if( i !== '' || f !== '' ){
            dispatch( obtenerColeccionRegistroGastosPorFecha( i, f ) ); 
        }
    }

  return (
    <div className='window'>
        {/* VENTANAS */}
        {reporteGastos&&
            <ReporteGastos 
            setReporteGastos={setReporteGastos}
            registroGastos={showRegistroGastos}
            primerDia={inputFechaIni.current.value}
            ultimoDia={inputFechaFin.current.value}
            />
        }
        <div className="window-container">
            <div className="window-head">
                <span>LISTA DE GASTOS</span>
                <div className="btn-exit" onClick={ () => { setListGastos(s => !s) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>
            <div className="container-fluid">
            <div className="row my-3">
                <div className="col d-flex justify-content-start">
                    <label className='fw-bold text-end pe-2' htmlFor="fechaInicio"> Fecha inicial: </label>
                    <div className='me-4' >
                        <input 
                            type="date" 
                            className='form-control form-control-sm py-1'
                            autoComplete='off'
                            id='fechaInicio'
                            name='fechaInicio'
                            defaultValue={ primerDia }
                            ref={ inputFechaIni }
                        />
                    </div>
                    <label className='fw-bold text-end pe-2 ' htmlFor="fechaFinal"> Fecha final: </label>
                    <div className='me-4'>
                        <input 
                            type="date" 
                            className='form-control form-control-sm py-1'
                            autoComplete='off'
                            id='fechaFinal'
                            name='fechaFinal'
                            defaultValue={ ultimoDia }
                            ref={ inputFechaFin }
                        />
                    </div>
                    <div className=' d-flex justify-content-end me-4' >
                        <button 
                        type='button' 
                        className={ actualizandoDatos? 'btn btn-primary disabled': 'btn btn-primary' }
                        onClick={ buscarPorFecha }
                        >
                            { actualizandoDatos &&
                            <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            }
                                Filtrar
                        </button>
                    </div>
                    <div className="me-4">
                        <select 
                        className="form-select form-select-sm"
                        onChange={({target}) => { setSelectTipoGasto(target.value) }}             
                        value={selectTipoGasto}
                        >
                            <option value="">Todos los gastos</option>
                                {tiposGasto.map(t => (
                                    <option key={t.id} value={t.tipo}>{ upperCamelCase(t.tipo)}</option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className="col-4 d-flex justify-content-end ">
                    <div className=" btn btn-secondary" onClick={() => { setReporteGastos(!reporteGastos) }} > Reporte de gastos </div>
                </div>


            </div>
                {/* ENCABEZADO */}
                <div className="row bg-primary text-white fw-bold">
                    <div className="col-1">
                        <p className="m-0" >#</p>                        
                    </div>
                    <div className="col-2">
                        <p className="m-0" >FECHA</p>                        
                    </div>
                    <div className="col-2">
                        <p className="m-0" >USUARIO</p>                        
                    </div>
                    <div className="col-2">
                        <p className="m-0" >TIPO DE GASTO</p>                        
                    </div>
                    <div className="col-4">
                        <p className="m-0" >DETALLE</p>                        
                    </div>
                    <div className="col-1">
                        <p className="m-0">MONTO</p>
                    </div>
                </div>
            </div>
            
            <div className="window-body">
                <div className="container-fluid">
                    {(showRegistroGastos.length <= 0)&&
                        <div className="row">
                            <div className="col">
                                <p className="text-muted text-center" >No se encontro ningun registro de gastos...</p>
                            </div>
                        </div>
                    }
                    {showRegistroGastos.map( (v, index) => (
                        <div key={index} className='row mb-2 border rounded'>
                            <div className="col-1">
                                <p className="m-0" >{index+1}</p>                        
                            </div>
                            <div className="col-2">
                                <p className="m-0" >{generarFechaHoraAMD(v.fecha)}</p>                        
                            </div>
                            <div className="col-2">
                                <p className="m-0" >{v.usuario.nombre}</p>                        
                            </div>
                            <div className="col-2">
                                <p className="m-0" >{upperCamelCase(v.tipoGasto)}</p>                        
                            </div>
                            <div className="col-4">
                                <p className="m-0" >{v.detalle}</p>                        
                            </div>
                            <div className="col-1">
                                <p className="m-0">{v.monto}Bs.</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="window-footer">
                <form className="container-fluid" onSubmit={formulario.handleSubmit} >
                    <div className="row">
                        <div className="col-2">
                            <div className="input-group input-group-sm ">
                                <span className="input-group-text">Bs.</span>
                                <input 
                                type="number" 
                                className="form-control"
                                placeholder="Monto..."
                                name="monto"
                                id="monto"
                                onChange={formulario.handleChange}
                                value={ formulario.values.monto }
                                required
                                />
                            </div>
                        </div>
                        <div className="col-2">
                            <select 
                            name="tipoGasto" 
                            className="form-select form-select-sm"
                            onChange={formulario.handleChange}
                            value={formulario.values.tipoGasto}
                            required
                            >
                                <option value="">Tipo de gasto</option>
                                {tiposGasto.map(t => (
                                    <option key={t.id} value={t.tipo}>{ upperCamelCase(t.tipo)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-5">
                            <input type="text" 
                            className="form-control form-control-sm"
                            placeholder="Descripcion del gasto..."
                            name="detalle"
                            onChange={formulario.handleChange}
                            value={ formulario.values.detalle }
                            required  
                            />
                        </div>
                        <div className="col-3">
                            <button 
                            type="submit" 
                            className="btn btn-primary ms-2"
                            disabled={actualizandoDatos||actualizacionExitosa} 
                            >
                            { actualizandoDatos &&
                                <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                            { actualizacionExitosa &&
                                <i className="bi bi-check-circle-fill me-2"></i>
                            }
                                Nuevo gasto
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
  )
}
