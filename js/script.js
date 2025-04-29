const IVA = 0.21;            // 21% de IVA
const COSTO_ENVIO = 500;     // costo envío fijo en ARS
let productos = [];          // array de nombre, precio

function solicitarProductos() {
  const cantidad = Number(prompt("¿Cuántos productos vas a comprar?"));
  if (isNaN(cantidad) || cantidad < 1) {
    alert("Ingresa un número de productos válido (>=1).");
    return solicitarProductos();
  }
  for (let i = 1; i <= cantidad; i++) {
    const nombre = prompt(`Nombre del producto #${i}:`);
    const precio = Number(prompt(`Precio de "${nombre}" en ARS:`));
    if (isNaN(precio) || precio < 0) {
      alert("Precio inválido. Intenta de nuevo.");
      i--;
    } else {
      productos.push({ nombre, precio });
      console.log(`Producto agregado: ${nombre} - $${precio}`);
    }
  }
}

function procesarCompra() {
  const subtotal = productos.reduce((sum, p) => sum + p.precio, 0);
  const totalIva = subtotal * IVA;
  const totalConIva = subtotal + totalIva;
  const totalFinal = totalConIva + COSTO_ENVIO;
  return { subtotal, totalIva, totalConIva, totalFinal };
}

function mostrarResumen(res) {
  const mensaje = 
    "✅ Resumen de tu compra:\n" +
    `• Subtotal: $${res.subtotal.toFixed(2)}\n` +
    `• IVA (21%): $${res.totalIva.toFixed(2)}\n` +
    `• Total c/IVA: $${res.totalConIva.toFixed(2)}\n` +
    `• Envío: $${COSTO_ENVIO}\n` +
    `-------------------------\n` +
    `🎯 TOTAL: $${res.totalFinal.toFixed(2)}`;
  console.table(productos);
  alert(mensaje);
  console.log("Compra procesada:", res);
}

function iniciarSimuladorCompras() {
  solicitarProductos();
  const resultado = procesarCompra();
  mostrarResumen(resultado);
}


iniciarSimuladorCompras();
