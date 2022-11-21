export const cuatroDecimales = (num) => {
    if( typeof num === 'number' ){
        return parseFloat(num.toFixed(4))
    }else{
        return num
    }
}
export const unDecimal = (num) => {
    if( typeof num === 'number' ){
        return parseFloat(num.toFixed(1))
    }else{
        return num
    }
}