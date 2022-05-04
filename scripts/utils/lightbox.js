/* global displayedMedia */

// Global media index for currently viewed in lightbox (allows for arrow buttons increment/decrementation)
let currentMediaIndex;

// DOM elements
const lightbox = document.querySelector('#lightbox');
const lightboxMedia = document.querySelector('.lightbox__img');
const lightboxTitle = document.querySelector('.lightbox__title');
const rightArrow = lightbox.querySelector('#right-arrow');
const leftArrow = lightbox.querySelector('#left-arrow');

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
  const lightboxIsOpen = lightbox.style.display === 'flex';
  if (lightboxIsOpen) {
    if (event.code === 'ArrowLeft') {
      previousMedia();
    }
    if (event.code === 'ArrowRight') {
      nextMedia();
    }
    if (event.code === 'Escape') {
      closeLightbox();
    }
  }
});

// Lightbox functionalities
function openLightbox(mediaIndex) {
  if (lightbox.style.display !== 'flex') lightbox.style.display = 'flex';
  lightboxMedia.innerHTML = '';
  lightboxMedia.insertAdjacentElement(
    'afterbegin',
    createZoomedMediaEl(displayedMedia[mediaIndex].querySelector('img, video'))
  );
  lightboxTitle.textContent =
    displayedMedia[mediaIndex].querySelector('.media-card__title').textContent;
  currentMediaIndex = mediaIndex;
}

function closeLightbox() {
  if (lightbox.style.display !== 'none') lightbox.style.display = 'none';
}

// Generate the zoomed-in media HTML element from the clicked element
function createZoomedMediaEl(mediaElement) {
  mediaElement = mediaElement.cloneNode();
  mediaElement.removeAttribute('tabindex');
  mediaElement.removeAttribute('aria-label');
  if (mediaElement.nodeName === 'VIDEO') {
    mediaElement.setAttribute('autoplay', '');
    mediaElement.setAttribute('controls', '');
  }
  return mediaElement;
}

function nextMedia() {
  if (currentMediaIndex === displayedMedia.length - 1) return;
  if (leftArrow.style.opacity === '0') {
    leftArrow.style.opacity = '1';
  }
  if (currentMediaIndex >= displayedMedia.length - 2) {
    // Hide arrow if no more media
    rightArrow.style.opacity = '0';
  }
  openLightbox(currentMediaIndex + 1);
}

function previousMedia() {
  if (!currentMediaIndex) return;
  if (rightArrow.style.opacity === '0') {
    rightArrow.style.opacity = '1';
  }
  if (currentMediaIndex <= 1) {
    // Hide arrow if no more media
    leftArrow.style.opacity = '0';
  }
  openLightbox(currentMediaIndex - 1);
}
