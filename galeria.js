// Banco de imagens da galeria
const imageBank = [
    { src: "foto1.jpg", alt: "Foto 1" },
    { src: "foto2.jpg", alt: "Foto 2" },
    { src: "foto3.jpg", alt: "Foto 3" },
    { src: "foto4.jpg", alt: "Foto 4" },
    { src: "foto5.jpg", alt: "Foto 5" },
    { src: "foto6.jpg", alt: "Foto 6" },
    { src: "foto7.jpg", alt: "Foto 7" },
    { src: "foto8.jpg", alt: "Foto 8" },
    { src: "foto9.jpg", alt: "Foto 9" },
    { src: "foto10.jpg", alt: "Foto 10" },
    { src: "foto11.jpg", alt: "Foto 11" },
    { src: "foto12.jpg", alt: "Foto 12" }
];

// Função que insere as imagens no HTML
function generateGallery() {
    const galleryGrid = document.getElementById('gallery-grid'); // Contêiner das imagens
    const hiddenGallery = document.getElementById('hidden-gallery'); // Contêiner das imagens ocultas
    
    // Iterar sobre o banco de imagens e criar os elementos dinamicamente
    imageBank.forEach((image, index) => {
        const galleryItem = document.createElement('div'); // Criar o div do item da galeria
        galleryItem.classList.add('gallery-item');
        
        const img = document.createElement('img'); // Criar o elemento <img>
        img.src = image.src;
        img.alt = image.alt;
        img.classList.add('gallery-img');

        galleryItem.appendChild(img); // Inserir a imagem no div

        // As primeiras 4 imagens vão no primeiro bloco, o restante no hidden gallery
        if (index < 4) {
            galleryGrid.appendChild(galleryItem);
        } else {
            hiddenGallery.appendChild(galleryItem);
        }
    });
}

// Chame a função para gerar a galeria quando a página carregar
window.onload = generateGallery;
