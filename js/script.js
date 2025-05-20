const IVA = 0.21;
const COSTO_ENVIO = 500;
let productos = JSON.parse(localStorage.getItem("productos")) || [];

const form = document.getElementById("form-producto");
const nombreInput = document.getElementById("nombre");
const precioInput = document.getElementById("precio");
const productosUl = document.getElementById("productos-ul");
const btnProcesar = document.getElementById("btn-procesar");
const resumenDiv = document.getElementById("resumen-detalles");

renderizarProductos();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const precio = parseFloat(precioInput.value);

  if (!nombre || isNaN(precio) || precio < 0) {
    alert("Ingresá un nombre válido y un precio mayor o igual a 0.");
    return;
  }

  const nuevoProducto = { nombre, precio };
  productos.push(nuevoProducto);
  localStorage.setItem("productos", JSON.stringify(productos));

  renderizarProductos();

  form.reset();
});

btnProcesar.addEventListener("click", () => {
  if (productos.length === 0) {
    resumenDiv.textContent = "No hay productos en el carrito.";
    return;
  }

  const subtotal = productos.reduce((acc, p) => acc + p.precio, 0);
  const totalIva = subtotal * IVA;
  const totalConIva = subtotal + totalIva;
  const totalFinal = totalConIva + COSTO_ENVIO;

  const resumen = 
    `• Subtotal: $${subtotal.toFixed(2)}\n` +
    `• IVA (21%): $${totalIva.toFixed(2)}\n` +
    `• Total con IVA: $${totalConIva.toFixed(2)}\n` +
    `• Envío: $${COSTO_ENVIO.toFixed(2)}\n` +
    `----------------------------\n` +
    `🎯 TOTAL: $${totalFinal.toFixed(2)}`;

  resumenDiv.textContent = resumen;
});


function renderizarProductos() {
  productosUl.innerHTML = "";

  productos.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - $${p.precio.toFixed(2)}`;
    
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.style.marginLeft = "1rem";
    btnEliminar.onclick = () => eliminarProducto(i);

    li.appendChild(btnEliminar);
    productosUl.appendChild(li);
  });
}


function eliminarProducto(index) {
  productos.splice(index, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  renderizarProductos();
  resumenDiv.textContent = ""; 
}
