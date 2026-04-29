export function nextIdSection(lista) {
    if (lista.length > 0) {    
        return Math.max(...lista.map( item => item.id )) + 1;
    } else {
        return 1;
    }    
}


export function nextIdData(lista) {    
    if (lista.length > 0) {    
        return Math.max(...lista.map( section => section.data.map( item => item.id )).flat()) + 1;
    } else {
        return 1;
    }    
}