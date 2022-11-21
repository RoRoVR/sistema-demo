import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { guardarDocumentoVentas } from "../slices/ventasThunk";


export const NuevoTipoGasto = ({setNuevoTipoGasto}) => {
    const { actualizandoDatos, actualizacionExitosa } = useSelector(s => s.ventas);
    const inputTipoGasto = useRef();
    const dispatch = useDispatch();

    const guardarTipoDeGasto = (e) => {
        e.preventDefault();
        const dato = {tipo: inputTipoGasto.current.value.toLowerCase()}
        const ubicacion = '/ventas/tiposGastos/tiposGastos';
        dispatch( guardarDocumentoVentas( ubicacion, dato ) );
    }
  return (
    <div className="window">
        <form className="window-container-sm" onSubmit={ guardarTipoDeGasto } >
            <div className="window-head">
                <span>REGISTRAR NUEVO TIPO DE GASTO</span>
                <div className="btn-exit" onClick={ () => { setNuevoTipoGasto(s => !s) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>
            <div className="window-body">
                <div>
                    <label htmlFor="tipo">Tipo de gasto</label>
                    <input type="text" id="tipo" className="form-control form-control-sm" autoComplete="off" required ref={inputTipoGasto} />
                </div>
            </div>
            <div className="window-footer">
                <button type="submit" className="btn btn-success me-2" disabled={ actualizandoDatos || actualizacionExitosa } >
                    { actualizandoDatos &&
                        <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                    { actualizacionExitosa &&
                            <i className="bi bi-check-circle-fill me-2"></i>
                    }
                    Guardar
                </button>
                <div className="btn btn-danger me-2" onClick={() => {setNuevoTipoGasto(s => !s)}} > Cancelar </div>
            </div>
        </form>
    </div>
  )
}
