import * as tf from '@tensorflow/tfjs';

const DB_PATH = 'https://raw.githubusercontent.com/AZbang/vk-hackathon-2018/gh-pages/';
const MUSEUMS_IMAGES = DB_PATH + '/museums/';
const ROOMS_IMAGES = DB_PATH + '/rooms/';
const ITEMS_IMAGES = DB_PATH + '/items/';

export function getModel() {
  return dispatch => {
    dispatch(setLoading(true));
    tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json')
      .then((mobilenet) => {
        // Return a model that outputs an internal activation.
        const layer = mobilenet.getLayer('global_average_pooling2d_1');
        window.model = tf.model({inputs: mobilenet.inputs, outputs: layer.output});
        window.model.predict(tf.zeros([1, 224, 224, 3])).dispose();
        dispatch(setLoading(false));
      });
  }
}

export function predict(img) {
  return (dispatch, getState) => {
    tf.tidy(() => {
      const {logreg} = getState().data;


      // const offset = tf.scalar(127.5);
      // // Normalize the image from [0, 255] to [-1, 1].
      // const normalized = img.sub(offset).div(offset);
      //
      // // Reshape to a single-element batch so we can pass it to predict.
      // const batched = normalized.reshape([1, 224, 224, 3]);

      // Make a prediction through mobilenet.
      let vectors = window.model.predict(img);
      let map = vectors.dataSync();
      let arr = [];
      for(let i = 0; i < 256; i++) {
        arr.push(map[i]);
      }

      let pred = new Array(logreg.length).fill(0);

      for(let i = 0; i < logreg.length; i++) {
        for(let j = 0; j < logreg[0].length; j++) {
          pred[i] += arr[j]*logreg[i][j];
        }
      }
      let sumExp = 0;
      for(let i = 0; i < pred.length; i++) {
        sumExp += Math.exp(pred[i]);
      }
      for(let i = 0; i < pred.length; i++) {
        pred[i] = Math.exp(pred[i])/sumExp;
      }

      let max = pred[0];
      let maxi = 0;
      for(let i = 0; i < pred.length; i++) {
        if(pred[i] > max) {
          max = pred[i];
          maxi = i;
        }
      }
      document.getElementById('debugger').innerHTML = max;
      dispatch({
        type: 'SET_PREDICTION_ITEM_ID',
        id: max > .5 ? maxi : -1
      });
    });
  }
}

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



export function setLoading(loading) {
  return {type: 'SET_LOADING', loading}
}



export function setMuseum(id) {
  return {type: 'SET_MUSEUM', id}
}


export function setRoom(id) {
  return {type: 'SET_ROOM', id}
}

export function setItem(id) {
  return {type: 'SET_ITEM', id}
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
