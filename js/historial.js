const comprasRealizadas = JSON.parse(localStorage.getItem('comprasRealizadas')) || [];
let totalesCompra = [];

for (const element of comprasRealizadas) {
    let total = element.reduce((acumulador,elemento) => acumulador + elemento.subtotal, 0);
    totalesCompra.push(total);
}


let ventaMaxima = Math.max(...totalesCompra);
let ventaMinima = Math.min(...totalesCompra);

console.log(totalesCompra);
let contenedorHistorial = document.querySelector('#historial');
contenedorHistorial.innerHTML = `<p>El total de ventas realizadas es: ${comprasRealizadas.length} ventas</p>`;
contenedorHistorial.innerHTML +=  `<p>La venta maxima realizada fue de: $${ventaMaxima} ventas</p>`;
contenedorHistorial.innerHTML +=  `<p>La venta minima realizada fue de: $${ventaMinima} ventas</p>`;