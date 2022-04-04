// Mettre le code JavaScript lié à la page photographer.html
let params = new URL(document.location).searchParams;
let id = parseInt(params.get('id'));

// getting the photographers array from sessionStorage
const photographers = JSON.parse(
  window.sessionStorage.getItem('photographers')
);

const photographer = photographers.find((item) => item.id === id);
console.log(photographer);
