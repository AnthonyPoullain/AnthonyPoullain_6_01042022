/* global trapFocus */

// Sorting menu
/* Look for any elements with the class "custom-select": */
const x = document.getElementsByClassName('custom-select');
for (let i = 0; i < x.length; i++) {
  const selElmnt = x[i].getElementsByTagName('select')[0];
  /* For each element, create a new DIV that will act as the selected item: */
  const a = document.createElement('BUTTON');
  a.setAttribute('class', 'select-selected');
  a.setAttribute('aria-haspopup', 'listbox');
  a.setAttribute('aria-labelledby', 'sort-by');
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  const b = document.createElement('UL');
  b.setAttribute('class', 'select-items select-hide');
  b.setAttribute('id', 'select-items');
  b.setAttribute('role', 'listbox');
  b.setAttribute('aria-activedescendant', '0');
  for (let j = 0; j < selElmnt.length; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    const c = document.createElement('LI');
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.setAttribute('tabindex', '-1');
    c.setAttribute('id', `${j}`);
    c.setAttribute('role', 'option');
    if (j === 0) {
      c.setAttribute('aria-selected', 'true');
      // c.style.display = 'none';
    }
    ['click', 'keydown'].forEach((evt) => {
      c.addEventListener(evt, function (evt) {
        if (evt.type === 'keydown' && evt.code !== 'Enter') return;
        /* When an item is clicked, update the original select box,
        and the selected item: */
        const s = this.parentNode.parentNode.getElementsByTagName('select')[0];
        const h = this.parentNode.previousSibling;
        for (let i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML === this.innerHTML) {
            s.selectedIndex = i;
            document.querySelectorAll('[role="option"]').forEach((option) => {
              option.removeAttribute('aria-selected');
              // option.style.display = 'flex';
            });
            this.setAttribute('aria-selected', 'true');
            // this.style.display = 'none';

            b.setAttribute('aria-activedescendant', this.id);
            // const previousText = h.innerHTML;
            h.innerHTML = this.innerHTML;
            // this.innerHTML = previousText;
            // Manually fire change event otherwise addEventListener cant pick it up
            const e = new Event('change');
            s.dispatchEvent(e);
            closeAllSelect();
            break;
          }
        }
      });
      // h.click();
    });

    b.appendChild(c);
  }
  x[i].appendChild(b);

  a.addEventListener('click', function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */

    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
    if (!this.getAttribute('aria-expanded')) {
      this.setAttribute('aria-expanded', 'true');
      // document.querySelector('.select-items [aria-selected="true"]').focus();
      document.querySelector('.select-items li').focus();
    } else {
      this.removeAttribute('aria-expanded');
    }
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

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
  const sortBtn = document.querySelector('.select-selected');

  if (sortBtn.ariaExpanded) {
    if (e.key === 'Tab' || e.key === 'Escape') {
      // e.preventDefault();
      closeAllSelect();
      sortBtn.removeAttribute('aria-expanded');
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (document.activeElement.previousSibling) {
        document.activeElement.previousSibling.focus();
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (document.activeElement.nextSibling) {
        document.activeElement.nextSibling.focus();
      }
    }
  }
});
