const DB_PATH = 'https://raw.githubusercontent.com/AZbang/vk-hackathon-2018/gh-pages/';
const MUSEUMS_IMAGES = DB_PATH + '/museums/';
const ROOMS_IMAGES = DB_PATH + '/rooms/';
const ITEMS_IMAGES = DB_PATH + '/items/';

export function getMuseums() {
  return dispatch => {
    fetch(DB_PATH + '/museums.json')
      .then((response) => response.json())
      .then((data) => {
        dispatch({type: 'SET_MUSEUMS', data});
      });
  }
}


export function getRooms() {
  return dispatch => {
    fetch(DB_PATH + '/rooms.json')
      .then((response) => response.json())
      .then((data) => {
        dispatch({type: 'SET_ROOMS', data});
      });
  }
}


export function getItems() {
  return dispatch => {
    fetch(DB_PATH + '/items.json')
      .then((response) => response.json())
      .then((data) => {
        dispatch({type: 'SET_ITEMS', data});
      });
  }
}

export function setMuseum(id) {
  return {type: 'SET_MUSEUM', id}
}


export function setRoom(id) {
  return {type: 'SET_ROOM', id}
}

export function getMuseumImg(img) {
  return MUSEUMS_IMAGES + img;
}

export function getRoomImg(img) {
  return ROOMS_IMAGES + img;
}

export function getItemImg(img) {
  return ITEMS_IMAGES + img;
}
