class Producto {
    constructor(nombre, precio, stock, unidadDeMedida){
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.unidadDeMedida = unidadDeMedida;
        this.agotado = false;
    }
    sumarIva(){
        this.precio = this.precio * 1.21;
    } 
    sinStock(){
        this.agotado = true;
    }
    descontarStock(cantidad){
        this.stock = this.stock - cantidad;
    }

}
const listaProductos = [];
listaProductos.push(new Producto("Salmon rosado", 4100, 20, "Pencas"));
listaProductos.push(new Producto("Filet de merluza", 1100, 50, "kilos"));
listaProductos.push(new Producto("Rabas", 1800, 30, "kilos"));
listaProductos.push(new Producto("Mejillones", 1600, 10, "kilos"));
let listadoProductos = "";
for (let i = 0; i < listaProductos.length; i++) {
    listaProductos[i].sumarIva();
    listadoProductos += `Producto ${i+1}: `;
    for (const propiedad in listaProductos[i]) {
        listadoProductos += `${propiedad}: ${listaProductos[i][propiedad]} `;
    }
    listadoProductos += "\n\n";
}
let indiceP = parseInt(prompt("seleccione uno de los productos(1, 2, 3 o 4) \n\n" + listadoProductos));

if (!(isNaN(indiceP)) && indiceP > 0 && indiceP < 5){
    let cantidadP = parseInt(prompt("ingrese la cantidad de productos que desea comprar"));
    if (!(isNaN(cantidadP))){
        
        if(listaProductos[indiceP - 1].stock >= cantidadP){
            let total = listaProductos[indiceP - 1].precio * cantidadP;
            alert(`compra procesada con exito, el monto total a abonar es de: ${total} `);
            listaProductos[indiceP - 1].descontarStock(cantidadP)
            if(listaProductos[indiceP - 1].stock == 0){
                listaProductos[indiceP - 1].sinStock();
                alert("este producto quedo con el stock agotado");
            } 
        }else{
            alert("la cantidad que desea adquirir supera el stock dsponible");
        }
    }else{
        alert("la cantidad ingresada no es correcta");
    }
}else{
    alert("el valor ingresado no esta permitido (ingrese valores entre 1 y 4)");
}