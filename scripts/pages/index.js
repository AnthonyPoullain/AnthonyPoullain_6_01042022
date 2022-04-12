async function getPhotographers() {
  // fetching the photographers data
  const response = await fetch('data/photographers.json');
  const photographers = await response.json();

  return {
    photographers: [...photographers.photographers],
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    console.log(photographer);
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);

  // Saving the photographers array to sessionStorage
  window.sessionStorage.setItem('photographers', JSON.stringify(photographers));
}

init();
