import * as api from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const GET_POSTS = 'GET_POSTS'
export const SORT_POST = 'SORT_POST'
export const VOTE_POST = 'VOTE_POST'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'

const votePost = (vote, id) => ({
	type: VOTE_POST,
	id,
	vote
});

const deletePost = (id) => ({
	type: DELETE_POST,
	id
});

const updatePost = (post) => ({
	type: UPDATE_POST,
	post
});

const createPost = (post) => ({
	type: CREATE_POST,
	post
});

export const sortPosts = (sortBy) => ({
	type: SORT_POST,
	sortBy
});

export const getPosts = (posts = [], sortBy = 'timestamp') => ({
	type: GET_POSTS,
	posts,
	sortBy
});

export function handleVotePost (vote, id) {
	return (dispatch) => {
		dispatch( votePost(vote, id) );
		return api.votePost(vote, id);
	}
}

export function handleDeletePost (id) {
	return (dispatch) => {
		dispatch( deletePost(id) );
		return api.deletePost(id);
	}
}

export function handleCreatePost (title, body, category) {
	return (dispatch, getState) => {
		const { authedUser } = getState()
		const timestamp = Date.now();

		dispatch(showLoading())

		return api.createPost({
			id: timestamp.toString(),
			timestamp,
			title,
			body,
			category,
			author: authedUser
		})
		.then(post => dispatch( createPost(post) ))
		.then(() => dispatch( hideLoading() ))
	}
}

export function handleUpdatePost (id, title, body) {
	return (dispatch) => {

		dispatch( showLoading() )

		return api.updatePost({
			id,
			title,
			body
		})
		.then(post => dispatch( updatePost(post) ))
		.then(() => dispatch( hideLoading() ))
	}
}