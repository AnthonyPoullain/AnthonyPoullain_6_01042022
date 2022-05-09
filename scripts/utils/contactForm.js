/* global id */
/* global getPhotographer */
/* global trapFocus */

// Keyboard shortcuts
document.addEventListener('keydown', function (event) {
  if (event.code === 'Escape') {
    if (document.querySelector('#contact_modal').style.display !== 'none') {
      closeModal();
    }
  }
});

// Modal functionalities
function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
  displayName();
  trapFocus(modal);
  const close = modal.querySelector('#close-modal');
  close.addEventListener('keydown', (evt) => {
    if (evt.code !== 'Enter') return;
    close.click();
  });
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

async function displayName() {
  const title = document.querySelector('.modal h2');
  const photographer = await getPhotographer(id);
  title.innerHTML = `Contactez-moi</br>${photographer.photographer.name}`;
}

// Get user input from form
const contactBtn = document.querySelector('#contact-form .contact_button');
const inputEls = Array.from(
  document.querySelectorAll('#contact-form input, #contact-form textarea')
);
contactBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = {};
  inputEls.forEach((el) => {
    formData[el.name] = el.value;
  });
  console.log(formData);
  closeModal();
});
