'use strict';

const baseUrl = window.location.origin + '/notes';
const $heading = document.querySelector('.js-note-heading');
const $image = document.querySelector('.js-note-image');
const $date = document.querySelector('.js-note-date');
const $creator = document.querySelector('.js-note-creator');
const $content = document.querySelector('.js-note-content');
const $editButton = document.querySelector('.js-edit-button');

const getNoteById = (id) =>
  new Promise((resolve, reject) => {
    fetch(baseUrl + '/get/' + id, {
      method: 'GET'
    })
      .then((res) => {
        resolve(res.json());
      })
      .catch((err) => {
        reject(err);
      });
  });

const showContent = (data) => {
  $heading.innerHTML = data.title;

  if ($image !== '') {
    $image.setAttribute('src', '../../' + data.image);
  } else {
    $image.remove();
  }

  $date.innerHTML = data.time;
  $creator.innerHTML += ' ' + data.creator;
  $content.innerHTML = data.content;

  if (data.creator === sessionStorage.getItem('username')) {
    $editButton.classList.remove('is-hidden');
  }
};

const init = () => {
  const noteId = location.pathname.split('/notes/view/')[1];

  getNoteById(noteId)
    .then((res) => {
      showContent(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

document.addEventListener('DOMContentLoaded', init, false);
