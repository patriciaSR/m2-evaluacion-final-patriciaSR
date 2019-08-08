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
  const showName = showInput.value;

  fetch(ENDPOINT + showName)
    .then(response => response.json())
    .then(data => {
      removePreviuosSearch();
      for (const item of data) {
        let showImage = '';
        if (item.show.image) {
          showImage = item.show.image.medium;
        } else {
          showImage = defaultImage;
        }

        const show = {
          title: item.show.name,
          image: showImage,
          id: item.show.id
        };

        const showNewLi = createNewShowElement(show);
        resultList.appendChild(showNewLi);
      }
    });
}

function createNewShowElement(show) {
  const showNewLi = document.createElement('li');
  const showNewImage = document.createElement('img');
  const showNewTitle = document.createElement('h3');

  showNewLi.classList.add('show__item');
  showNewLi.id = show.id;
  showNewImage.classList.add('show__img');
  showNewImage.src = show.image;
  showNewImage.alt = show.title;
  showNewTitle.classList.add('show__title');
  showNewTitle.innerText = show.title;

  showNewLi.appendChild(showNewImage);
  showNewLi.appendChild(showNewTitle);

  showNewLi.addEventListener('click', addFavouriteShow);

  return showNewLi;
}

function addFavouriteShow(event) {
  event.currentTarget.classList.toggle('favourite');
}

function removePreviuosSearch() {
  resultList.innerHTML = '';
}
