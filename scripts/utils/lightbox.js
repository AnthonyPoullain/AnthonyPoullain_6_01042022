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

// Select loaded media and push it to media array
// function getMedia() {
//   if (media.length > 0) return;
//   const mediaEl = document.querySelectorAll(
//     '.media-card__img > img, .media-card__img > video'
//   );
//   mediaEl.forEach((el) => {
//     media.push(el);
//   });
//   listenForClick();
// }

function displayLightbox(mediaIndex) {
  document.querySelector('.lightbox').style.display = 'flex';
  document.querySelector('.lightbox__img').innerHTML = '';
  document.querySelector('.lightbox__img').insertAdjacentElement(
    'afterbegin',
    // eslint-disable-next-line no-undef
    createZoomedMediaEl(displayedMedia[mediaIndex])
  );
  currentMediaIndex = mediaIndex;
}

function closeLightbox() {
  document.querySelector('.lightbox').style.display = 'none';
}

function listenForClick() {
  // eslint-disable-next-line no-undef
  displayedMedia.forEach((item, index) => {
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
  // eslint-disable-next-line no-undef
  if (currentMediaIndex === displayedMedia.length - 1) return;
  // eslint-disable-next-line no-undef
  const nextImg = displayedMedia[currentMediaIndex + 1];
  currentMediaIndex++;
  document
    .querySelector('.lightbox__img img, .lightbox__img video')
    .replaceWith(createZoomedMediaEl(nextImg));
}

function previousMedia() {
  if (!currentMediaIndex) return;
  // eslint-disable-next-line no-undef
  const previousImg = displayedMedia[currentMediaIndex - 1];
  currentMediaIndex--;
  document
    .querySelector('.lightbox__img img, .lightbox__img video')
    .replaceWith(createZoomedMediaEl(previousImg));
}
