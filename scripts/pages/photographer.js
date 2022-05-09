/* global openLightbox */
/* global photographerFactory */
/* global mediaFactory */

const params = new URL(document.location).searchParams;
const id = parseInt(params.get('id'));
let displayedMedia;

//  Data functions
async function getPhotographers() {
  // Fetch photographers data
  const response = await fetch('./data/photographers.json').catch(
    console.error
  );
  const photographers = await response.json().catch(console.error);
  return {
    photographers: [...photographers.photographers],
    media: [...photographers.media],
  };
}

async function getPhotographer() {
  const photographers = await getPhotographers();
  const photographer = photographers.photographers.find(
    (item) => item.id === id
  );
  const media = photographers.media.filter(
    (element) => element.photographerId === id
  );
  // Add totalLikes to photographer data
  photographer.totalLikes = media.reduce(
    (total, currentItem) => total + currentItem.likes,
    0
  );
  // Add photographerName to media data
  media.forEach((item) => (item.photographerName = photographer.name));
  return { photographer: photographer, media: [...media] };
}

//  Display functions
function displayHeader(photographer) {
  const photographerHeader = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographer);
  const { photographerDescription, photographerImgContainer } =
    photographerModel.getUserHeaderDOM();
  photographerHeader.insertAdjacentElement(
    'afterbegin',
    photographerDescription
  );
  photographerHeader.insertAdjacentElement(
    'beforeend',
    photographerImgContainer
  );
}

function displayMedia(photographer) {
  const mediaModel = mediaFactory(photographer);
  const mediaElement = mediaModel.getUserMediaDOM();
  document
    .querySelector('#main')
    .insertAdjacentElement('beforeend', mediaElement);
  displayedMedia = [...mediaElement.children];
  // // Put HTML media element to its corresponding photographer.media object for ease of access
  photographer.forEach((el, i) => (el.html = displayedMedia[i]));
}

function displayInfoBar(photographer) {
  const infoBarModel = photographerFactory(photographer);
  const infoBarElement = infoBarModel.getUserInfoBarDOM();
  document.querySelector('#main').appendChild(infoBarElement);
}

//  Sort function
function sortMedia(data, sortingMethod) {
  switch (sortingMethod) {
    case 'popularity':
      data.sort((a, b) => {
        return a.likes - b.likes;
      });
      data.reverse();
      break;
    case 'date':
      data.sort((a, b) => {
        return a.date.localeCompare(b.date);
      });
      data.reverse();
      break;
    case 'title':
      data.sort((a, b) => {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      });
      break;
  }
  if (!data) console.error('No media to sort');
  const mediaSection = document.querySelector('.media-section');
  displayedMedia = data.map((item) => item.html);
  mediaSection.innerHTML = '';
  data.forEach((el) => mediaSection.appendChild(el.html));
}

//  Listen functions
function listenForClickOnMedia() {
  document.querySelectorAll('.media-card__img').forEach((item, index) => {
    ['click', 'keydown'].forEach((evt) => {
      item.addEventListener(evt, (evt) => {
        if (evt.type === 'keydown' && evt.code !== 'Enter') return;
        openLightbox(index);
      });
    });
  });
}

function listenForLikes() {
  const hearts = document.querySelectorAll('.media-card__heart-btn');
  const likes = document.querySelectorAll('.media-card__likes');
  const totalLikes = document.querySelector('.info-bar__likes');
  hearts.forEach((heart, index) => {
    heart.addEventListener('click', () => {
      if (heart.dataset.liked === 'false') {
        parseInt(likes[index].textContent++);
        parseInt(totalLikes.textContent++);
        heart.dataset.liked = 'true';
        return;
      }
      parseInt(likes[index].textContent--);
      parseInt(totalLikes.textContent--);
      heart.dataset.liked = 'false';
    });
  });
}

//  Trap focus
function trapFocus(modal) {
  const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
  const focusableContent = modal.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
  document.addEventListener('keydown', function (e) {
    const isTabPressed = e.code === 'Tab';
    if (!isTabPressed) return;
    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        e.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocusableElement) {
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus(); // add focus for the first focusable element
        e.preventDefault();
      }
    }
  });
  // document.addEventListener(
  //   'keydown',
  //   (evt) => {
  //     if (evt.code === 'Tab') {
  firstFocusableElement.focus();
  //     }
  //   },
  //   { once: true }
  // );
}

//  Init
async function init() {
  // Get photograph data
  const photographer = await getPhotographer();

  // Display data
  displayHeader(photographer.photographer);
  displayMedia(photographer.media);
  displayInfoBar(photographer.photographer);

  // Sort media elements
  const sortingMenu = document.querySelector('select');
  sortMedia(photographer.media, sortingMenu.value);
  // Listen for clicks once media loaded and sorted
  listenForClickOnMedia();
  listenForLikes();
  sortingMenu.addEventListener('change', () => {
    sortMedia(photographer.media, sortingMenu.value);
    // Listen again if sorting value changes to update displayedMedia array order
    listenForClickOnMedia();
  });

  // Play video on hover & focus
  const videos = document.querySelectorAll('video');
  videos.forEach((video) => {
    ['mouseover', 'focus'].forEach((evt) => {
      video.addEventListener(evt, () => {
        video.play();
      });
    });
    ['mouseleave', 'focusout'].forEach((evt) => {
      video.addEventListener(evt, () => {
        video.pause();
        video.currentTime = 0;
      });
    });
  });
}

init();
