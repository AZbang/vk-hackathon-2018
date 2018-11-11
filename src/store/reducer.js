import Immutable from 'seamless-immutable';

const initialState = Immutable({
  loading: false,

  museums: [],
  floors: [],
  rooms: [],
  achiements: [],

  activeMuseum: {
    rooms: []
  },
  activeRoom: {
    items: []
  },
  gameItemsIds: [],
  currentItemId: null
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {

    case 'SET_LOGREG':
      return state.merge({logreg: action.data})

    case 'SET_MODEL':
      return state.merge({model: action.data})

    case 'SET_PREDICTION_ITEM_ID':
      return state.merge({predictionItemId: action.id})

    case 'SET_MUSEUMS':
      return state.merge({museums: action.data})

    case 'SET_ROOMS':
      return state.merge({rooms: action.data})

    case 'SET_ITEMS':
      return state.merge({items: action.data})

    case 'SET_ACHIEMENTS':
      return state.merge({achiements: action.data});

    case 'SET_MUSEUM':
      return state.merge({
        activeMuseum: Object.assign({}, state.museums[action.id])
      });

    case 'SET_ROOM':
      return state.merge({
        activeRoom: Object.assign({}, state.rooms[action.id]),
        gameItemsIds: [].concat(state.rooms[action.id].items).sort(() => Math.random() - .5),
        currentItemId: 0
      });

    case 'NEXT_GAME_ITEM_ID':
      return state.merge({
        currentItemId: state.currentItemId+1
      });

    case 'SET_LOADING':
      return state.merge({
        loading: action.loading
      })

    default:
      return state;
  }
}
