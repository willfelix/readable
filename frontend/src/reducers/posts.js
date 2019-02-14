import { GET_POSTS, SORT_POST, VOTE_POST, DELETE_POST, CREATE_POST, UPDATE_POST } from '../actions/posts'

const sort = (sortBy = 'timestamp', arr = []) => ( arr.sort((p, b) => p[sortBy] - b[sortBy]));
const clone = obj => JSON.parse(JSON.stringify(obj));

export default function posts (state = [], action) {
	switch(action.type) {

		case GET_POSTS :
			return sort(action.sortBy, action.posts)

		case DELETE_POST :
			return state.filter(s => s.id !== action.id)

		case CREATE_POST :
			return sort(action.sortBy, state.concat(action.post))

		case UPDATE_POST :
			return sort(action.sortBy, state.filter(p => p.id !== action.post.id).concat(action.post))

		case SORT_POST :
			return [ ...sort(action.sortBy, state) ]

		case VOTE_POST :
			let arrState = sort('timestamp', clone(state));
			arrState.forEach(p => {
				if (p.id === action.id) {
					p.voteScore += action.vote === 'upVote' ? 1 : -1;
				}
			});

			return [ ...arrState ];

		default :
			return state
	}
}

