import 'normalize.css';
import './styles/main.scss';

let index = 1;

const on = (listener, query, fn) => {
  document.querySelectorAll(query).forEach((item) => {
    item.addEventListener(listener, (el) => {
      fn(el);
    });
  });
};

on('click', '.selectBtn', (item) => {
  const next = item.target.nextElementSibling;
  next.classList.toggle('toggle');
  next.style.zIndex = index++;
});
on('click', '.option', (item) => {
  item.target.parentElement.classList.remove('toggle');

  const parent = item.target.closest('.select').children[0];
  parent.setAttribute('data-type', item.target.getAttribute('data-type'));
  parent.innerText = item.target.innerText;
});

// Burger menu //

const burger = document.querySelector('.burger');
const close = document.querySelector('.close');
const nav = document.querySelector('.header__nav-mobile');

burger.addEventListener('click', () => {
  burger.classList.remove('active-menu');
  close.classList.add('active-menu');
  nav.classList.add('header__nav-mobile-active');
  document.body.style.overflow = 'hidden';
});
close.addEventListener('click', () => {
  close.classList.remove('active-menu');
  burger.classList.add('active-menu');
  nav.classList.remove('header__nav-mobile-active');
  document.body.style.overflow = 'visible';
});

// Input range

function valueInpTypeRange() {
  const range = document.querySelector('#range');
  const text = document.querySelector('.percent');
  text.innerHTML = `${range.value} %`;
}
//Навешиваем событие
const a = document.querySelector('#range');
a.addEventListener('input', valueInpTypeRange);

// form //

const form = document.querySelector('.form');
const select = document.querySelector('.selectBtn');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  formData.append('system-type', select.textContent);

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        // Handle a successful response from the server
        console.log('Form submitted successfully');
        // You can perform any additional actions here
      } else {
        // Handle errors if the server returns an error response
        console.error('Form submission failed');
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      console.error('An error occurred:', error);
    })
    .finally(() => {
      select.innerHTML = 'Выберите тип системы';
      form.reset();
    });
});

function submitForm() {
  form.submit();
}
