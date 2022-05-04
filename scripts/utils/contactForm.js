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

// Trap focus inside modal
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

  firstFocusableElement.focus();
}

// Modal functionalities
function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
  displayName();
  trapFocus(modal);
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

async function displayName() {
  const title = document.querySelector('.modal h2');
  const photographer = await getPhotographer(id);
  title.insertAdjacentHTML(
    'beforeend',
    `</br>${photographer.photographer.name}`
  );
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
