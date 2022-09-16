let producto;
let cantidadProducto = 0;
let idProducto = 0;

// CARGO DE FORMA ASICONCRONA LOS PRODUCTOS QUE SE ENCUENTRAN DENTRO DEL ARCHIVO DATA.JSON
async function obtenerProductos(){
    const resp = await fetch('../data.json');
    const data = await resp.json();
    mostrarProductos(data);

}
// CARGA DINAMICA DE LOS PRODUCTOS A TRAVES DE JS.

function mostrarProductos(arregloProductos){

    for (const element of arregloProductos) {
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

    let btnCarrito = document.querySelectorAll('.btn-carrito');

    btnCarrito.forEach(element => {

        element.addEventListener('click',(e) => {
            e.preventDefault();

            idProducto = e.target.id;

            cantidadProducto = parseInt(e.target.previousElementSibling.value);
            
            agregarAlCarrito(idProducto,cantidadProducto,arregloProductos);
            

        })
    });
    
}

//ESTA FUNCION ME SIRVE PARA AGREGAR UN PRODUCTO AL CARRITO
function agregarAlCarrito(idProducto,cantidadProducto,arregloProductos){
    //BUSCO EL PRODUCTO DENTRO DEL ARREGLO DE PRODUCTOS
    producto = arregloProductos.find( (element) => idProducto == element.id);
    // CAPTURO LOS DATOS QUE ME INTERESAN
    let {id,nombre,precio,stock,imgProducto} =  producto;
    // CALCULO SI EL STOCK SOLICITADO ESTÁ DISPONIBLE
    let stockDisponible = (stock >= cantidadProducto) ? true : false;
    // CALCULO EL SUBTOTAL
    let subTotal =  cantidadProducto * precio;

    // VERIFICO SI EL PRODUCTO QUE SE BUSCA AGREGAR AL CARRITO, YA EXISTE DENTRO DE ESTE
    let productoRepetido = arregloCompra.findIndex( (element) => idProducto == element.id);
    if (stockDisponible){
        if(productoRepetido != -1){
            arregloCompra[productoRepetido].cantidad += cantidadProducto;
            arregloCompra[productoRepetido].subtotal = arregloCompra[productoRepetido].cantidad * arregloCompra[productoRepetido].precio;
        }else{
            arregloCompra.push({id:id,nombre:nombre, precio:precio,cantidad:parseInt(cantidadProducto), subtotal: subTotal, imgProducto:imgProducto});
        }
        localStorage.setItem('carrito',JSON.stringify(arregloCompra));

        
        if(arregloCompra.length > 0){
        spanCarrito.style.display = "block";
        spanCarrito.textContent = arregloCompra.length;
        }
        // DESENCADENO UN SWEET ALERT PARA INFORMAR POR EXITO O ERROR.
        swal({
            title: "Exito",
            text: "Has añadido el producto al carrito",
            icon: "success",
            buttons: {
                cancel:"Seguir comprando" ,
                confirm:"Ir al carrito" ,
            }
            }).then( (result) => {
                if(result){
                    window.location.href = "carrito.html";
                }
            });
    }else{
        swal({
            title: "Error!",
            text: "La cantidad solicitada supera el stock disponible",
            icon: "error",
            buttons: {
                confirm:"OK" ,
            }
            })

    }
    

}

obtenerProductos();