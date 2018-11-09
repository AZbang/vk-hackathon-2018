import Immutable from 'seamless-immutable';
import * as types from './actionTypes';
import items from './items.json';

const initialState = Immutable({
  museums: [],
  floors: [],
  rooms: [],

  activeMuseum: [],
  activeRoom: [],
  activeItems: []
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {

    case 'SET_MUSEUMS':
      return state.merge({museums: action.data)

    case 'SET_FLOORS':
      return state.merge({museums: action.data)

    case 'SET_ROOMS':
      return state.merge({museums: action.data)

    case 'SET_MUSEUM':
      return state.merge({
        activeMuseum: Object.assing({}, state.data.museums[action.id])
      });

    case 'SET_ROOM':
      return state.merge({
        activeRoom: Object.assing({}, state.data.rooms[action.id]),
    });

    case 'SET_ITEMS':
      return state.merge({
        activeItems: Object.assing({}, state.data.rooms[action.id]),
      });

    default:
      return state;
  }
}
