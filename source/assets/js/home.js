'use strict';

const baseUrl = 'http://localhost:3000/notes';
const $noteList = document.querySelector('.js-note-list');

const getNotesData = () =>
  new Promise((resolve, reject) => {
    fetch(baseUrl, {
      method: 'GET'
    })
      .then((res) => {
        resolve(res.json());
      })
      .catch((err) => {
        reject(err);
      });
  });

const deleteCard = (id) => {
  fetch(baseUrl + '/' + id, {method: 'DELETE'})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const printCards = function(data) {
  const templateString = document.querySelector('#note-card-template')
    .innerHTML;

  data.forEach((card) => {
    const template = templateString
      .replace('{id}', card._id)
      .replace('{heading}', card.title)
      .replace('{image}', card.thumbnail)
      .replace('{date}', card.time)
      .replace('{creator}', card.creator)
      .replace('{text}', card.content);

    $noteList.innerHTML += template;
  });

  [].forEach.call($noteList.querySelectorAll('.js-delete-card'), ($button) => {
    const id = $button.parentNode.dataset.cardId;

    $button.addEventListener(
      'click',
      () => {
        deleteCard(id);
      },
      false
    );
  });
};

const init = () => {
  getNotesData()
    .then((json) => {
      printCards(json);
    })
    .catch((err) => {
      console.log(err);
    });
};

document.addEventListener('DOMContentLoaded', init, false);
