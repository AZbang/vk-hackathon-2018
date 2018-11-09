import Immutable from 'seamless-immutable';

const initialState = Immutable({
  loading: false,

  museums: [],
  floors: [],
  rooms: [],

  activeMuseum: {
    rooms: []
  },
  activeRoom: {
    items: []
  }
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {

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


    default:
      return state;
  }
}
