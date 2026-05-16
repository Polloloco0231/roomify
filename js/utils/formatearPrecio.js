const FormatearPrecio = {

    cops(valor) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(valor);
},

sinSimbolo(valor) {
    return new Intl.NumberFormat('es-CO', {
        minimumFractionDigits: 0
    }).format(valor);
}

};