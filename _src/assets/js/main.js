'use strict';

//add querySelectors
const showInput = document.querySelector('.finder__input');
const finderButton = document.querySelector('.finder__btn');
const resultList = document.querySelector('.show-result__list');
const favsList = document.querySelector('.show-favourites__list');


const ENDPOINT = 'http://api.tvmaze.com/search/shows?q=';
const defaultImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

//listeners
finderButton.addEventListener('click', searchShow);

//Functions
function searchShow() {
  sendRequest();
}

function sendRequest() {
  const showName = showInput.nodeValue;
  fetch(ENDPOINT + showName)
    .then(response => response.json())
    .then(data => {
      let showImage = '';

      for (const item of data) {
        if (item.show.image) {
          showImage = item.show.image.medium;
        } else {
          showImage = defaultImage;
        }

        const showName = item.show.name;
        const showId = item.show.id;

        return createNewShowElement(showImage, showName, showId);

      }
    });
}
