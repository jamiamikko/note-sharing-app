'use strict';

const baseUrl = 'http://localhost:3000/notes';

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

const init = () => {
  getNotesData()
    .then((json) => {
      console.log(json);
    })
    .catch((err) => {
      console.log(err);
    });
};

document.addEventListener('DOMContentLoaded', init, false);
