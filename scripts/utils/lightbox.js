const media = [];
let currentMediaIndex;

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

// Sélectionner les photos de la page
function getMedia() {
  if (media.length > 0) return;
  const mediaEl = document.querySelectorAll(
    '.media-card__img > img, .media-card__img > video'
  );
  mediaEl.forEach((el) => {
    media.push(el);
  });
  listenForClick();
}

function closeLightbox() {
  document.querySelector('.lightbox').style.display = 'none';
}

function listenForClick() {
  media.forEach((item, index) => {
    item.addEventListener('click', () => {
      document.querySelector('.lightbox').style.display = 'flex';

      document.querySelector('.lightbox__img').innerHTML = '';
      document
        .querySelector('.lightbox__img')
        .insertAdjacentElement('afterbegin', zoomedMedia(media[index]));
      currentMediaIndex = index;
    });
  });
}

// Generate the zoomed-in media HTML element
function zoomedMedia(mediaElement) {
  mediaElement = mediaElement.cloneNode();
  mediaElement.removeAttribute('onload');
  mediaElement.removeAttribute('tabindex');
  if (mediaElement.nodeName === 'VIDEO') {
    mediaElement.setAttribute('autoplay', '');
    mediaElement.setAttribute('controls', '');
  }
  return mediaElement;
}

// Display the next media
function nextMedia() {
  if (currentMediaIndex === media.length - 1) return;
  const nextImg = media[currentMediaIndex + 1];
  currentMediaIndex++;
  console.log();
  document.querySelector('.lightbox__img *').replaceWith(zoomedMedia(nextImg));
}

function previousMedia() {
  if (!currentMediaIndex) return;
  const previousImg = media[currentMediaIndex - 1];
  currentMediaIndex--;
  document
    .querySelector('.lightbox__img *')
    .replaceWith(zoomedMedia(previousImg));
}
