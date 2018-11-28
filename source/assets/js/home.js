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

const printCards = function(data) {
  const templateString = document.querySelector('#note-card-template')
    .innerHTML;

  data.forEach((card) => {
    const template = templateString
      .replace('{heading}', card.title)
      .replace('{image}', card.thumbnail)
      .replace('{date}', card.time)
      .replace('{creator}', card.creator)
      .replace('{text}', card.content);

    $noteList.innerHTML += template;
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
