const DB_PATH = 'https://raw.githubusercontent.com/AZbang/vk-hackathon-2018/gh-pages/';
const MUSEUMS_IMAGES = DB_PATH + '/museums/';
const ROOMS_IMAGES = DB_PATH + '/rooms/';
const ITEMS_IMAGES = DB_PATH + '/items/';

export function getMuseums() {
  return dispatch => {
    dispatch(setLoading(true));
    fetch(DB_PATH + '/museums.json')
      .then((response) => response.json())
      .then((data) => {
        dispatch({type: 'SET_MUSEUMS', data});
        dispatch(setLoading(false));
      });
  }
}


export function getRooms() {
  return dispatch => {
    dispatch(setLoading(true));
    fetch(DB_PATH + '/rooms.json')
      .then((response) => response.json())
      .then((data) => {
        dispatch({type: 'SET_ROOMS', data});
        dispatch(setLoading(false));
      });
  }
}


export function getItems() {
  return dispatch => {
    dispatch(setLoading(true));
    fetch(DB_PATH + '/items.json')
      .then((response) => response.json())
      .then((data) => {
        dispatch({type: 'SET_ITEMS', data});
        dispatch(setLoading(false));
      });
  }
}

export function getAchieves() {
  return dispatch => {
    dispatch(setLoading(true));
    fetch(DB_PATH + '/achivements.json')
      .then((response) => response.json())
      .then((data) => {
        dispatch({type: 'SET_ACHIEMENTS', data});
        dispatch(setLoading(false));
      });
  }
}

export function setLoading(loading) {
  return {type: 'SET_LOADING', loading}
}



export function setMuseum(id) {
  return {type: 'SET_MUSEUM', id}
}


export function setRoom(id) {
  return {type: 'SET_ROOM', id}
}

export function nextItemId() {
  return {type: 'NEXT_GAME_ITEM_ID'}
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
