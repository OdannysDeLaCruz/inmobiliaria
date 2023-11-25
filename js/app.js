document.addEventListener("DOMContentLoaded", async function () {
    const productList = document.getElementById("product-list");
    const addProductBtn = document.getElementById("add-product-btn");
    let products = []

    await fetchProducts();

    // Función para hacer una solicitud GET a la API y obtener la lista de productos
    async function fetchProducts() {
        try {
            const response = await fetch("https://dummyjson.com/products/category/lighting?limit=20");
            const data = await response.json();
            products = data.products;
        } catch (error) {
            console.error("Error al obtener productos:", error);
            products = []
        }
    }

    // Función para agregar un nuevo producto
    function addProduct() {
        const productName = prompt("Ingrese el nombre del nuevo producto:");
        if (productName) {
            const newProduct = {
                id: products.length + 1,
                title: productName,
                thumbnail: 'https://placehold.jp/3d4070/ffffff/150x150.png'
            };
            products.push(newProduct);
            renderProductList();
        }
    }

    // Función para hacer una solicitud DELETE a la API y eliminar un producto
    async function deleteProduct(event) {
        const productId = Number(event.target.getAttribute('data-id'))
        
        const index = products.findIndex(product => product.id === productId)
        console.log(index)
        if ( index !== -1 ) {
            products.splice(index, 1)
            renderProductList()
        }
        
    }

    // Función para renderizar la lista de productos
    async function renderProductList() {

        productList.innerHTML = "";
        products.forEach(product => {
            const listItem = document.createElement("li");
            listItem.classList.add("product-item");
            listItem.innerHTML = `
                <img src="${product.thumbnail}" class="product-item__image" />
                <span class="product-item__title">${product.title}</span>
                <button class="delete-product-btn" data-id="${product.id}">Eliminar</button>
            `;

            productList.appendChild(listItem);
            
            const deleteProductBnt = document.querySelectorAll(".delete-product-btn");

            deleteProductBnt.forEach(btn => {
                btn.addEventListener("click", deleteProduct);
            }) 
        });


    }

    // Evento para el botón de agregar nuevo producto
    addProductBtn.addEventListener("click", addProduct);

    // Inicializar la lista de productos al cargar la página
    renderProductList();
});
