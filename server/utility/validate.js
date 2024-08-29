export function isIntegerString(value){
    const number = Number( value );
    return Number.isInteger( number );
}

export function isInRange( number=0, min=0, max=100){
    return number >= min && number <= max;
}