// const media = [];
let currentMediaIndex;

// Keyboard shortcuts
document.addEventListener('keydown', function (event) {
  if (event.code === 'ArrowLeft') {
    if (document.querySelector('.lightbox').style.display) {
      previousMedia();
    }
  }
  if (event.code === 'ArrowRight') {
    if (document.querySelector('.lightbox').style.display) {
      nextMedia();
    }
  }
  if (event.code === 'Escape') {
    if (document.querySelector('.lightbox').style.display) {
      closeLightbox();
    }
  }
});

function openLightbox(mediaIndex) {
  const lightbox = document.querySelector('.lightbox');
  const lightboxMedia = document.querySelector('.lightbox__img');
  const lightboxTitle = document.querySelector('.lightbox__title');
  if (lightbox.style.display !== 'flex') lightbox.style.display = 'flex';
  lightboxMedia.innerHTML = '';
  lightboxMedia.insertAdjacentElement(
    'afterbegin',
    // eslint-disable-next-line no-undef
    createZoomedMediaEl(displayedMedia[mediaIndex].querySelector('img, video'))
  );
  lightboxTitle.textContent =
    // eslint-disable-next-line no-undef
    displayedMedia[mediaIndex].querySelector('.media-card__title').textContent;
  currentMediaIndex = mediaIndex;
}

function closeLightbox() {
  document.querySelector('.lightbox').style.display = 'none';
}

// Generate the zoomed-in media HTML element
function createZoomedMediaEl(mediaElement) {
  mediaElement = mediaElement.cloneNode();
  mediaElement.removeAttribute('onload');
  mediaElement.removeAttribute('tabindex');
  if (mediaElement.nodeName === 'VIDEO') {
    mediaElement.setAttribute('autoplay', '');
    mediaElement.setAttribute('controls', '');
  }
  return mediaElement;
}

function nextMedia() {
  // eslint-disable-next-line no-undef
  if (currentMediaIndex === displayedMedia.length - 1) return;
  openLightbox(currentMediaIndex + 1);
}

function previousMedia() {
  if (!currentMediaIndex) return;
  openLightbox(currentMediaIndex - 1);
}
