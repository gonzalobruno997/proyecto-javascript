const precioProducto = () => {
    let precio = 0;
    let total = 0;
    do{
        precio = prompt("ingrese el valor del producto a sumar. Para terminar ingrese la palabra salir");
        if(!isNaN(parseFloat(precio))){
            total += parseFloat(precio); 
        }
    }while(precio != "salir")
    return total;
}
alert("el precio total de los productos ingresados es de: " + precioProducto());