import { SET_DOWNLOAD_FOLDER, SET_CLIENT } from '../actions'

const initialState = {
  downloadFolder: '',
  client: null
}

function root(state = initialState, action) {
  switch(action.type) {
    case SET_DOWNLOAD_FOLDER:
      return Object.assign({}, state, {
        downloadFolder: action.folder
      })

    case SET_CLIENT:
      return Object.assign({}, state, {
        client: action.client
      });

    default:
      return state;
  }
}

export default root;
