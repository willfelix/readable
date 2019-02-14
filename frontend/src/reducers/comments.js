import { VOTE_COMMENT, UPDATE_COMMENT, GET_COMMENTS, DELETE_COMMENT, CREATE_COMMENT } from '../actions/comments'

const clone = obj => JSON.parse(JSON.stringify(obj));

export default function comments (state = [], action) {

	switch(action.type) {
		case GET_COMMENTS :
			return [ ...action.comments ]

		case DELETE_COMMENT :
			return [ ...state.filter(s => s.id !== action.id) ]

		case CREATE_COMMENT :
			return [ 
				...state, 
				action.comment
			];

		case VOTE_COMMENT :
			let arrState = clone(state)
			arrState.forEach(p => {
				if (p.id === action.id) {
					p.voteScore += action.vote === 'upVote' ? 1 : -1;
				}
			});

			return [ ...arrState ];

		case UPDATE_COMMENT :
			return state.filter(c => c.id !== action.comment.id).concat(action.comment)

		default :
			return state
	}

}