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

for (const element of listaProductos) {
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `<h2> ${element.nombre} </h2>
                            <p>precio: ${element.precio} </p>
                            <p>stock: ${element.stock} </p>
                            <p>unidad de medida: ${element.unidadDeMedida} </p>    
    `;
    document.querySelector("#contenedorProductos").append(contenedor);
}

let arregloCompra = [];
let nombreP = "";
let cantidadP = 0;
let indiceP = 0;
do{
    nombreP = prompt("ingrese el nombre del producto a comprar(PARA FINALIZAR ESCRIBA COMPRAR) \n\n" );
    const productoSeleccionado = listaProductos.find( (element) => element.nombre.toLowerCase() == nombreP.toLowerCase());
    if(productoSeleccionado){
        cantidadP = parseInt(prompt("ingrese la cantidad de productos que desea comprar"));
        if (!(isNaN(cantidadP))){
            if(productoSeleccionado.stock >= cantidadP){
                arregloCompra.push(
                    {nombre: productoSeleccionado.nombre, precio: productoSeleccionado.precio, cantidad: cantidadP, subTotal: cantidadP * productoSeleccionado.precio}
                    );
                    indiceP = listaProductos.findIndex((element) => element.nombre == productoSeleccionado.nombre);
                    listaProductos[indiceP].descontarStock(cantidadP);
                    if(listaProductos[indiceP].stock == 0){
                        listaProductos[indiceP].sinStock();
                        alert("este producto quedo con el stock agotado");
                    } 

            }else{
                alert("no hay stock disponible del producto seleccionado")
            }
        }
    }else if(nombreP.toLowerCase() != "comprar"){
        alert("el producto seleccionado no se encuentra disponible");
    }
}while(nombreP.toLowerCase() != "comprar")
const total = arregloCompra.reduce((acumulador, elemento) => acumulador + elemento.subTotal, 0);

let parrafoResultado = document.querySelector("#resultado");
parrafoResultado.innerText = `la compra ha sido procesda con exito el monto final es de: ${total} `;






