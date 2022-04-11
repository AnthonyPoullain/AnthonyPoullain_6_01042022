// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  const { id, name, portrait, city, tagline, price } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    // Creating HTML elements
    const photographerProfile = document.createElement('article');
    const photographerLink = document.createElement('a');
    photographerLink.href = `./photographer.html?id=${id}`;
    const photographerImg = document.createElement('img');
    photographerImg.setAttribute('src', picture);
    const photographerName = document.createElement('h2');
    const photographerCity = document.createElement('h3');
    const photographerTagline = document.createElement('p');
    const photographerPrice = document.createElement('span');

    // Setting classes
    photographerProfile.classList.add('photographer-card');
    photographerLink.classList.add('photographer-card__link');
    photographerImg.classList.add('photographer-card__img');
    photographerName.classList.add('photographer-card__name');
    photographerCity.classList.add('photographer-card__city');
    photographerTagline.classList.add('photographer-card__tagline');
    photographerPrice.classList.add('photographer-card__price');

    // Setting text content
    photographerName.textContent = name;
    photographerCity.textContent = city;
    photographerTagline.textContent = tagline;
    photographerPrice.textContent = `${price}€/jour`;

    // Setting accessibility attributes
    photographerImg.setAttribute('alt', `Photo de profil de ${name}`);
    photographerLink.setAttribute('aria-label', `En savoir plus sur ${name}`);

    // Appending html children elements to the main element
    photographerProfile.appendChild(photographerLink);
    photographerLink.appendChild(photographerImg);
    photographerLink.appendChild(photographerName);
    photographerProfile.appendChild(photographerCity);
    photographerProfile.appendChild(photographerTagline);
    photographerProfile.appendChild(photographerPrice);

    // Returning the main element
    return photographerProfile;
  }

  // header for photographer page
  function getUserHeaderDOM() {
    // Creating HTML elements
    const photographerDescription = document.createElement('div');
    const photographerImgContainer = document.createElement('div');
    const photographerImg = document.createElement('img');
    photographerImg.setAttribute('src', picture);
    const photographerName = document.createElement('h2');
    const photographerCity = document.createElement('h3');
    const photographerTagline = document.createElement('p');
    // const photographerPrice = document.createElement('span');

    // Setting classes
    photographerDescription.classList.add('photograph-header__description');
    photographerImg.classList.add('photograph-header__img');
    photographerName.classList.add('photograph-header__name');
    photographerCity.classList.add('photograph-header__city');
    photographerTagline.classList.add('photograph-header__tagline');

    // Setting text content
    photographerName.textContent = name;
    photographerCity.textContent = city;
    photographerTagline.textContent = tagline;
    // photographerPrice.textContent = `${price}€/jour`;

    // Setting accessibility attributes
    photographerImg.setAttribute('alt', `Photo de profil de ${name}`);

    // Appending html children elements to the main element
    photographerDescription.appendChild(photographerName);
    photographerDescription.appendChild(photographerCity);
    photographerDescription.appendChild(photographerTagline);
    photographerImgContainer.appendChild(photographerImg);
    // photographerHeader.appendChild(photographerPrice);

    // Returning the main elements
    return { photographerDescription, photographerImgContainer };
  }

  // return { name, picture, getUserCardDOM };
  return { name, getUserCardDOM, getUserHeaderDOM };
}

function mediaFactory(data, name) {
  const { id, photographerId, title, image, video, likes, date, price } = data;
  const picture = `assets/photos/${name}/${data.image ? image : video}`;

  function getUserMediaDOM() {
    // Creating HTML elements
    const media = document.createElement('article');
    const mediaLink = document.createElement('a');
    mediaLink.setAttribute('href', '#');
    const mediaThumbnail = document.createElement(`${image ? 'img' : 'video'}`);
    mediaThumbnail.setAttribute('src', picture);
    mediaThumbnail.setAttribute('alt', `Photo titled ${title}`);
    const mediaDescription = document.createElement('div');
    const mediaTitle = document.createElement('h2');
    mediaThumbnail.setAttribute('alt', `Photo titled ${title}`);
    const mediaLikes = document.createElement('span');
    const mediaHeart = document.createElement('i');
    mediaHeart.classList.add('fa-solid');
    mediaHeart.classList.add('fa-heart');

    // Setting classes
    media.classList.add('media-card');
    mediaLink.classList.add('media-card__link');
    mediaThumbnail.classList.add('media-card__img');
    mediaDescription.classList.add('media-card__description');
    mediaTitle.classList.add('media-card__title');
    mediaLikes.classList.add('media-card__likes');

    // Setting text content
    mediaTitle.textContent = title;
    mediaLikes.textContent = likes;

    // Appending html children elements to the main card element
    media.appendChild(mediaLink);
    media.appendChild(mediaDescription);
    mediaLink.appendChild(mediaThumbnail);
    mediaDescription.appendChild(mediaTitle);
    mediaDescription.appendChild(mediaLikes);
    mediaLikes.appendChild(mediaHeart);

    // Returning the main element
    return media;
  }
  return { getUserMediaDOM };
}
