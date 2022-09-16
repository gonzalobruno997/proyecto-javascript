let spanCarrito = document.querySelector('#spanCarrito');
let carrito = JSON.parse(localStorage.getItem('carrito'));


let arregloCompra = (carrito) ? carrito : [];


if(arregloCompra.length == 0){
    spanCarrito.style.display = 'none';
}else{
    spanCarrito.style.display = "block";
    spanCarrito.innerText = carrito.length;
}
