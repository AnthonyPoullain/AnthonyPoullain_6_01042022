/* global openLightbox */
/* global photographerFactory */
/* global mediaFactory */

const params = new URL(document.location).searchParams;
const id = parseInt(params.get('id'));
let displayedMedia;

// ========== Data functions ==========
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

// ========== Display functions ==========
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

// ========== Sort function ==========
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

// ========== Listen functions ==========
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

// ========== Sorting menu ==========
/* Look for any elements with the class "custom-select": */
const x = document.getElementsByClassName('custom-select');
for (let i = 0; i < x.length; i++) {
  const selElmnt = x[i].getElementsByTagName('select')[0];
  /* For each element, create a new DIV that will act as the selected item: */
  const a = document.createElement('DIV');
  a.setAttribute('class', 'select-selected');
  a.setAttribute('tabindex', '0');
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  const b = document.createElement('DIV');
  b.setAttribute('class', 'select-items select-hide');
  for (let j = 1; j < selElmnt.length; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    const c = document.createElement('DIV');
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.setAttribute('tabindex', '0');
    [('click', 'keydown')].forEach((evt) => {
      c.addEventListener(evt, function (evt) {
        // const keys = ['Enter', 'Tab', 'ShiftLeft', 'ShiftRight'];
        // if (evt.type === 'keydown' && !keys.includes(evt.code)) return;
        /* When an item is clicked, update the original select box,
        and the selected item: */
        const s = this.parentNode.parentNode.getElementsByTagName('select')[0];
        const h = this.parentNode.previousSibling;
        for (let i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML === this.innerHTML) {
            s.selectedIndex = i;
            const previousValue = h.innerHTML;
            h.innerHTML = this.innerHTML;
            this.innerHTML = previousValue;
            // Manually fire change event otherwise addEventListener cant pick it up
            const e = new Event('change');
            s.dispatchEvent(e);
            break;
          }
        }
        h.click();
      });
    });

    b.appendChild(c);
  }
  x[i].appendChild(b);

  ['click', 'keydown'].forEach((evt) => {
    a.addEventListener(evt, function (e) {
      // if (evt.type === 'keydown' && evt.code !== 'Enter') return;
      /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle('select-hide');
      this.classList.toggle('select-arrow-active');
    });
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  const arrNo = [];
  const x = document.getElementsByClassName('select-items');
  const y = document.getElementsByClassName('select-selected');
  for (let i = 0; i < y.length; i++) {
    if (elmnt === y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove('select-arrow-active');
    }
  }
  for (let i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide');
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener('click', closeAllSelect);

// ========== Init ==========
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
