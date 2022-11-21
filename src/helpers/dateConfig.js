export const generarFechaDMA = ( fecha ) => {
    //Argumento resibe la fecha tipo AAAA-MM-DD
    // Genera una fecha del tipo DD-MM-AAAA
    if(fecha.includes('-')){
        const newFecha = fecha.split('-');
        return `${newFecha[2]}-${newFecha[1]}-${newFecha[0]}`
    }else{
        return fecha
    }
    
}
export const generarFechaAMD = ( milisegundos ) => {
    // Genera una fecha del tipo AAAA-MM-DD
    if( typeof milisegundos === 'number' ){
        const date = new Date(milisegundos);
        const newDate = date.toString().split(' ');
        let mes = '';
        switch(newDate[1]){
            case 'Jan': 
                mes = '01';
                break;
            case 'Feb': 
                mes = '02';
                break;
            case 'Mar': 
                mes = '03';
                break;
            case 'Apr': 
                mes = '04';
                break;
            case 'May': 
                mes = '05';
                break;
            case 'Jun': 
                mes = '06';
                break;
            case 'Jul': 
                mes = '07';
                break;
            case 'Aug': 
                mes = '08';
                break;
            case 'Sep': 
                mes = '09';
                break;
            case 'Oct': 
                mes = '10';
                break;
            case 'Nov': 
                mes = '11';
                break;
            case 'Dec': 
                mes = '12';
                break;
            default: 
                mes = 'XX';
                break;

        }
        return(`${newDate[3]}-${mes}-${newDate[2]}`)
    }
}
export const generarFechaHoraAMD = ( milisegundos ) => {
    // Genera una fecha del tipo AAAA-MM-DD hh:mm:ss
    if( typeof milisegundos === 'number' ){
        const date = new Date(milisegundos);
        const newDate = date.toString().split(' ');
        let mes = '';
        switch(newDate[1]){
            case 'Jan': 
                mes = '01';
                break;
            case 'Feb': 
                mes = '02';
                break;
            case 'Mar': 
                mes = '03';
                break;
            case 'Apr': 
                mes = '04';
                break;
            case 'May': 
                mes = '05';
                break;
            case 'Jun': 
                mes = '06';
                break;
            case 'Jul': 
                mes = '07';
                break;
            case 'Aug': 
                mes = '08';
                break;
            case 'Sep': 
                mes = '09';
                break;
            case 'Oct': 
                mes = '10';
                break;
            case 'Nov': 
                mes = '11';
                break;
            case 'Dec': 
                mes = '12';
                break;
            default: 
                mes = 'XX';
                break;

        }
        return(`${newDate[3]}-${mes}-${newDate[2]} ${newDate[4]}`)
    }
}
export const generarFechaHoraISOS = ( milisegundos ) => {
    // Genera una fecha del tipo AAAA-MM-DDThh:mm
    if( typeof milisegundos === 'number' ){
        const date = new Date(milisegundos);
        const newDate = date.toString().split(' ');
        let mes = '';
        switch(newDate[1]){
            case 'Jan': 
                mes = '01';
                break;
            case 'Feb': 
                mes = '02';
                break;
            case 'Mar': 
                mes = '03';
                break;
            case 'Apr': 
                mes = '04';
                break;
            case 'May': 
                mes = '05';
                break;
            case 'Jun': 
                mes = '06';
                break;
            case 'Jul': 
                mes = '07';
                break;
            case 'Aug': 
                mes = '08';
                break;
            case 'Sep': 
                mes = '09';
                break;
            case 'Oct': 
                mes = '10';
                break;
            case 'Nov': 
                mes = '11';
                break;
            case 'Dec': 
                mes = '12';
                break;
            default: 
                mes = 'XX';
                break;

        }

        const hhmm = newDate[4].slice(0,5);

        return(`${newDate[3]}-${mes}-${newDate[2]}T${hhmm}`)
    }
}
