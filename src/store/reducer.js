import Immutable from 'seamless-immutable';
import logreg from '../model/logreg.json';

const initialState = Immutable({
  loading: false,

  model: null,
  logreg: logreg,
  prediction_item_id: null,

  museums: [],
  floors: [],
  rooms: [],

  activeMuseum: {
    rooms: []
  },
  activeRoom: {
    items: []
  },
  activeItem: {}
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {

    case 'SET_LOGREG':
      return state.merge({logreg: action.data})

    case 'SET_MODEL':
      return state.merge({model: action.data})

    case 'SET_PREDICTION_ITEM_ID':
      return state.merge({prediction_item_id: action.data})

    case 'SET_MUSEUMS':
      return state.merge({museums: action.data})

    case 'SET_ROOMS':
      return state.merge({rooms: action.data})

    case 'SET_ITEMS':
      return state.merge({items: action.data})

    case 'SET_MUSEUM':
      return state.merge({
        activeMuseum: Object.assign({}, state.museums[action.id])
      });

    case 'SET_ROOM':
      return state.merge({
        activeRoom: Object.assign({}, state.rooms[action.id]),
    });

    case 'SET_ITEM':
      return state.merge({
        activeItem: Object.assign({}, state.items[action.id]),
    });

    case 'SET_LOADING':
      return state.merge({
        loading: action.loading
      })

    default:
      return state;
  }
}
