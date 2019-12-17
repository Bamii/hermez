import { SET_DOWNLOAD_FOLDER } from '../actions'

const initialState = {
  downloadFolder: ''
}

function root(state = initialState, action) {
  switch(action.type) {
    case SET_DOWNLOAD_FOLDER:
      return Object.assign({}, state, {
        downloadFolder: action.folder
      })

    default:
      return state;
  }
}

export default root;
