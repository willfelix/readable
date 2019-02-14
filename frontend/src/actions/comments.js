import * as api from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

import { getPosts } from './posts'

export const GET_COMMENTS = 'GET_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

const deleteComment = (id) => ({
	type: DELETE_COMMENT,
	id
});

const createComment = (comment) => ({
	type: CREATE_COMMENT,
	comment
});

const voteComment = (vote, id) => ({
	type: VOTE_COMMENT,
	id,
	vote
});

const updateComment = (comment) => ({
	type: UPDATE_COMMENT,
	comment
});

const getComments = (id, comments) => ({
	type: GET_COMMENTS,
	id,
	comments
});

export function handleDeleteComment (id) {
	return (dispatch) => {
		dispatch( deleteComment(id) );
		return api.deleteComment(id);
	}
}

export function handleGetCommentsByPostId (id) {
	return (dispatch) => {
		return api.getCommentsByPostId(id)
				.then(comments => dispatch( getComments(id, comments) ))
	}
}

export function handleCreateComment (parentId, body, posts) {
	return (dispatch, getState) => {
		const { authedUser } = getState()
		const timestamp = Date.now();

		dispatch(showLoading())

		return api.createComment({
			id: timestamp.toString(),
			timestamp,
			parentId,
			body,
			author: authedUser
		})
		.then(comment => {
			dispatch( createComment(comment) )
			dispatch( getPosts(posts) );
		})
		.then(() => dispatch( hideLoading() ))
	}
}

export function handleVoteComment (vote, id) {
	return (dispatch) => {
		dispatch( voteComment(vote, id) );
		return api.voteComment(vote, id);
	}
}

export function handleUpdateComment (id, body) {
	return (dispatch) => {

		dispatch( showLoading() )

		return api.updateComment({
			id,
			body,
			timestamp: Date.now()
		})
		.then(comment => dispatch( updateComment(comment) ))
		.then(() => dispatch( hideLoading() ))
	}
}