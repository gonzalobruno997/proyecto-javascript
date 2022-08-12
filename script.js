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
let nombreProducto = "";
let cantidadProducto = 0;
let indiceProducto = 0;
do{
    nombreProducto = prompt("ingrese el nombre del producto a comprar(PARA FINALIZAR ESCRIBA COMPRAR) \n\n" );
    const productoSeleccionado = listaProductos.find( (element) => element.nombre.toLowerCase() == nombreProducto.toLowerCase());
    if(productoSeleccionado){
        cantidadProducto = parseInt(prompt("ingrese la cantidad de productos que desea comprar"));
        if (!(isNaN(cantidadProducto))){
            if(productoSeleccionado.stock >= cantidadProducto){
                arregloCompra.push(
                    {nombre: productoSeleccionado.nombre, precio: productoSeleccionado.precio, cantidad: cantidadProducto, subTotal: cantidadProducto * productoSeleccionado.precio}
                    );
                    indiceProducto = listaProductos.findIndex((element) => element.nombre == productoSeleccionado.nombre);
                    listaProductos[indiceProducto].descontarStock(cantidadProducto);
                    if(listaProductos[indiceProducto].stock == 0){
                        listaProductos[indiceProducto].sinStock();
                        alert("este producto quedo con el stock agotado");
                    } 

            }else{
                alert("no hay stock disponible del producto seleccionado")
            }
        }
    }else if(nombreProducto.toLowerCase() != "comprar"){
        alert("el producto seleccionado no se encuentra disponible");
    }
}while(nombreProducto.toLowerCase() != "comprar")
const total = arregloCompra.reduce((acumulador, elemento) => acumulador + elemento.subTotal, 0);

let parrafoResultado = document.querySelector("#resultado");
parrafoResultado.innerText = `la compra ha sido procesda con exito el monto final es de: ${total} `;






