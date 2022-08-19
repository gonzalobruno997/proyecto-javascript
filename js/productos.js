class Producto {
    constructor(id, nombre, precio, stock, unidadDeMedida,imgProducto){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.unidadDeMedida = unidadDeMedida;
        this.imgProducto = imgProducto;
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

listaProductos.push(new Producto(1,"Salmon rosado", 4100, 20, "Pencas","salmonrosa.jpg"));
listaProductos.push(new Producto(2,"Filet de merluza", 1100, 50, "Kilos","filet.jpg"));
listaProductos.push(new Producto(3,"Langostinos", 2700, 23, "Kilos","langostinos.jpg"));
listaProductos.push(new Producto(4,"Gatuzo", 950, 18, "Kilos","gatuzo.jpg"));
listaProductos.push(new Producto(5,"Rabas", 1800, 30, "Kilos","rabas.jpg"));
listaProductos.push(new Producto(6,"Mejillones", 1600, 10, "Kilos","mejillones.jpg"));






let producto;
let cantidadProducto = 0;
let idProducto = 0;

// CARGA DINAMICA DE LOS PRODUCTOS A TRAVES DE JS.

function mostrarProductos(){

    for (const element of listaProductos) {
        //CREAR UN DIV PARA CONTENER LOS DATOS DEL PRODUCTO.
        let contenedor = document.createElement("div");
        contenedor.setAttribute('class','col-12 col-md-4');
        // INSERTAR LOS DATOS DENTRO DEL DIV, A TRAVES DE LA PROPIEDAD innerHTML.
        contenedor.innerHTML = `
                        <article class="producto producto1">
                            <img src="../img/${element.imgProducto}" alt="${element.nombre}" class="img-fluid">
                            <h3 class="titulo-producto">${element.nombre}</h3>
                            <p class="precio-producto">$ ${element.precio}</p>
                            <p>Unidad de medida: ${element.unidadDeMedida} </p>
                            <label> Cantidad: </label><input type="number" value='1' min="1" class="form-control input-cantidad">
                            <a href="" class="btn-carrito" id="${element.id}">Añadir al carrito</a>
                        </article>                              
        `;
    
        document.querySelector("#contenedorProductos").append(contenedor);
    }
    
}

function agregarAlCarrito(idProducto,cantidadProducto){

    producto = listaProductos.find( (element) => idProducto == element.id);


    let subTotal =  cantidadProducto * producto.precio;


    let productoRepetido = arregloCompra.findIndex( (element) => idProducto == element.id);
    
    if(productoRepetido != -1){
        arregloCompra[productoRepetido].cantidad += cantidadProducto;
        arregloCompra[productoRepetido].subtotal = arregloCompra[productoRepetido].cantidad * arregloCompra[productoRepetido].precio;
    }else{
        arregloCompra.push({id:producto.id,nombre:producto.nombre, precio: producto.precio,cantidad:parseInt(cantidadProducto), subtotal: subTotal, imgProducto:producto.imgProducto});
    }

    localStorage.setItem('carrito',JSON.stringify(arregloCompra));

   // alert('Producto agregado al carrito');
    spanCarrito.style.display = "block";
    spanCarrito.textContent = arregloCompra.length;

}



mostrarProductos();


let btnCarrito = document.querySelectorAll('.btn-carrito');

btnCarrito.forEach(element => {

    element.addEventListener('click',(e) => {
        e.preventDefault();

        idProducto = e.target.id;

        cantidadProducto = parseInt(e.target.previousElementSibling.value);
      
        agregarAlCarrito(idProducto,cantidadProducto);
       

    })
});