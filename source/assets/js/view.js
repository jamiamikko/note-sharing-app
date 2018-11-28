'use strict';

const baseUrl = 'http://localhost:3000/notes';

const getNoteById = (id) =>
  new Promise((resolve, reject) => {
    fetch(baseUrl + '/' + id, {
      method: 'GET'
    })
      .then((res) => {
        resolve(res.json());
      })
      .catch((err) => {
        reject(err);
      });
  });

const init = () => {
  const noteId = location.pathname.split('/notes/view/')[1];

  getNoteById(noteId)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

document.addEventListener('DOMContentLoaded', init, false);
