export const upperCamelCase = ( str ) => {
    let newStr = '';

    if( typeof str === 'string' ){
        const strArr = str.split(' ');

        strArr.forEach(palabra => {
            if( palabra !== '' ){
                newStr += ( palabra[0].toUpperCase() + palabra.toLowerCase().slice(1)) + " ";     
            }else{
                newStr += '';
            }
        });
    }
    return newStr.trim()
}

export const tipoOracion = (str) => {
    return (str[0].toUpperCase() + str.toLowerCase().slice(1));
}

export const objetoMinusculas = (obj) => {
    let newObj = {};
    const keys = Object.keys(obj);
    keys.map((key) => {
        if( typeof obj[key] === 'string' ){
            newObj[key] = obj[key].toLowerCase();
        }else{
            newObj[key] = obj[key];
        }

    })
    return newObj;
}