class Producto {
    constructor(id, nombre, precio, stock, unidadDeMedida){
        this.id = id;
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

listaProductos.push(new Producto(1,"Salmon rosado", 4100, 20, "Pencas"));
listaProductos.push(new Producto(2,"Filet de merluza", 1100, 50, "kilos"));
listaProductos.push(new Producto(3,"Rabas", 1800, 30, "kilos"));
listaProductos.push(new Producto(4,"Mejillones", 1600, 10, "kilos"));

let arregloCompra = [];
let producto;
let cantidadProducto = 0;
let idProducto = 0;
let tablaCuerpo = document.getElementById('tablaCuerpo');

function armadoCarrito(arregloCarrito){
    tablaCuerpo.innerHTML = "";
    let total = 0;
    for (const elemento of arregloCarrito) {
        let fila = document.createElement('tr');
        let colNombre = document.createElement('td');
        colNombre.innerText = elemento.nombre;
        let colPrecio = document.createElement('td');
        colPrecio.innerText = `$${elemento.precio}`;
        let colCantidad = document.createElement('td');
        colCantidad.innerText = elemento.cantidad;
        let colSubtotal = document.createElement('td');
        colSubtotal.innerText = `$${elemento.subtotal}`;
        let btnQuitar = document.createElement('td');
        btnQuitar.innerText = 'Quitar';
        btnQuitar.setAttribute('class','btn-quitar');
        btnQuitar.addEventListener('click', () =>{
            fila.remove();
            arregloCompra = arregloCompra.filter(element => element.id != elemento.id);
            armadoCarrito(arregloCompra);
        })
        fila.append(colNombre);
        fila.append(colPrecio);
        fila.append(colCantidad);
        fila.append(colSubtotal);
        fila.append(btnQuitar);
        tablaCuerpo.append(fila);

        total += elemento.subtotal; 
    }

    document.querySelector('#totalCompra').innerText = `Total: $${total}`;
    document.querySelector('#totalCompra').style.display = "block";


}

function agregarAlCarrito(idProducto,cantidadProducto){

    producto = listaProductos.find( (element) => idProducto == element.id);
    let subTotal =  cantidadProducto * producto.precio;


    let productoRepetido = arregloCompra.findIndex( (element) => idProducto == element.id);
    
    if(productoRepetido != -1){
        arregloCompra[productoRepetido].cantidad += cantidadProducto;
        arregloCompra[productoRepetido].subtotal = arregloCompra[productoRepetido].cantidad * arregloCompra[productoRepetido].precio
    }else{
        arregloCompra.push({id:producto.id,nombre:producto.nombre, precio: producto.precio,cantidad:parseInt(cantidadProducto), subtotal: subTotal});
    }

}

function mostrarProductos(){

    for (const element of listaProductos) {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `<h2> ${element.nombre} </h2>
                                <p>precio: $${element.precio} </p>
                                <p>stock: ${element.stock} </p>
                                <p>unidad de medida: ${element.unidadDeMedida} </p>
                                <label> Cantidad: </label><input type="number" value='1' min="1">
        `;
    
        let enlaceCompra = document.createElement('a');
        enlaceCompra.innerText = "Comprar";
        enlaceCompra.id = element.id;
    
        enlaceCompra.addEventListener('click', (e) => {
    
            idProducto = enlaceCompra.id;
            cantidadProducto = parseInt(e.target.previousElementSibling.value);
    
            
            agregarAlCarrito(idProducto,cantidadProducto);
            
            armadoCarrito(arregloCompra);
    
    
        });
    
        contenedor.append(enlaceCompra);
    
        document.querySelector("#contenedorProductos").append(contenedor);
    }
    
}



let btnComprar = document.querySelector('#btnComprar');

btnComprar.addEventListener('click', () =>{
    if(arregloCompra.length != 0){
        document.body.innerHTML = '';
        let resultadoFinal = document.createElement('p');
        resultadoFinal.innerText = 'La compra ha sido procesada con éxito';
        resultadoFinal.style.backgroundColor = "#000";
        resultadoFinal.style.color = "#fff";
        resultadoFinal.style.padding = "2rem";
        resultadoFinal.style.textAlign = "center";
        document.body.append(resultadoFinal);
    }else{
        document.querySelector('#resultado').innerText = 'Para finalizar la compra almenos debe agregar un producto al carrito';
    }
    
});



mostrarProductos();
