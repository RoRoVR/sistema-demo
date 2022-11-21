import { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { dosDecimales } from '../../../helpers/numConfig';

import { upperCamelCase, tipoOracion } from '../../../helpers/textConfig';


export const FormRegistrar = (
  {setNuevaMarca, setNuevaCategoria, setNuevaMedida, imgUrl,setImgUrl,setInputFile,habilitado,setHabilitado,nombre,marca,modelo,categoria,procedencia,cantidad,cantidadMinima,medida,costo,preciosVenta,handleChange, modeloRepetido, errorNombre, errorModelo, formValues, handleInputChange}
  ) => {
  const [nameFile, setNameFile] = useState('Sin imagen...');

  const inputFile = useRef();

  const { marcas, categorias, medidas } = useSelector( s => s.productos );

    // Cambia el texto del espacio donde subir la imagen
    const obtenerDatosImagen = (e) => {
      const nombre = e.target.files[0].name;
      let url = URL.createObjectURL(e.target.files[0]);
      const archivo = inputFile.current.files[0];
      setInputFile( archivo );
      setImgUrl(url);
      setNameFile(nombre);
    }

  return (
    <>
      <div className='container-fluid ' >
        <div className="row">
          <div className="col d-flex flex-column justify-content-center align-items-center">
            <div className='preview-img mb-3' >
              <img src={imgUrl}/>
            </div>

            <div className='input-file mb-4' >
              <div className='input-file-title' >
                <i className="bi bi-cloud-arrow-up-fill"></i>
                <span className='m-0' >{ nameFile }</span>
              </div>
              <input type="file" id='imgUrl'accept='image/*' ref={inputFile} onChange={obtenerDatosImagen} />
            </div >

            <div className={habilitado ? 'input-state' : 'input-state active'} onClick={() => setHabilitado(!habilitado)} >
              <div className="bar">
                <div className="circle">
                  <div className="circle-2"></div>
                </div>
              </div>
              <div className='input-state-text' >{ habilitado ? 'Habilitado':'Desabilitado' }</div>
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
              onChange={ handleChange }
              value={ nombre }
              autoComplete='off'
              required
              />
              {errorNombre&& <span className='text-danger'>Solo se admite un máximo de 40 caracteres.</span>}
            </div>

            <div className="row">
              <div className="col-6 mb-2">
                <label className='me-3' htmlFor="marca">Marca: </label>
                <span className='text-primary' style={{ cursor:'pointer' }} onClick={ () => { setNuevaMarca(s => !s) } } >agregar...</span>
                <select 
                className="form-select form-select py-1"
                id='marca'
                name='marca'
                onChange={ handleChange }
                value={ marca }
                required
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
                  {modeloRepetido ?
                    <label className='text-danger' htmlFor="modelo">Modelo duplicado:</label>
                    :
                    <label htmlFor="modelo">Modelo:</label>
                  }
                  
                  <input 
                  type="text" 
                  className={ modeloRepetido ? 'form-control py-1 border-danger':'form-control py-1' }
                  id='modelo'
                  name='modelo'
                  onChange={ handleChange }
                  value={ modelo }
                  autoComplete='off'
                  required
                  />
                  {errorModelo&& <span className='text-danger'>Solo se admite un máximo de 8 caracteres.</span>}
                </div>
            </div>

            <div className="col mb-2">
              <label className='me-3' htmlFor="categoria">Categoria: </label>
              <span className='text-primary' style={{ cursor:'pointer' }} onClick={ () => { setNuevaCategoria(s => !s) } } >agregar...</span>
              <select 
              className="form-select form-select py-1"
              id='categoria'
              name='categoria'
              onChange={ handleChange }
              value={ categoria }
              required
              >
                <option value='' >Sin categoria</option>
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
              onChange={ handleChange }
              value={ procedencia }
              autoComplete='off'
              />
            </div>

            <div className="row">
              <div className="col-6 mb-2">
                <label htmlFor="cantidad">Cantidad:</label>
                <input 
                type="number" 
                step="1"
                className='form-control py-1'
                id='cantidad'
                name='cantidad'
                onChange={ handleChange }
                value={ cantidad }
                autoComplete='off'
                required
                />
              </div>
              <div className="col-6 mb-2">
                <label htmlFor="cant-min">Cantidad minima:</label>
                <input 
                type="number" 
                step="1"
                className='form-control py-1'
                id='cantidadMinima'
                name='cantidadMinima'
                onChange={ handleChange }
                value={ cantidadMinima }
                autoComplete='off'
                required
                />
            </div>
            </div>
            
          </div>

          <div className="col">
            <div className="row">
                <div className="col-6 mb-2">
                  <label className='me-3' htmlFor="medida">Medida: </label>
                  <span className='text-primary' style={{ cursor:'pointer' }} onClick={()=>{ setNuevaMedida( s => !s ) }}  >agregar...</span>
                  <select 
                  className="form-select form-select py-1"
                  id='medida'
                  name='medida'
                  onChange={ handleChange }
                  value={ medida }
                  required
                  >
                    <option value=''>Medida</option>
                    {
                      medidas.map( m => (
                        <option key={m.id} value={m.nombre}>{ upperCamelCase( m.nombre )}</option>
                      ) )
                    }
                  </select>         
                </div>

                <div className='col-6 mb-2' >
                  <label htmlFor="precio">Costo:</label>
                  <input 
                  type="number" 
                  className='form-control py-1'
                  step='0.0001'
                  id='costo'
                  name='costo'
                  onChange={ handleChange }
                  value={ costo }
                  autoComplete='off'
                  required
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
                            {(costo !== '')?
                            parseFloat((((p.precio - costo) * 100) / costo).toFixed(1))
                            :
                            '-'
                            }%
                          </span>
                            <span className="input-group-text" id="basic-addon1">Bs</span>
                            <input 
                              type="number" 
                              min='0'
                              className="form-control py-1" 
                              step='0.0001'
                              name={`precio_${index}`}
                              id={`precio_${index}`}
                              onChange={handleInputChange}
                              value={p.precio}
                            />
                          </div>
                        </div>
                      </div>

                    ))
                  }
                </div>

              </div>
            
          </div>
        </div>
      </div>
    </>
  )
}
