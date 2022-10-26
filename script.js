// carrito
let iconoCarrito=document.querySelector('#icono-carrito')
let carrito=document.querySelector('.carrito')
let cerrarCarrito=document.querySelector('#carrito-cerrar')

iconoCarrito.onclick = ()=>{
    carrito.classList.add('activo')
}
cerrarCarrito.onclick=()=>{
    carrito.classList.remove('activo')
}

//hacer que ande el carrito

if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded", listo)
}
else{
    listo()
}

function listo(){
    let eliminarBotonesCarrito=document.getElementsByClassName('carrito-eliminar')
    console.log(eliminarBotonesCarrito)
    for (let i = 0; i < eliminarBotonesCarrito.length; i++) {
        const boton = eliminarBotonesCarrito[i];
        boton.addEventListener('click',eliminarItemCarrito)
        
    }
    let cantidadInputs = document.getElementsByClassName('carrito-cantidad')
    for (let i = 0; i < cantidadInputs.length; i++) {
        const input = cantidadInputs[i];
        input.addEventListener('change', cambiarCantidad)
        
    }
    //agregar a carrito
    let agregarCarrito = document.getElementsByClassName('agregar-carrito')
    for (let i = 0; i < agregarCarrito.length; i++) {
        const boton = agregarCarrito[i];
        boton.addEventListener('click', agregarCarritoClickeado)
         
    }
    //Boton comprar
    document.getElementsByClassName('btn-comprar')[0].addEventListener('click', btnComprarClickeado)
}

function btnComprarClickeado(){
    alert('Tu pedido fue tomado')
    let carritoContenido=document.getElementsByClassName('carrito-contenido')[0]
    while (carritoContenido.hasChildNodes()){
        carritoContenido.removeChild(carritoContenido.firstChild)
    }
actualizarTotal()
}

function eliminarItemCarrito(event){
    let botonClickeado=event.target
    botonClickeado.parentElement.remove()
    actualizarTotal()
}

function cambiarCantidad(event){
    let input=event.target
    if(isNaN(input.value)|| input.value<=0){
        input.value=1
    }
    actualizarTotal()
}

function agregarProductoACarrito(titulo, precio, itemImg) {
    let carritoCajaNueva = document.createElement('div')
    carritoCajaNueva.classList.add('carrito-caja')
    let carritoItems=document.getElementsByClassName('carrito-contenido')[0]
    let carritoItemsNombre=carritoItems.getElementsByClassName('carrito-item-txt')
    for (let i = 0; i < carritoItemsNombre.length; i++) { 
        if(carritoItemsNombre[i].innerText==titulo){
        alert("Ya has agregado este producto al carrito")
        return
        }
    }

let carritoCajaContenido = `
<img src="${itemImg}" alt="" class="carrito-img">
                    <div class="detalles">
                        <div class="carrito-item-txt">${titulo}</div>
                        <div class="carrito-precio">${precio}</div>
                        <input type="number" value="1" class="carrito-cantidad">
                    </div>
                    <i class='bx bxs-trash-alt carrito-eliminar' ></i>
`
carritoCajaNueva.innerHTML = carritoCajaContenido
carritoItems.append(carritoCajaNueva)
carritoCajaNueva.getElementsByClassName('carrito-eliminar')[0].addEventListener('click', eliminarItemCarrito)
carritoCajaNueva.getElementsByClassName('carrito-cantidad')[0].addEventListener('change', cambiarCantidad)
}
// agrega al carrito el elemento clickeado
function agregarCarritoClickeado(event){
    let boton = event.target
    let item=boton.parentElement.parentElement
    let titulo=item.getElementsByClassName('item-txt')[0].innerText
    let precio = item.getElementsByClassName('precio')[0].innerText
    let itemImg = item.getElementsByClassName('item-img')[0].src

    agregarProductoACarrito(titulo, precio, itemImg)
    actualizarTotal()
}
// Actualizar total
function actualizarTotal(){
    let carritoContenido = document.getElementsByClassName('carrito-contenido')[0]
    let carritoCajas =carritoContenido.getElementsByClassName('carrito-caja')
    let total = 0
    for (let i = 0; i < carritoCajas.length; i++) {
        let carritoCaja = carritoCajas[i]
        let elementoPrecio = carritoCaja.getElementsByClassName('carrito-precio')[0]
        let elementoCantidad = carritoCaja.getElementsByClassName('carrito-cantidad')[0]
        console.log(carritoCajas)
        console.log(elementoPrecio)
        let precio=parseFloat(elementoPrecio.innerText.replace("$",""))
        let cantidad = elementoCantidad.value
        total= total+precio*cantidad
    }
        //Para que no ponga .99999999999999999 si tiene coma
        total=Math.round(total * 100) / 100
        document.getElementsByClassName('total-precio')[0].innerText='$'+total
     
}
