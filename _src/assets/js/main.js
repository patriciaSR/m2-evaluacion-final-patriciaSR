'use strict';

//add querySelectors
const showInput = document.querySelector('.finder__input');
const finderButton = document.querySelector('.finder__btn');
const resultList = document.querySelector('.show-result__list');
const favouriteList = document.querySelector('.show-favourites__list');

const ENDPOINT = 'http://api.tvmaze.com/search/shows?q=';
const defaultImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

//Local Storage array
let shows = [];

//button listener and loadFavourites
finderButton.addEventListener('click', sendRequest);
loadFavourites();

//Functions
function sendRequest() {
  const showName = showInput.value;

  fetch(ENDPOINT + showName)
    .then(response => response.json())
    .then(data => {
      resultList.innerHTML = '';

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

        for (const show of shows) {
          if (show.id === showNewLi.getAttribute('data-id')) {
            showNewLi.classList.add('favourite');
          }
        }

        resultList.appendChild(showNewLi);
      }
    });
}

function createShowElement(show, isFavourite) {
  const showNewLi = document.createElement('li');
  const showNewImage = document.createElement('img');
  const showNewTitle = document.createElement('h3');
  const icon = document.createElement('i');

  showNewLi.classList.add('show__item');
  showNewLi.setAttribute('data-id', show.id);
  showNewImage.classList.add('show__img');
  showNewImage.src = show.image;
  showNewImage.alt = show.title;
  showNewTitle.classList.add('show__title');
  showNewTitle.innerText = show.title;

  showNewLi.appendChild(showNewImage);
  showNewLi.appendChild(showNewTitle);

  if (isFavourite) {
    showNewLi.classList.add('small');

    icon.classList.add('fas', 'fa-times-circle');
    icon.addEventListener('click', () => {
      removeFavourite(show, showNewLi);
    });

    showNewLi.appendChild(icon);
  } else {
    showNewLi.addEventListener('click', toggleFavouriteFromResults);
  }

  return showNewLi;
}

function toggleFavouriteFromResults(event) {
  const liSelected = event.currentTarget;
  liSelected.classList.toggle('favourite');

  if (liSelected.classList.contains('favourite')) {
    createShowFromFavourites(event);
  } else {
    const showId = liSelected.getAttribute('data-id');
    const liFavourite = favouriteList.querySelector(`[data-id="${showId}"]`);
    const iconFavourite = liFavourite.querySelector('i');
    iconFavourite.click(); //this click() calls to removeFavorite()
  }
}

function createShowFromFavourites(event) {
  const showTitle = event.currentTarget.querySelector('h3');
  const showTitleText = showTitle.innerText;
  const showImage = event.currentTarget.querySelector('img');
  const showImageSrc = showImage.src;
  const showId = event.currentTarget.getAttribute('data-id');

  //find favourite by index in shows array
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
    localStorage.setItem('shows', JSON.stringify(shows));
  }
}

//found index by showId
function findFavouriteIndex(showId) {
  let foundIndex = -1;

  for (let i = 0; i < shows.length; i++) {
    if (shows[i].id === showId) {
      foundIndex = i;
    }
  }
  return foundIndex;
}

function removeFavourite(show, showNewLi) {
  removeShowFromResults(show);
  removeShowFromFavourites(show, showNewLi);
}

function removeShowFromResults(show) {
  const liSearchToRemove = resultList.querySelector(`[data-id="${show.id}"]`);

  if (liSearchToRemove) {
    liSearchToRemove.classList.remove('favourite');
  }
}

function removeShowFromFavourites(show, showNewLi) {
  showNewLi.remove();

  const indexShow = findFavouriteIndex(show.id);

  if (indexShow > -1) {
    shows.splice(indexShow, 1);
  }
  localStorage.setItem('shows', JSON.stringify(shows));
}





//load localstorage favourites
function loadFavourites() {
  const lsFavsShows = localStorage.getItem('shows');

  if (lsFavsShows) {
    shows = JSON.parse(lsFavsShows);

    for (const show of shows) {
      const showElement = createShowElement(show, true);

      favouriteList.appendChild(showElement);
    }
  }
}
