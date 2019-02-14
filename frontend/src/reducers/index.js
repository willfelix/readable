import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'

import posts from './posts'
import categories from './categories'
import comments from './comments'
import authedUser from './authedUser'

export default combineReducers({
  categories,
  comments,
  authedUser,
  posts,
  loadingBar: loadingBarReducer
})