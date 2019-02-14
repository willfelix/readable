import * as api from '../utils/api'

import { getPosts } from '../actions/posts'
import { getCategories } from '../actions/categories'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'willfelix'

export function handleInitialData () {
	return (dispatch) => {
		dispatch(showLoading())

		return api.init().then(({ categories, posts, comments }) => {
			dispatch(getCategories(categories))
			dispatch(getPosts(posts))
			dispatch(setAuthedUser(AUTHED_ID))

			dispatch(hideLoading())
		})
	}
}