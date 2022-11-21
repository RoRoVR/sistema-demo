import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { guardarDocumentoReportes } from "../../../reportes/slices/reportesThunk";
import { registrarPagoCompra } from "../../slices/comprasThunk";
import { generarFechaHoraAMD } from "../../../../helpers/dateConfig";
import { useState } from "react";

export const PagarSaldo = ({setPagarSaldo, compra}) => {
    const { nombre, uid } = useSelector(s => s.login);
    const { actualizandoDatos, actualizacionExitosa } = useSelector(s => s.reportes);
    const dispatch = useDispatch();
    const [errorMonto, setErrorMonto] = useState(false);

    const formulario = useFormik({
        initialValues:{
            monto: '',
            detalle:''
        },onSubmit: (v) => {  
            
            if( v.monto <= ( compra.total - calcularPagos() ) ){
                setErrorMonto( false );
                const ubicacionReportes = '/reportes';
                const ubicacionCompra = `/aplicaciones/compras/compras/${compra.id}`;
                const date = Date.now();
                const usuario = {nombre, uid};
                const newValues = { ...v, fecha: date , usuario, tipo: 'compras', idDetalle: compra.id }
    
                // solo le damos como datos el pago que se esta registrando, para que los pagos no se dupliquen en DB
                const newCompra = {...compra, saldoPagos: [ {...newValues} ]}
    
                dispatch( guardarDocumentoReportes(ubicacionReportes, newValues) ); 
                dispatch( registrarPagoCompra( ubicacionCompra, newCompra ) );
            }else{
                setErrorMonto( true );
            }
            
        }
    });

    const calcularPagos = () => {
        let saldo = 0;
        compra.saldoPagos.forEach(p => {
            saldo += p.monto           
        });
        return saldo;
    }


  return (
    <div className='window'>
        <div className="window-container">
            <div className="window-head">
                <span>PAGOS DE COMPRA Nº{(compra.numero)} </span>
                <div className="btn-exit" onClick={ () => { setPagarSaldo(s => !s) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>
            <div className="window-body">
                <table className="table" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>FECHA</th>
                            <th>CANCELADO POR</th>
                            <th>DETALLE</th>
                            <th>MONTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        { (compra.saldoPagos.length === 0)&&
                            <tr>
                                <td colSpan='5' className="text-center" > Aun no se realizaron pagos</td>
                            </tr>                 
                        }

                        {compra.saldoPagos.map((p, index) => (
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
                            <td className="text-end py-0"  >{ compra.total - calcularPagos() } Bs.</td>
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
                                onChange={formulario.handleChange}
                                value={ formulario.values.monto }
                                disabled={compra.total - calcularPagos() <= 0}
                                required
                                />
                            </div>
                        </div>

                        <div className="col-8">
                            <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            name="detalle"
                            onChange={formulario.handleChange} 
                            value={ formulario.values.detalle }
                            disabled={compra.total - calcularPagos() <= 0}
                            />
                        </div>
                        <div className="col-2 d-flex justify-content-start">
                            <button type='submit' className="btn btn-success btn-sm me-2" 
                            disabled={actualizandoDatos || (compra.total - calcularPagos() <= 0)} 
                            >
                                { actualizandoDatos &&
                                    <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                }
                                { actualizacionExitosa &&
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                }
                                Pagar
                            </button>
                        </div>
                        {(compra.total - calcularPagos() <= 0)&&
                        <div className="col">
                            <span className="text-success fw-bold" >La compra fue cancelada en su totalidad.</span>
                        </div>
                        }
                        {errorMonto&&
                        <div className="col">
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
