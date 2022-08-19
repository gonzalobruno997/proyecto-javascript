
function armadoCarrito(){
    tablaCuerpo.innerHTML = "";
    let total = 0;
    for (const elemento of arregloCompra) {
        let fila = document.createElement('tr');
        let colImg = document.createElement('td');
        colImg.innerHTML = `<img src="../img/${elemento.imgProducto}" class="img-carrito">`;
        let colNombre = document.createElement('td');
        colNombre.textContent = elemento.nombre;
        let colPrecio = document.createElement('td');
        colPrecio.textContent = `$${elemento.precio}`;
        let colCantidad = document.createElement('td');
        colCantidad.textContent = elemento.cantidad;
        let colSubtotal = document.createElement('td');
        colSubtotal.textContent = `$${elemento.subtotal}`;

        let btnQuitar = document.createElement('td');
        btnQuitar.innerHTML = '<i class="fa-solid fa-rectangle-xmark"></i>';
        btnQuitar.setAttribute('class','btn-quitar');

        btnQuitar.addEventListener('click', () =>{
            fila.remove();
            arregloCompra = arregloCompra.filter(element => element.id != elemento.id);
            spanCarrito.textContent = arregloCompra.length;
            if(arregloCompra.length == 0){
                spanCarrito.style.display = 'none';
            }
            localStorage.setItem('carrito',JSON.stringify(arregloCompra));
            armadoCarrito();
        })
        fila.append(colImg);
        fila.append(colNombre);
        fila.append(colPrecio);
        fila.append(colCantidad);
        fila.append(colSubtotal);
        fila.append(btnQuitar);
        tablaCuerpo.append(fila);

        total += elemento.subtotal; 
    }

    document.querySelector('#totalCompra').innerText = `Total: $${total}`;
    


}

let tablaCuerpo = document.getElementById('tablaCuerpo');
let parrafoResultado = document.querySelector('#resultado');


if(arregloCompra.length > 0){
    armadoCarrito();
}


let btnComprar = document.querySelector('#btnComprar');

btnComprar.addEventListener('click', () =>{
    if(arregloCompra.length != 0){
        document.querySelector('#contenedorTabla').innerHTML = "";
        parrafoResultado.textContent = 'Compra finalizada éxitosamente.';
        parrafoResultado.style.display = "block";
        document.querySelector('#contenedorFinalizar').classList.toggle('d-none');
        spanCarrito.style.display = "none";
        localStorage.clear();
        
    }else{
        parrafoResultado.textContent = 'Para finalizar la compra almenos debe agregar un producto al carrito';
        parrafoResultado.style.display = "block";
    }
    
});
