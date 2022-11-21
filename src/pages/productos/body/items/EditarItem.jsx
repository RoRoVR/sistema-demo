import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from 'react';
import { upperCamelCase, tipoOracion, objetoMinusculas } from '../../../../helpers/textConfig';
import { useFormik } from "formik";
import { editarDocumentoConArchivoFireBase, editarDocumentoFirebase, eliminarDocumentoFirebase } from "../../slices/productosThunk";
import { AlertNotification } from "../../components/AlertNotification";
import { cuatroDecimales } from "../../../../helpers/numConfig";
import { RegistrarCategorias } from "../../windows/RegistrarCategorias";
import { RegistrarMarcas } from "../../windows/RegistrarMarcas";
import { RegistrarMedidas } from "../../windows/RegistrarMedidas";
import { useFormList } from "../../../../hooks/useFormList";

export const EditarItem = ({item, activeItemEdition, setActiveItemEdition}) => {
  
  const { cantidad, cantidadMinima, categoria, costo, habilitado, id, imgUrl, marca, medida, modelo, nombre, preciosVenta, procedencia } = item;
  const { actualizandoDatos, actualizacionExitosa, marcas, categorias, medidas, precios } = useSelector( s => s.productos );
  const dispatch = useDispatch();
  
  const editPreciosVenta = precios.map(p => {
    for (let i = 0; i < preciosVenta.length; i++) {
      if( preciosVenta[i].tipo === p.tipo ){
        return preciosVenta[i]
      }    
    }
    return {tipo: p.tipo, precio: 0}
  });
  const [formValues, handleInputChange] = useFormList( editPreciosVenta );

  const [errorNombre, setErrorNombre] = useState(false);
  const [errorModelo, setErrorModelo] = useState(false);
  const [alertNotification, setAlertNotification] = useState(false);
  const [modoEdit, setModoEdit] = useState(true);
  const [nuevaMarca, setNuevaMarca] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState(false);
  const [nuevaMedida, setNuevaMedida] = useState(false);
  const [nameFile, setNameFile] = useState('Sin imagen...');

  const [editImgUrl, setEditImgUrl] = useState(imgUrl);
  const [editInputFile, setEditInputFile] = useState('');
  const [editHabilitado, setEditHabilitado] = useState(habilitado)

  const inputFile = useRef();

  const obtenerDatosImagen = (e) => {
    const nombre = e.target.files[0].name;
    let url = URL.createObjectURL(e.target.files[0]);
    const archivo = inputFile.current.files[0];
    setEditInputFile( archivo );
    setEditImgUrl(url);
    setNameFile(nombre);
  }

  const eliminarItem = ()=>{
    const ubicacion = `/aplicaciones/productos/items/${id}`;
    dispatch( eliminarDocumentoFirebase( ubicacion, id ) )
  }

  const formulario = useFormik({
    initialValues:{
            nombre,
            marca,
            modelo,
            categoria,
            procedencia,
            cantidad,
            cantidadMinima,
            medida,
            costo,
    }, onSubmit: (values) => {
      if( values.nombre.length > 40 ){
        setErrorNombre(true);
      }else if( values.modelo.length > 8 ){
        setErrorModelo(true);
        setErrorNombre(false);
      }else{
        setErrorModelo(false);
        setErrorNombre(false);
        const newPreciosVenta = formValues.map( p => ({...p, precio: p.precio === ''? 0 : parseFloat(cuatroDecimales(p.precio))}) );
        // const newPreciosVenta = values.preciosVenta.map( p => ({...p, precio: cuatroDecimales(p.precio)}) );
        
        let newValues = { 
          habilitado:editHabilitado, 
          ...values, 
          cantidad: parseInt(values.cantidad), 
          cantidadMinima: parseInt( values.cantidadMinima ),
          costo: cuatroDecimales( values.costo ),
          preciosVenta: newPreciosVenta
        };
  
        const ubicacion = `/aplicaciones/productos/items/${id}`;
  
        if( editInputFile ) {
          // console.log(newValues);
          dispatch( editarDocumentoConArchivoFireBase(ubicacion, newValues, editInputFile) ); 
        }else{
          // console.log(newValues);
          newValues.imgUrl = imgUrl;
          dispatch( editarDocumentoFirebase( ubicacion, newValues ) );
        }
      }
    }
  })

  return (

    <>
      
      <div className="window" >

          {/* VENTANAS */}
          {nuevaMarca&&
          <RegistrarMarcas nuevaMarca={nuevaMarca} setNuevaMarca={setNuevaMarca} />
          }
          {nuevaCategoria&&
          <RegistrarCategorias nuevaCategoria={nuevaCategoria} setNuevaCategoria={ setNuevaCategoria } />
          }
          {nuevaMedida&&
          <RegistrarMedidas nuevaMedida={nuevaMedida} setNuevaMedida={setNuevaMedida} />

          }
          { alertNotification&& 
            <AlertNotification 
            alertNotification = {alertNotification} 
            setAlertNotification={setAlertNotification} 
            titulo={`Eliminar ${item.marca}-${item.modelo}`} 
            mensaje={`Estas a punto de eliminar ${item.marca.toUpperCase()}-${item.modelo} ¿Deseas continuar? `} 
            funcion={eliminarItem} 
            />
          }


          <form className="window-container" onSubmit={formulario.handleSubmit}>
            <div className="window-head">
                <span>Detalles de Producto</span>
                <div className="btn-exit" onClick={ () => { setActiveItemEdition(!activeItemEdition) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>


            <div className="window-body">
              <div className='container-fluid'>
                <div className="row">
                    <div className="col d-flex flex-column justify-content-center align-items-center">
                      <div className='preview-img mb-3' >
                        <img src={editImgUrl}/>
                      </div>

                      <div className='input-file mb-4' >
                        <div className='input-file-title' >
                          <i className="bi bi-cloud-arrow-up-fill"></i>
                          <span className='m-0' >{ nameFile }</span>
                        </div>
                        <input type="file" id='imgUrl'accept='image/*' ref={inputFile} onChange={obtenerDatosImagen} disabled={modoEdit} />
                      </div >

                      <div 
                      className={editHabilitado ? 'input-state' : 'input-state active'} 
                      onClick={modoEdit ? ()=>{}:() => { setEditHabilitado(!editHabilitado) }} >
                        <div className="bar">
                          <div className="circle">
                            <div className="circle-2"></div>
                          </div>
                        </div>
                        <div className='input-state-text' >{ editHabilitado ? 'Habilitado':'Desabilitado' }</div>
                      </div>
                    </div>

                    <div className="col mb-2">
                      <div>
                        <label htmlFor="nombre">Nombre:</label>
                        <input 
                        type="text" 
                        className='form-control py-1'
                        id='nombre'
                        name='nombre'
                        autoComplete='off'
                        onChange={formulario.handleChange}
                        value={ formulario.values.nombre }
                        disabled={modoEdit}
                        />
                        {errorNombre&& <span className='text-danger'>Solo se admite un máximo de 40 caracteres.</span>}
                      </div>

                      <div className="row">
                        <div className="col-6 mb-2">
                          <label className='me-3' htmlFor="marca">Marca: </label>
                          <span className='text-primary' style={{ cursor:'pointer' }} onClick={ () => { setNuevaMarca(!nuevaMarca) } } >agregar...</span>
                          <select 
                          className="form-select form-select py-1"
                          id='marca'
                          name='marca'
                          onChange={formulario.handleChange}
                          value={ formulario.values.marca }
                          disabled={modoEdit}
                          >
                            <option value=''>Sin marca</option>
                            {
                              marcas.map( m => (
                                <option key={m.id} value={m.nombre}>{ upperCamelCase( m.nombre )}</option>
                              ) )
                            }
                          </select>         
                        </div>
                          <div className='col-6 mb-2' >
                            <label htmlFor="modelo">Modelo:</label>
                            <input 
                            type="text" 
                            className='form-control py-1'
                            id='modelo'
                            name='modelo'
                            onChange={formulario.handleChange}
                            value={ formulario.values.modelo }
                            disabled={modoEdit}
                            />
                            {errorModelo&& <span className='text-danger'>Solo se admite un máximo de 8 caracteres.</span>}
                          </div>
                      </div>

                      <div className="col mb-2">
                        <label className='me-3' htmlFor="categoria">Categoria: </label>
                        <span className='text-primary' style={{ cursor:'pointer' }} onClick={ () => { setNuevaCategoria(!nuevaCategoria) } } >agregar...</span>
                        <select 
                        className="form-select form-select py-1"
                        id='categoria'
                        name='categoria'
                        onChange={formulario.handleChange}
                        value={ formulario.values.categoria }
                        disabled={modoEdit}
                        >
                          <option value=''>Sin categoria</option>
                            {
                              categorias.map( c => (
                                <option key={c.id} value={c.nombre}>{ upperCamelCase( c.nombre )}</option>
                              ) )
                            }
                        </select>         
                      </div>

                      <div className="col mb-2">
                        <label htmlFor="procedencia">Procedencia:</label>
                        <input 
                        type="text" 
                        className='form-control py-1'
                        id='procedencia'
                        name='procedencia'
                        autoComplete='off'
                        onChange={formulario.handleChange}
                        value={ formulario.values.procedencia }
                        disabled={modoEdit}
                        />
                      </div>

                      <div className="row">
                        <div className="col-6 mb-2">
                          <label htmlFor="cantidad">Cantidad:</label>
                          <input 
                          type="number"
                          step='1'
                          className='form-control py-1'
                          id='cantidad'
                          name='cantidad'
                          autoComplete='off'
                          onChange={formulario.handleChange}
                          value={ formulario.values.cantidad }
                          disabled={modoEdit}
                          />
                        </div>
                        <div className="col-6 mb-2">
                          <label htmlFor="cant-min">Cantidad minima:</label>
                          <input 
                          type="number" 
                          step='1'
                          className='form-control py-1'
                          id='cantidadMinima'
                          name='cantidadMinima'
                          autoComplete='off'
                          onChange={formulario.handleChange}
                          value={ formulario.values.cantidadMinima }
                          disabled={modoEdit}
                          />
                      </div>
                      </div>
                      
                    </div>

                    <div className="col">
                      <div className="row">
                          <div className="col-6 mb-2">
                            <label className='me-3' htmlFor="medida">Medida: </label>
                            <span className='text-primary' style={{ cursor:'pointer' }} onClick={()=>{ setNuevaMedida( !nuevaMedida ) }}  >agregar...</span>
                            <select 
                            className="form-select form-select py-1"
                            id='medida'
                            name='medida'
                            onChange={formulario.handleChange}
                            value={ formulario.values.medida }
                            disabled={modoEdit}
                            >
                              <option value=''>Sin medida</option>
                              {
                                medidas.map( m => (
                                  <option key={m.id} value={m.nombre}>{ upperCamelCase( m.nombre ) }</option>
                                ) )
                              }
                            </select>         
                          </div>

                          <div className='col-6 mb-2' >
                            <label htmlFor="precio">Costo:</label>
                            <input 
                            type="number" 
                            className='form-control py-1'
                            id='costo'
                            name='costo'
                            autoComplete='off'
                            onChange={formulario.handleChange}
                            value={ formulario.values.costo }
                            disabled={modoEdit}
                            />
                          </div>

                          <div>
                            <p className='fw-bold' >Precios de venta: </p>
                            {
                              formValues.map((p, index) => (
                                <div key={index} className="row">
                                  <div className="col-5">{ tipoOracion(p.tipo) }: </div>
                                  <div className="col-6">
                                    <div className="input-group mb-3">
                                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" style={{zIndex: '2000'}} >
                                        {formulario.values.costo !== ''?
                                        parseFloat((((p.precio - formulario.values.costo) * 100) / formulario.values.costo).toFixed(1))
                                        :
                                        '-'
                                        }%
                                      </span>
                                      <span className="input-group-text" id="basic-addon1">Bs</span>
                                      <input 
                                        type="number" 
                                        min='0'
                                        className="form-control py-1" 
                                        placeholder={`${ p.precio }`}
                                        name={`precio_${index}`}
                                        id={`precio_${index}`}
                                        onChange={handleInputChange}
                                        step='0.0001'
                                        value={ p.precio }
                                        disabled={ modoEdit }
                                      />
                                    </div>
                                  </div>
                                </div>

                              ))
                              // editPreciosVenta.map((p, index) => (
                              //   <div key={index} className="row">
                              //     <div className="col-5">{ tipoOracion(p.tipo) }: </div>
                              //     <div className="col-7">
                              //       <div className="input-group mb-3">
                              //         <span className="input-group-text" id="basic-addon1">Bs</span>
                              //         <input 
                              //           type="number" 
                              //           min='0'
                              //           className="form-control py-1" 
                              //           placeholder={`${ p.precio }`}
                              //           name={`preciosVenta.${index}.precio`}
                              //           id={`preciosVenta.${index}.precio`}
                              //           onChange={formulario.handleChange}
                              //           step='0.0001'
                              //           value={ index.precio }
                              //           disabled={modoEdit}
                              //         />
                              //       </div>
                              //     </div>
                              //   </div>

                              // ))
                            }
                          </div>

                        </div>
                      
                    </div>
                </div>
              </div>
            </div>

            <div className="window-footer">
                  {
                    modoEdit ?

                    <div className="row">
                      <div className="col">
                        <div className="btn btn-secondary mx-3" onClick={()=>{ setModoEdit(!modoEdit) }} > Modo edicion </div>
                        <div className="btn btn-danger" onClick={()=>{ setAlertNotification(!alertNotification) }} > Eliminar </div>
                      </div>
                    </div>
                    :
                    <div className="row">
                      <div className="col">
                      <button className="btn btn-danger mx-3" onClick={()=>{ setModoEdit(!modoEdit) }}  > No editar </button>
                        <button type="submit" className="btn btn-success"  >
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
                        
                      </div>
                    </div>
                  }

                </div>
          </form>

      </div>


      
    </>
  )
}
