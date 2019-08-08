'use strict';

//add querySelectors
const showInput = document.querySelector('.finder__input');
const finderButton = document.querySelector('.finder__btn');
const resultList = document.querySelector('.show-result__list');
const favouriteList = document.querySelector('.show-favourites__list');


const ENDPOINT = 'http://api.tvmaze.com/search/shows?q=';
const defaultImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let shows = [];

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

        const showNewLi = createShowElement(show, false);
        resultList.appendChild(showNewLi);
      }
    });
}

function createShowElement(show, isFavourite) {
  const showNewLi = document.createElement('li');
  const showNewImage = document.createElement('img');
  const showNewTitle = document.createElement('h3');
  const icon = document.createElement('i');

  if (isFavourite) {
    showNewLi.classList.add('small');
  }

  if (isFavourite) {
    icon.classList.add('fas', 'fa-times-circle');
    // icon.addEventListener('click', () => {
    //   removeFavourite(show, showNewLi);
    // });
    showNewLi.appendChild(icon);
  } else {
    showNewLi.addEventListener('click', addFavouriteShow);
  }

  showNewLi.classList.add('show__item');
  showNewLi.id = show.id;
  showNewImage.classList.add('show__img');
  showNewImage.src = show.image;
  showNewImage.alt = show.title;
  showNewTitle.classList.add('show__title');
  showNewTitle.innerText = show.title;

  showNewLi.appendChild(showNewImage);
  showNewLi.appendChild(showNewTitle);

  return showNewLi;
}

function addFavouriteShow(event) {
  event.currentTarget.classList.toggle('favourite');
  createFavouriteElement(event);
}

function removePreviuosSearch() {
  resultList.innerHTML = '';
}

function createFavouriteElement(event) {
  const showTitle = event.currentTarget.querySelector('h3');
  const showTitleText = showTitle.innerText;
  const showImage = event.currentTarget.querySelector('img');
  const showImageSrc = showImage.src;
  const showId = event.currentTarget.id;


  let foundIndex = findFavouriteIndex(showId);

  if (foundIndex === -1) {
    const show = {
      title: showTitleText,
      image: showImageSrc,
      id: showId
    };
    const newShowLi = createShowElement(show, true);

    favouriteList.appendChild(newShowLi);
    shows.push(show);
    localStorage.setItem('shows', JSON.stringify(show));
  }
}


function findFavouriteIndex(showId) {
  let foundIndex = -1;

  for (let i = 0; i < shows.length; i++) {
    if (shows[i].id === showId) {
      foundIndex = i;
    }
  }
  return foundIndex;
}

