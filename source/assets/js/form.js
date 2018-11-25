'use strict';

const $form = document.querySelector('.js-add-note-form');
const $inputs = {
  title: document.querySelector('#title'),
  content: document.querySelector('#content')
};
const baseUrl = 'http://localhost:3000/notes';

const isValid = () =>
  $inputs.title.value !== '' && $inputs.content.value !== '';

const submitForm = (event) => {
  event.preventDefault();

  if (isValid()) {
    const data = new FormData($form);

    fetch(baseUrl, {
      method: 'PUT',
      body: data
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const init = () => {
  $form.addEventListener('submit', submitForm, false);
};

document.addEventListener('DOMContentLoaded', init, false);
