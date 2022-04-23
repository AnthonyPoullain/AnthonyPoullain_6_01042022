function photographerFactory(data) {
  const { id, name, portrait, city, tagline, price, totalLikes } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    // Creating HTML elements
    const photographerProfile = document.createElement('article');
    const photographerLink = document.createElement('a');
    const photographerImg = document.createElement('img');
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

    // Setting attributes
    photographerLink.setAttribute('aria-label', `${name}`);
    photographerLink.setAttribute('href', `./photographer.html?id=${id}`);
    photographerImg.setAttribute('src', picture);
    photographerImg.setAttribute('alt', '');

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
    const photographerName = document.createElement('h2');
    const photographerCity = document.createElement('h3');
    const photographerTagline = document.createElement('p');

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

    // Setting attributes
    photographerImg.setAttribute('src', picture);
    photographerImg.setAttribute('alt', `${name}`);

    // Appending html children elements to the main element
    photographerDescription.appendChild(photographerName);
    photographerDescription.appendChild(photographerCity);
    photographerDescription.appendChild(photographerTagline);
    photographerImgContainer.appendChild(photographerImg);

    // Returning the main elements
    return { photographerDescription, photographerImgContainer };
  }

  function getUserInfoBarDOM() {
    // Creating HTML elements
    const infoBar = document.createElement('div');
    const photographerLikes = document.createElement('span');
    const photographerPrice = document.createElement('span');
    const heart = document.createElement('i');

    // Setting classes
    infoBar.classList.add('info-bar');
    photographerLikes.classList.add('info-bar__likes');
    photographerPrice.classList.add('info-bar__price');
    heart.classList.add('fa-solid');
    heart.classList.add('fa-heart');

    // Setting text content
    photographerLikes.textContent = totalLikes;
    photographerPrice.textContent = `${price}€/jour`;

    // Appending html children elements to the main element
    photographerLikes.appendChild(heart);
    infoBar.appendChild(photographerLikes);
    infoBar.appendChild(photographerPrice);

    // Returning the main elements
    return infoBar;
  }

  return {
    getUserCardDOM,
    getUserHeaderDOM,
    getUserInfoBarDOM,
  };
}

function mediaFactory(data) {
  function getUserMediaDOM() {
    // Creating the section
    const mediaSection = document.createElement('section');
    mediaSection.classList.add('media-section');

    data.forEach((item, index) => {
      const {
        // id,
        // photographerId,
        photographerName,
        title,
        image,
        video,
        likes,
        // date,
        // price,
      } = item;

      const mediaPath = `assets/photos/${photographerName
        .toLowerCase()
        .split(' ')[0]
        .split(' ')
        .join('-')}/${item.image ? image : video}`;

      // Creating HTML elements
      const mediaCard = document.createElement('article');
      const mediaThumbnail = document.createElement('div');
      const media = document.createElement(`${item.image ? 'img' : 'video'}`);
      const mediaDescription = document.createElement('div');
      const mediaTitle = document.createElement('h2');
      const mediaLikes = document.createElement('span');
      const mediaHeart = document.createElement('i');
      // Video play icon overlay
      if (item.video) {
        const playIcon = document.createElement('i');
        playIcon.classList.add('fa-solid');
        playIcon.classList.add('fa-circle-play');
        mediaThumbnail.insertAdjacentElement('afterbegin', playIcon);
      }

      // Setting classes
      mediaCard.classList.add('media-card');
      mediaThumbnail.classList.add('media-card__img');
      mediaDescription.classList.add('media-card__description');
      mediaTitle.classList.add('media-card__title');
      mediaLikes.classList.add('media-card__likes');
      mediaHeart.classList.add('fa-solid');
      mediaHeart.classList.add('fa-heart');

      // Setting text content
      mediaTitle.textContent = title;
      mediaLikes.textContent = likes;

      // Setting attributes
      media.setAttribute('src', mediaPath);
      media.setAttribute('aria-label', `${title}, closeup view`);
      media.setAttribute('tabindex', '0');
      if (index === data.length - 1)
        media.setAttribute('onload', 'listenForClick()');

      // Appending html children elements to the main card element
      mediaSection.appendChild(mediaCard);
      mediaCard.appendChild(mediaDescription);
      mediaCard.insertAdjacentElement('afterbegin', mediaThumbnail);
      mediaThumbnail.appendChild(media);
      mediaDescription.appendChild(mediaTitle);
      mediaDescription.appendChild(mediaLikes);
      mediaLikes.appendChild(mediaHeart);
    });
    // Returning the main element
    return mediaSection;
  }
  return { getUserMediaDOM };
}
