const comprarEfecto = document.getElementById("comprarEfecto")
const Carrito = document.getElementById("Carrito")
const ventanaCompras = document.getElementById("ventanaCompras")
const cantidadCarrito = document.getElementById("cantidadCarrito")

let carrito = JSON.parse(localStorage.getItem("Backup")) || [];

const getProducts = async () =>{
    const response = await fetch("../data.json");
    const data = await response.json();
    data.forEach((effect)=>{
        let efectos = document.createElement("article");
        efectos.className = "card";
        efectos.innerHTML = `
            <img src ="${effect.img}" class ="img-pdls"/>
            <p class="card-txt"> ${effect.nombre}</p>
            <p class="card-txt">$${effect.precio}</p>
        `;
        comprarEfecto.append(efectos);
    
        let comprar = document.createElement("button")
        comprar.className ="btn-buy";
        comprar.innerText = "Agregar al carrito" ;
    
        efectos.append(comprar)
        comprar.addEventListener("click", () => {
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === effect.id);
            if(repeat) {
                carrito.map((prod) => {
                    if (prod.id === effect.id){
                        prod.cantidad++;
                    }
                });
            }else{ 
                carrito.push({
                    id: effect.id,
                    img: effect.img,
                    nombre: effect.nombre,
                    precio: effect.precio,
                    cantidad: effect.cantidad,            
                });
            carritoCounter();
            saveLocal();
            }
            if(carritoVisible) llenarCarrito();
        });
    });
};

getProducts();

let carritoVisible = false;
const saveLocal=() =>{
    localStorage.setItem("Backup",JSON.stringify(carrito))
};

