// Seleciona os elementos necessários
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.getElementById('close-modal');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const galleryImages = document.querySelectorAll('.gallery-img');

let currentIndex;  // Variável para armazenar o índice da imagem atual

// Função para abrir a modal com a imagem correspondente
galleryImages.forEach((img, index) => {
    img.addEventListener('click', function () {
        modal.style.display = 'block';  // Exibe a modal
        modalImg.src = this.src;        // Define a imagem clicada como conteúdo da modal
        currentIndex = index;           // Salva o índice da imagem atual
    });
});

// Função para fechar a modal ao clicar no "X"
closeModal.addEventListener('click', function () {
    modal.style.display = 'none';  // Oculta a modal
});

// Função para fechar a modal ao clicar fora da imagem
window.addEventListener('click', function (e) {
    if (e.target == modal) {
        modal.style.display = 'none';  // Oculta a modal
    }
});

// Função para mostrar a próxima imagem
nextBtn.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % galleryImages.length; // Vai para a próxima imagem
    modalImg.src = galleryImages[currentIndex].src;           // Atualiza a imagem na modal
});

// Função para mostrar a imagem anterior
prevBtn.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length; // Vai para a imagem anterior
    modalImg.src = galleryImages[currentIndex].src;                                 // Atualiza a imagem na modal
});

// Seleciona o botão da seta e a galeria oculta
const expandBtn = document.getElementById('expand-btn');
const hiddenGallery = document.getElementById('hidden-gallery');
const closeGalleryBtn = document.getElementById('close-gallery');

// Função para mostrar a galeria oculta quando o botão da seta for clicado
expandBtn.addEventListener('click', function() {
    if (hiddenGallery.style.display === 'none' || hiddenGallery.style.display === '') {
        hiddenGallery.style.display = 'block'; // Mostra as imagens ocultas
        expandBtn.style.display = 'none'; // Oculta o botão da seta depois de expandir
    }
});

// Função para esconder a galeria e trazer o botão de seta de volta
closeGalleryBtn.addEventListener('click', function() {
    hiddenGallery.style.display = 'none'; // Oculta a galeria novamente
    expandBtn.style.display = 'block'; // Mostra o botão da seta novamente
});