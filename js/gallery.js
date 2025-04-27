export default [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


import galleryItems from "./gallery.js";

const preview = document.querySelector(".js-gallery");
const modal = document.querySelector(".lightbox");
const btn = document.querySelector('.lightbox__button');
const modalImg = document.querySelector('.lightbox__image');
let currentIndex = 0;
galleryItems.forEach((item, i) => {


    const listItem = `<li class="gallery__item">
    <a
    class="gallery__link"
    href="${item.preview}"
    >
    <img
        class="gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        alt="${item.description}"
        data-index ="${i}"
    />
    </a>
</li>`;

    preview.innerHTML += listItem

});

function previewClick(event) {
    event.preventDefault();

    if (event.target.nodeName !== "IMG") {
        return
    };

    let bigImg = event.target;

    openModal(bigImg);

}

function openModal(img = {}) {
    modalImg.src = img.dataset.source;
    modalImg.alt = img.alt;
    currentIndex = img.dataset.index;
    modal.classList.add('is-open');
    modal.addEventListener('click', modalClick);

    window.addEventListener("keydown", keyHendler)
}

function keyHendler(event) {
    const key = event.code
    switch (key) {
        case "Escape": closeModal();
            break;
        case "ArrowRight": onArrowRight();
            break;
        case "ArrowLeft": onArrowLeft();
            break;

    }
}


function onArrowRight() {
    if (currentIndex + 1 > galleryItems.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++
    }
    modalImg.src = galleryItems[currentIndex].original;
    modalImg.alt = galleryItems[currentIndex].description;
}


function onArrowLeft() {
    if (currentIndex - 1 < 0) {
        currentIndex = galleryItems.length - 1;
    } else {
        currentIndex--
    }
    modalImg.src = galleryItems[currentIndex].original;
    modalImg.alt = galleryItems[currentIndex].description;
}

function modalClick(event) {
    if (event.target.nodeName === 'BUTTON' || event.target.nodeName === "DIV") {
        closeModal();
    }
}

function closeModal() {
    window.removeEventListener('keydown', keyHendler);
    modal.classList.remove('is-open');

}

preview.addEventListener('click', previewClick);