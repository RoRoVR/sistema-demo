import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { generarFechaHoraAMD } from "../../../helpers/dateConfig";
import { registrarPagoVenta } from "../slices/ventasThunk";
import { guardarDocumentoReportes } from "../../reportes/slices/reportesThunk";
import { useState } from "react";


export const PagosVenta = ({setPagosVenta, venta}) => {
    const { nombre, uid } = useSelector(s => s.login);
    const { actualizandoDatos, actualizacionExitosa } = useSelector(s => s.reportes);
    const dispatch = useDispatch();
    const [errorMonto, setErrorMonto] = useState(false);

    const formulario = useFormik({
        initialValues:{
            monto: '',
            detalle:''
        },onSubmit: (v) => {  
            if( v.monto <= ( venta.total - calcularPagos() ) ){
                setErrorMonto( false );
                const ubicacionReportes = '/reportes';
                const ubicacionVenta = `/ventas/registroVentas/ventas/${venta.id}`;
                const date = Date.now();
                const usuario = {nombre, uid};
                const newValues = { ...v, fecha: date , usuario, tipo: 'ventas', idDetalle: venta.id }
    
                // solo le damos como datos el pago que se esta registrando, para que los pagos no se dupliquen en DB
                const newVenta = {...venta, pagos: [ {...newValues} ]}
                dispatch( guardarDocumentoReportes(ubicacionReportes, newValues) ); 
                dispatch( registrarPagoVenta( ubicacionVenta, newVenta ) );
            }else{
                setErrorMonto( true );
            }

        }
            
    });

    const calcularPagos = () => {
        let saldo = 0;
        venta.pagos.forEach(p => {
            saldo += p.monto           
        });
        return saldo;
    }
  return (
    <div className="window" >
        <div className="window-container">
            <div className="window-head">
                <span>REGISTRO DE PAGOS - VENTA Nº{ venta.numero }</span>
                <div className="btn-exit" onClick={ () => {setPagosVenta(s => !s)} } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body">
            <table className="table" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>FECHA</th>
                            <th>COBRADO POR</th>
                            <th>DETALLE</th>
                            <th>MONTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        { (venta.pagos.length === 0)&&
                            <tr>
                                <td colSpan='5' className="text-center"  > Aun no se realizaron pagos</td>
                            </tr>                 
                        }

                        {venta.pagos.map((p, index) => (
                            <tr key={index} >
                                <th>{index+1}</th>
                                <td>{ generarFechaHoraAMD(p.fecha) }</td>
                                <td>{p.usuario.nombre}</td>
                                <td>{p.detalle}</td>
                                <td className="text-end" >{p.monto} Bs.</td>
                            </tr>
                        ))
                        }
                        <tr >
                            <th colSpan='4' className="text-end pb-0"  > TOTAL PAGADO</th>
                            <td className="text-end pb-0"  >{ calcularPagos() } Bs.</td>
                        </tr> 
                        <tr>
                            <th colSpan='4' className="text-end py-0"  > SALDO RESTANTE</th>
                            <td className="text-end py-0"  >{venta.total - calcularPagos()} Bs.</td>
                        </tr>   
                    </tbody>

                </table>

                <form className="container" onSubmit={formulario.handleSubmit} >
                    <div className="row mt-3">
                        <div className="col-2 fw-bold ">MONTO</div>
                        <div className="col-9 fw-bold ">DETALLE</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-2">
                            <div className="input-group input-group-sm ">
                                <span className="input-group-text">Bs.</span>
                                <input 
                                type="number" 
                                className="form-control"
                                name="monto"
                                disabled={(calcularPagos() >= venta.total)}
                                onChange={formulario.handleChange}
                                value={ formulario.values.monto }
                                required
                                />
                            </div>
                        </div>

                        <div className="col-8">
                            <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            name="detalle"
                            disabled={(calcularPagos() >= venta.total)}
                            onChange={formulario.handleChange} 
                            value={ formulario.values.detalle }
                            />
                        </div>
                        <div className="col-2 d-flex justify-content-start">
                            <button 
                            type='submit' 
                            className="btn btn-success btn-sm me-2" 
                            disabled={(actualizandoDatos || calcularPagos() >= venta.total)} >
                                { actualizandoDatos &&
                                    <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                }
                                { actualizacionExitosa &&
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                }
                                Cobrar
                            </button>
                        </div>
                        {(venta.total - calcularPagos() <= 0)&&
                        <div className="col-12 text-center ">
                            <span className="text-success fw-bold" >La venta fue cancelada en su totalidad.</span>
                        </div>
                        }
                        {errorMonto&&
                        <div className="col-12 text-center  ">
                            <span className="text-danger fw-bold" >El monto debe ser menor al saldo restante.</span>
                        </div>
                        }

                    </div>
                </form>
            </div>
        </div>

    </div>
  )
}
