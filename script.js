document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const addProductButton = document.getElementById('addProductButton');
    const productModal = document.getElementById('productModal');
    const productForm = document.getElementById('productForm');
    const cancelButton = document.getElementById('cancelButton');
    const modalTitle = document.getElementById('modalTitle');
    const productName = document.getElementById('productName');
    const productDescription = document.getElementById('productDescription');
    const productCategory = document.getElementById('productCategory');
    const productPrice = document.getElementById('productPrice');
    const productImageUrl = document.getElementById('productImageUrl');

    let editingProduct = null;

    function loadProductsFromStorage() {
        const storedProducts = sessionStorage.getItem('products');
        if (storedProducts) {
            JSON.parse(storedProducts).forEach(product => addProductToGrid(product));
        }
    }

    function saveProductsToStorage() {
        const products = [];
        productGrid.querySelectorAll('.product-item').forEach(item => {
            const productData = {
                image: item.querySelector('img').src,
                name: item.querySelector('p:nth-child(2)').textContent,
                description: item.querySelector('p:nth-child(3)').textContent,
                category: item.querySelector('p:nth-child(4)').textContent.replace('Categoria: ', ''),
                price: item.querySelector('p:nth-child(5)').textContent.replace('Preço: R$', ''),
            };
            products.push(productData);
        });
        sessionStorage.setItem('products', JSON.stringify(products));
    }

    function openModal(editing = false, productData = {}) {
        productModal.classList.remove('hidden');
        modalTitle.textContent = editing ? 'Editar Produto' : 'Adicionar Produto';
        if (editing) {
            productName.value = productData.name || '';
            productDescription.value = productData.description || '';
            productCategory.value = productData.category || '';
            productPrice.value = productData.price || '';
            productImageUrl.value = productData.image || '';
            editingProduct = productData.element || null;
        } else {
            productForm.reset();
            editingProduct = null;
        }
    }

    function closeModal() {
        productModal.classList.add('hidden');
        productForm.reset();
    }

    function addProductToGrid(data) {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <img src="${data.image}" alt="${data.name}">
            <p>${data.name}</p>
            <p>${data.description}</p>
            <p>Categoria: ${data.category}</p>
            <p>Preço: R$${data.price}</p>
            <div class="actions">
                <button class="edit">✏️</button>
                <button class="delete">🗑️</button>
            </div>
        `;

        productGrid.appendChild(productItem);

        productItem.querySelector('.delete').addEventListener('click', () => {
            productGrid.removeChild(productItem);
            saveProductsToStorage();
        });

        productItem.querySelector('.edit').addEventListener('click', () => {
            const productData = {
                name: data.name,
                description: data.description,
                category: data.category,
                price: data.price,
                image: data.image,
                element: productItem,
            };
            openModal(true, productData);
        });

        saveProductsToStorage();
    }

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const priceValue = parseFloat(productPrice.value).toFixed(2); // Garantir duas casas decimais
        if (isNaN(priceValue)) {
            alert('Por favor, insira um preço válido com até duas casas decimais, ex: 29.99');
            return;
        }
    
        const productData = {
            name: productName.value,
            description: productDescription.value,
            category: productCategory.value,
            price: priceValue,
            image: productImageUrl.value || 'assets/img/placeholder.jpg',
        };
    
        if (editingProduct) {
            editingProduct.querySelector('img').src = productData.image;
            editingProduct.querySelector('p:nth-child(2)').textContent = productData.name;
            editingProduct.querySelector('p:nth-child(3)').textContent = productData.description;
            editingProduct.querySelector('p:nth-child(4)').textContent = `Categoria: ${productData.category}`;
            editingProduct.querySelector('p:nth-child(5)').textContent = `Preço: R$${productData.price}`;
        } else {
            addProductToGrid(productData);
        }
    
        closeModal();
        saveProductsToStorage();
    });    

    cancelButton.addEventListener('click', closeModal);
    addProductButton.addEventListener('click', () => openModal());

    // Carregar os produtos salvos ao iniciar a página
    loadProductsFromStorage();
});

//header
window.addEventListener("scroll", function(event) {
    var header = document.querySelector("#header");
    var top = this.scrollY;

    if (top >= 544) {
        header.className = "header1";
    } else {
        header.className = "header2";
    }

    console.log(top);
    
}, false);

//footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const searchInput = document.querySelector('.input-importante');

    // Função para filtrar os produtos
    function filterProducts() {
        const searchText = searchInput.value.toLowerCase();
        const productItems = productGrid.querySelectorAll('.product-item');

        productItems.forEach(item => {
            const productName = item.querySelector('p:nth-child(2)').textContent.toLowerCase(); // Nome do produto
            if (productName.includes(searchText)) {
                item.style.display = ''; // Mostrar item
            } else {
                item.style.display = 'none'; // Esconder item
            }
        });
    }

    // Adicionar evento ao input de busca
    searchInput.addEventListener('input', filterProducts);
});
