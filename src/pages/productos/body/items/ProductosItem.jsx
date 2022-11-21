import { useState } from 'react';
import { EditarItem } from './EditarItem';

export const ProductosItem = ({item}) => {

    const { imgUrl, modelo,marca, nombre, cantidad } = item;
    const [activeItemEdition, setActiveItemEdition] = useState(false);

  return (
    <div className="acordeon-item">
        <div className="container-fluid p-0">
            <div className="row">
                {/* IMAGEN */}
                <div className="col-2 d-flex justify-content-center align-items-center ">
                    <div 
                        className='d-flex justify-content-center align-items-center rounded' 
                        style={{width:'160px', height:'110px', overflow:'hidden' }} 
                    >
                        <img src={imgUrl} style={{ width:'auto', height:'110px' }} />
                    </div>
                </div>
                
                {/* MODELO */}
                <div className="col-2 d-flex justify-content-center align-items-center ">{modelo.toUpperCase()}</div>

                {/* MARCA */}
                <div className="col-1 d-flex justify-content-center align-items-center ">{marca.toUpperCase()}</div>

                {/* NOMBRE */}
                <div className="col-5 d-flex justify-content-center align-items-center ">{nombre.toUpperCase()}</div>

                {/* CANTIDAD */}
                <div className="col-1 d-flex justify-content-center align-items-center ">{cantidad}</div>


                {/* MAS */}
                <div className="col-1 d-flex justify-content-center align-items-center ">

                    <button 
                    className='btn-icon-white' 
                    onClick={()=>{ setActiveItemEdition(!activeItemEdition) }}
                    > 
                        <i className="bi bi-three-dots"></i> 
                    </button>
                    {/* <button 
                    className= {activeItemEdition ? "btn-icon-primary-acordeon active" : "btn-icon-primary-acordeon"  } 
                    onClick={()=>{ setActiveItemEdition(!activeItemEdition) }} > 
                    <i className="bi bi-caret-down-fill"></i> 
                    </button> */}
                </div>
            </div>

            {/* <div className="row">
                <div className={ activeItemEdition ? "acordeon-item-body" : "acordeon-item-body no-active" }>

                    
                    
                </div>
            </div> */}

        {activeItemEdition&&
            <EditarItem item = {item} activeItemEdition={activeItemEdition} setActiveItemEdition={setActiveItemEdition}/>}
        </div>

    </div>
  )
}
