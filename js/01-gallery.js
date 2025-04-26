import galleryItems from "./gallery.js";

const preview = document.querySelector(".js-gallery");
const modal = document.querySelector(".lightbox");
const btn = document.querySelector('.lightbox__button');
const modalImg = document.querySelector('.lightbox__image');
let currentIndex = 0;

// Створення галереї
galleryItems.forEach((item, i) => {
  const listItem = `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
          data-index="${i}"
        />
      </a>
    </li>`;
  preview.insertAdjacentHTML('beforeend', listItem);
});

// Клік по прев'ю
preview.addEventListener('click', previewClick);

function previewClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;

  const bigImg = event.target;
  openModal(bigImg);
}

function openModal(img) {
  modal.classList.add('is-open');
  modalImg.src = img.dataset.source;
  modalImg.alt = img.alt;
  currentIndex = Number(img.dataset.index);

  modal.addEventListener('click', modalClick);
  window.addEventListener("keydown", keyHandler);
}

function closeModal() {
  modal.classList.remove('is-open');
  modalImg.src = '';
  modalImg.alt = '';

  modal.removeEventListener('click', modalClick);
  window.removeEventListener('keydown', keyHandler);
}

function modalClick(event) {
  if (event.target.nodeName === 'BUTTON' || event.target.classList.contains('lightbox__overlay')) {
    closeModal();
  }
}

function keyHandler(event) {
  const key = event.code;
  if (key === "Escape") closeModal();
  if (key === "ArrowRight") onArrowRight();
  if (key === "ArrowLeft") onArrowLeft();
}

function onArrowRight() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updateModalImage();
}

function onArrowLeft() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updateModalImage();
}

function updateModalImage() {
  modalImg.src = galleryItems[currentIndex].original;
  modalImg.alt = galleryItems[currentIndex].description;
}
