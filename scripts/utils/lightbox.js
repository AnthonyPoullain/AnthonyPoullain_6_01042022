const media = [];
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

// Select loaded media and push it to media array
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

function displayLightbox(mediaIndex) {
  document.querySelector('.lightbox').style.display = 'flex';
  document.querySelector('.lightbox__img').innerHTML = '';
  document
    .querySelector('.lightbox__img')
    .insertAdjacentElement(
      'afterbegin',
      createZoomedMediaEl(media[mediaIndex])
    );
  currentMediaIndex = mediaIndex;
}

function closeLightbox() {
  document.querySelector('.lightbox').style.display = 'none';
}

function listenForClick() {
  media.forEach((item, index) => {
    ['click', 'keypress'].forEach((evt) =>
      item.addEventListener(evt, () => displayLightbox(index))
    );
  });
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
  if (currentMediaIndex === media.length - 1) return;
  const nextImg = media[currentMediaIndex + 1];
  currentMediaIndex++;
  document
    .querySelector('.lightbox__img img, .lightbox__img video')
    .replaceWith(createZoomedMediaEl(nextImg));
}

function previousMedia() {
  if (!currentMediaIndex) return;
  const previousImg = media[currentMediaIndex - 1];
  currentMediaIndex--;
  document
    .querySelector('.lightbox__img img, .lightbox__img video')
    .replaceWith(createZoomedMediaEl(previousImg));
}
