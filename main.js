let carro = [];

function agregarAlCarro(nombreProducto, precio) {
    carro.push({ nombre: nombreProducto, precio: parseFloat(precio) });
    renderizarCarro();
}

function eliminarDelCarro(nombreProducto) {
    const indiceProducto = carro.findIndex(producto => producto.nombre.toLowerCase() === nombreProducto.toLowerCase());
    if (indiceProducto !== -1) {
        carro.splice(indiceProducto, 1);
        renderizarCarro();
        alert(`El producto "${nombreProducto}" ha sido eliminado del carrito.`);
    } else {
        alert(`El producto "${nombreProducto}" no se encontró en el carrito.`);
    }
}

function renderizarCarro() {
    const elementosCarro = document.getElementById('elementos-carro');
    elementosCarro.innerHTML = '';
    let total = 0;
    carro.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre}: $${producto.precio.toFixed(2)}`;
        elementosCarro.appendChild(li);
        total += producto.precio;
    });

    let descuento = 0;
    if (total > 50000) {
        // Aplicar un descuento del 15% si el total supera los $50,000
        descuento = total * 0.15;
    }

    let costoEnvio = 0;
    if (total > 10000) {
        // Envío gratis si el total supera los $10,000
        costoEnvio = 0;
    } else {
        // Costo de envío estándar
        costoEnvio = 500;
    }

    // Mostrar el total con descuento y costo de envío
    total -= descuento;
    total += costoEnvio;

    const totalElemento = document.getElementById('total');
    totalElemento.textContent = `$${total.toFixed(2)}`;
}

window.onload = () => {
    document.getElementById('agregarProductoBtn').addEventListener('click', () => {
        const nombreProducto = prompt('Ingrese el nombre del producto:');
        if (nombreProducto) {
            const precio = prompt('Ingrese el precio del producto:');
            if (!isNaN(precio) && precio > 0) {
                agregarAlCarro(nombreProducto, precio);
            } else {
                alert('Precio inválido. Por favor, ingrese un número válido.');
            }
        } else {
            alert('Nombre del producto no puede estar vacío.');
        }
    });

    document.getElementById('eliminarProductoBtn').addEventListener('click', () => {
        const nombreProducto = prompt('Ingrese el nombre del producto a eliminar:');
        if (nombreProducto) {
            eliminarDelCarro(nombreProducto);
        } else {
            alert('Nombre del producto no puede estar vacío.');
        }
    });
};
