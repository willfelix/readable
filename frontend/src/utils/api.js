/**
*	Init
*/
const request = (path, method = 'GET', body) => {
	const base = process.env.REACT_APP_BACKEND ||  'http://localhost:3001';
	
	return fetch(`${base}${path}`, { 
		method,
		body: JSON.stringify(body),
		headers: { 'Authorization': 'w1', 'Content-Type': 'application/json' }
	}).then(res => res.json())
}

export const init = () => {
	const requests = [
		request('/categories'),
		request('/posts')
	];

	return Promise.all(requests).then(([categories, posts]) => ({
		categories: categories.categories, 
		posts: posts
	}));
}


/**
*	Posts
*/
export const getPost = (id) => {
	return request(`/posts/${id}`).then(data => data);
}

export const votePost = (vote, id) => {
	return request(`/posts/${id}`, 'POST', {
		option: vote
	}).then(data => data);
}

export const createPost = (post) => {
	return request('/posts', 'POST', {
		...post
	}).then(data => data);
}

export const updatePost = (post) => {
	return request(`/posts/${post.id}`, 'PUT', {
		...post
	});
}

export const deletePost = (id) => {
	return request(`/posts/${id}`, 'DELETE');
}


/**
*	Comments
*/
export const getCommentsByPostId = (id) => {
	return request(`/posts/${id}/comments`).then(data => data);
}

export const createComment = (comment) => {
	return request('/comments', 'POST', {
		...comment
	}).then(data => data);
}

export const deleteComment = (id) => {
	return request(`/comments/${id}`, 'DELETE');
}

export const updateComment = (comment) => {
	return request(`/comments/${comment.id}`, 'PUT', {
		...comment
	});
}

export const voteComment = (vote, id) => {
	return request(`/comments/${id}`, 'POST', {
		option: vote
	}).then(data => data);
}
