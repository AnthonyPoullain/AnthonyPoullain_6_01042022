/* global photographerFactory */

async function getPhotographers() {
  // Fetch photographers data
  const response = await fetch('data/photographers.json').catch((e) =>
    console.error(e.message)
  );
  const photographers = await response.json();
  return {
    photographers: [...photographers.photographers],
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Get photographers data
  const photographers = await getPhotographers();
  displayData(photographers.photographers);
}

init();
