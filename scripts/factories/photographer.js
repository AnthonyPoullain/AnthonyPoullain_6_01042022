function photographerFactory(data) {
  const { id, name, portrait, city, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const photographerProfile = document.createElement('article');
    const photographerLink = document.createElement('a');
    photographerLink.href = `./photographer.html?id=${id}`;
    const photographerImg = document.createElement('img');
    photographerImg.setAttribute('src', picture);
    const photographerName = document.createElement('h2');
    const photographerCity = document.createElement('h3');
    const photographerTagline = document.createElement('p');
    const photographerPrice = document.createElement('span');

    // assigning the data to the DOM Elements
    photographerName.textContent = name;
    photographerCity.textContent = city;
    photographerTagline.textContent = tagline;
    photographerPrice.textContent = `${price}€/jour`;

    // making the displayed data accessible
    photographerImg.setAttribute('alt', `Photo de profil de ${name}`);
    photographerLink.setAttribute('aria-label', `En savoir plus sur ${name}`);

    // clickable part, containing photo and title
    photographerProfile.appendChild(photographerLink);
    photographerLink.appendChild(photographerImg);
    photographerLink.appendChild(photographerName);

    // paragraph
    photographerProfile.appendChild(photographerCity);
    photographerProfile.appendChild(photographerTagline);
    photographerProfile.appendChild(photographerPrice);
    return photographerProfile;
  }

  // return { name, picture, getUserCardDOM };
  return { getUserCardDOM };
}
