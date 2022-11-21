
export const ItemAlmacen = ({ item }) => {

    const {imgUrl, modelo, marca, nombre, cantidad, cantidadMinima} = item;

    const ver = () => {
        console.log( item );
    }

    const pilCantidad = () => {
        if( cantidad <= cantidadMinima ) return "pil-danger";
        else if( cantidad <= (cantidadMinima * 2.5) ) return "pil-warning";
        else return "pil-success";
    }
  return (
    <div className="row mb-2 border rounded" >
        {/* IMAGEN */}
        <div className="col-2 d-flex justify-content-center align-items-center ">
                    <div 
                        className='d-flex justify-content-center align-items-center rounded' 
                        style={{ width:'160px', height:'110px', overflow:'hidden' }} 
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
                <div className="col-1 d-flex justify-content-center align-items-center " onClick={ver} >{cantidad}</div>

                <div className="col-1 d-flex justify-content-center align-items-center ">
                    <div className={ pilCantidad() }></div>                    
                </div>
    </div>
  )
}
