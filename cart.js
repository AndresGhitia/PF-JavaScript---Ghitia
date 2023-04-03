const llenarCarrito = () => {
    carritoVisible=true;
    ventanaCompras.innerHTML = "";
    ventanaCompras.style.display = "flex";
    
  const ventanaTitulo = document.createElement("div");
      ventanaTitulo.className = "header";
      ventanaTitulo.innerHTML = `<h1 class="carrito-nombre">carrito</h1>`;
      ventanaCompras.append(ventanaTitulo);

  const botonCerrar = document.createElement("h1");
      botonCerrar.innerText = "x";
      botonCerrar.className = "btn-cerrar";
      botonCerrar.addEventListener("click", () => {
      ventanaCompras.style.display = "none";
  });
  
    ventanaTitulo.append(botonCerrar);
    

  carrito.forEach((effect) => {
      let carritoModelos = document.createElement("div");
      carritoModelos.className = "carrito-modelos";
      carritoModelos.innerHTML =`
          <img src= "${effect.img}" class="img-buy">
          <p class="card-txt">${effect.nombre}</p>
          <p class="card-txt">$${effect.precio}</p>
          <span class= "restar"> - </span>
          <p class="card-txt">Cantidad: ${effect.cantidad}</p>
          <span class= "sumar"> + </span>
          <p class="card-txt">Total: $${effect.cantidad * effect.precio}</p>
          <span class="elimnar-prducto">X</span>
      `;
      ventanaCompras.append(carritoModelos);
      
      let restar = carritoModelos.querySelector(".restar")
      restar.addEventListener("click",() => {
          if(effect.cantidad !==1){
          effect.cantidad--;
          }
          saveLocal();
          llenarCarrito();
      });
  
      let sumar = carritoModelos.querySelector(".sumar")
      sumar.addEventListener("click",() => {
          effect.cantidad++;
          saveLocal();
          llenarCarrito();
      });
  
      let eliminar = carritoModelos.querySelector(".elimnar-prducto")
      eliminar.addEventListener("click", () => {
          eliminarProducto(effect.id);
      });
      
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  const totalFinal = document.createElement("div")
      totalFinal.className = "carrito-total"
      totalFinal.innerHTML = 
      `Total a Pagar: $${total}
      <span class="btn-out">CHECKOUT</span>
      `;
      totalFinal.addEventListener("click", () => {
        Swal.fire({
            title: 'Desea finalizar la compra?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Seguir Comprando',
            confirmButtonText: 'Si, finzaliar',
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'COMPRA EXITOSA',
                '',
                'success'
              )
            }
          })      });    
      ventanaCompras.append(totalFinal);

};

Carrito.addEventListener("click", llenarCarrito);

const eliminarProducto = (modelo) =>{
    const foundId = carrito.find((element) => element.id === modelo);
    carrito = carrito.filter((carritoId) => {
        return carritoId !==foundId;
    });
    carritoCounter ();
    saveLocal();
    llenarCarrito();
};


const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));  
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));    
};

carritoCounter();
