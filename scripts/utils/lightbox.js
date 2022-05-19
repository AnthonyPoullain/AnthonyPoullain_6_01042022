/* global displayedMedia */
/* global trapFocus */

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
  const mediaTitle =
    displayedMedia[mediaIndex].querySelector('.media-card__title').textContent;
  lightboxTitle.textContent = mediaTitle;
  currentMediaIndex = mediaIndex;
  trapFocus(lightbox);
}

function closeLightbox() {
  if (lightbox.style.display !== 'none') lightbox.style.display = 'none';
}

// Generate the zoomed-in media HTML element from the clicked element
function createZoomedMediaEl(mediaElement) {
  mediaElement = mediaElement.cloneNode();
  mediaElement.removeAttribute('tabindex');
  if (mediaElement.nodeName === 'VIDEO') {
    mediaElement.setAttribute('autoplay', '');
    mediaElement.setAttribute('controls', '');
    mediaElement.ariaLabel = mediaElement.ariaLabel.split(', closeup')[0];
  } else {
    mediaElement.alt = mediaElement.alt.split(', closeup')[0];
  }
  return mediaElement;
}

function nextMedia() {
  if (currentMediaIndex === displayedMedia.length - 1) return;
  openLightbox(currentMediaIndex + 1);
}

function previousMedia() {
  if (!currentMediaIndex) return;
  openLightbox(currentMediaIndex - 1);
}
