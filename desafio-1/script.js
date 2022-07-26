let total = 0;
const precioProducto = () => {
    let precio = 0;
    
    do{
        precio = prompt("ingrese el valor del producto a sumar. Para terminar ingrese la palabra salir");
        if(!isNaN(parseFloat(precio))){
            total += parseFloat(precio); 
        }
    }while(precio != "salir")
    return total;
}
const cuotas = (monto, cantidadCuotas) => {
    return monto / cantidadCuotas;
}
alert("el precio total de los productos ingresados es de: " + precioProducto());
alert("si desea abonar en 12 cuotas el precio de cada cuota sera de: " + parseInt(cuotas(total, 12)))