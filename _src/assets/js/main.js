'use strict';

//add querySelectors
const showInput = document.querySelector('.finder__input');
const finderButton = document.querySelector('.finder__btn');
const resultList = document.querySelector('.show-result__list');
const favouriteList = document.querySelector('.show-favourites__list');


const ENDPOINT = 'http://api.tvmaze.com/search/shows?q=';
const defaultImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let shows = [];
let showsSearchFavs = [];


//listeners
finderButton.addEventListener('click', searchShow);
loadFavourites();

//Functions
function searchShow() {
  sendRequest();
}

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
          if (show.id === showNewLi.id) {
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
  showNewLi.id = show.id;
  showNewImage.classList.add('show__img');
  showNewImage.src = show.image;
  showNewImage.alt = show.title;
  showNewTitle.classList.add('show__title');
  showNewTitle.innerText = show.title;

  showNewLi.appendChild(showNewImage);
  showNewLi.appendChild(showNewTitle);

  if (isFavourite) {
    showNewLi.classList.add('small');
  }

  if (isFavourite) {
    icon.classList.add('fas', 'fa-times-circle');
    icon.addEventListener('click', () => {
      removeFavouriteShow(show, showNewLi);
    });
    showNewLi.appendChild(icon);
  } else {
    showNewLi.addEventListener('click', addFavouriteShow);
  }

  return showNewLi;
}


function addFavouriteShow(event) {
  const liSelected = event.currentTarget;
  liSelected.classList.toggle('favourite');
  // let showId = '';
  // if (liSelected.classList.contains('favourite')) {
  //   showId = liSelected.id;
  //   console.log(showId)
  //   showsSearchFavs.push('id', showId);
  // }

  createFavouriteElement(event);


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
    localStorage.setItem('shows', JSON.stringify(shows));
  }
}


function removeFavouriteShow(show, showNewLi) {
  showNewLi.remove();
  const indexShow = findFavouriteIndex(show.id);
  if (indexShow > -1) {
    shows.splice(indexShow, 1);
  }
  localStorage.setItem('shows', JSON.stringify(shows));
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
