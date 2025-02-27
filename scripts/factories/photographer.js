function photographerFactory(data) {
  const { id, name, portrait, city, tagline, price, totalLikes } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    // Create HTML elements
    const photographerProfile = document.createElement('article');
    const photographerLink = document.createElement('a');
    const photographerImg = document.createElement('img');
    const photographerName = document.createElement('h2');
    const photographerCity = document.createElement('h3');
    const photographerTagline = document.createElement('p');
    const photographerPrice = document.createElement('span');

    // Set classes
    photographerProfile.classList.add('photographer-card');
    photographerLink.classList.add('photographer-card__link');
    photographerImg.classList.add('photographer-card__img');
    photographerName.classList.add('photographer-card__name');
    photographerCity.classList.add('photographer-card__city');
    photographerTagline.classList.add('photographer-card__tagline');
    photographerPrice.classList.add('photographer-card__price');

    // Set text content
    photographerName.textContent = name;
    photographerCity.textContent = city;
    photographerTagline.textContent = tagline;
    photographerPrice.textContent = `${price}€/jour`;

    // Set attributes
    photographerLink.setAttribute('aria-label', `${name}`);
    photographerLink.setAttribute('href', `./photographer.html?id=${id}`);
    photographerImg.setAttribute('src', picture);
    photographerImg.setAttribute('alt', '');

    // Append html children elements to main element
    photographerProfile.appendChild(photographerLink);
    photographerLink.appendChild(photographerImg);
    photographerLink.appendChild(photographerName);
    photographerProfile.appendChild(photographerCity);
    photographerProfile.appendChild(photographerTagline);
    photographerProfile.appendChild(photographerPrice);

    // Return main element
    return photographerProfile;
  }

  function getUserHeaderDOM() {
    // Create HTML elements
    const photographerDescription = document.createElement('div');
    const photographerImgContainer = document.createElement('div');
    const photographerImg = document.createElement('img');
    const photographerName = document.createElement('h2');
    const photographerCity = document.createElement('h3');
    const photographerTagline = document.createElement('p');

    // Set classes
    photographerDescription.classList.add('photograph-header__description');
    photographerImg.classList.add('photograph-header__img');
    photographerName.classList.add('photograph-header__name');
    photographerCity.classList.add('photograph-header__city');
    photographerTagline.classList.add('photograph-header__tagline');

    // Set text content
    photographerName.textContent = name;
    photographerCity.textContent = city;
    photographerTagline.textContent = tagline;

    // Set attributes
    photographerImg.setAttribute('src', picture);
    photographerImg.setAttribute('alt', `${name}`);

    // Append html children elements to main element
    photographerDescription.appendChild(photographerName);
    photographerDescription.appendChild(photographerCity);
    photographerDescription.appendChild(photographerTagline);
    photographerImgContainer.appendChild(photographerImg);

    // Return main elements
    return { photographerDescription, photographerImgContainer };
  }

  function getUserInfoBarDOM() {
    // Create HTML elements
    const infoBar = document.createElement('div');
    const photographerLikes = document.createElement('span');
    const photographerPrice = document.createElement('span');
    const infoBarLeft = document.createElement('div');
    const heart = document.createElement('i');

    // Set classes
    infoBar.classList.add('info-bar');
    infoBarLeft.classList.add('info-bar__left');
    photographerLikes.classList.add('info-bar__likes');
    photographerPrice.classList.add('info-bar__price');
    heart.classList.add('fa-solid');
    heart.classList.add('fa-heart');

    // Set text content
    photographerLikes.textContent = totalLikes;
    photographerPrice.textContent = `${price}€/jour`;

    // Append html children elements to main element
    infoBar.appendChild(infoBarLeft);
    infoBarLeft.appendChild(photographerLikes);
    infoBarLeft.appendChild(heart);
    infoBar.appendChild(photographerPrice);

    // Return main element
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
    // Create section
    const mediaSection = document.createElement('section');
    mediaSection.classList.add('media-section');

    data.forEach((item) => {
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

      const mediaPath = `assets/photos/${photographerName.split(' ')[0]}/${
        item.image ? image : video
      }`;

      // Create HTML elements
      const mediaCard = document.createElement('article');
      const mediaThumbnail = document.createElement('div');
      const media = document.createElement(`${item.image ? 'img' : 'video'}`);
      const mediaDescription = document.createElement('div');
      const mediaTitle = document.createElement('h2');
      const mediaLikes = document.createElement('span');
      const mediaHeartBtn = document.createElement('button');
      const mediaHeart = document.createElement('i');

      // Video play icon overlay
      if (item.video) {
        const playIcon = document.createElement('i');
        playIcon.classList.add('fa-solid');
        playIcon.classList.add('fa-circle-play');
        mediaThumbnail.insertAdjacentElement('afterbegin', playIcon);
      }

      // Set classes
      mediaCard.classList.add('media-card');
      mediaThumbnail.classList.add('media-card__img');
      mediaDescription.classList.add('media-card__description');
      mediaTitle.classList.add('media-card__title');
      mediaLikes.classList.add('media-card__likes');
      mediaHeartBtn.classList.add('media-card__heart-btn');
      mediaHeart.classList.add('fa-solid');
      mediaHeart.classList.add('fa-heart');

      // Set text content
      mediaTitle.textContent = title;
      mediaLikes.textContent = likes;

      // Set attributes
      media.setAttribute('src', mediaPath);
      media.setAttribute(
        item.video ? 'aria-label' : 'alt',
        `${title}, closeup view`
      );
      media.setAttribute('tabindex', '0');
      mediaHeartBtn.setAttribute('aria-label', 'likes');

      // Append html children elements to main card element
      mediaSection.appendChild(mediaCard);
      mediaCard.appendChild(mediaDescription);
      mediaCard.insertAdjacentElement('afterbegin', mediaThumbnail);
      mediaThumbnail.appendChild(media);
      mediaDescription.appendChild(mediaTitle);
      mediaDescription.appendChild(mediaLikes);
      mediaHeartBtn.appendChild(mediaHeart);
      mediaDescription.appendChild(mediaHeartBtn);
    });
    // Return main element
    return mediaSection;
  }
  return { getUserMediaDOM };
}
