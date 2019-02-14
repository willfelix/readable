import React, { Component } from "react";
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { handleGetCommentsByPostId, handleCreateComment } from '../actions/comments';

import Comment from './Comment'

class Comments extends Component {

	state = { text: '' }

	constructor(props) {
		super(props)

		const post_id = props.match.params.post;
		props.dispatch( handleGetCommentsByPostId(post_id) )
	}

	render() {
		const { comments } = this.props;

		return (
			<div className='comments'>
				<h4>Comments</h4>
				<hr />

				<div>
					<form className='new-post' onSubmit={this.handleSubmit}>
						<textarea className='textarea' value={this.state.text}
							onChange={ (e) => this.setState({ text: e.target.value }) }
							placeholder="Tell us more about this..." />

						<button className='btn' disabled={this.state.text === ''}
								onClick={this.onCreate.bind(this)}>Submit</button>
					</form>

					<ul>
						{ comments.map(c => <Comment key={c.id} id={c.id} /> ) }
					</ul>
				</div>
			</div>
		);
	}

	onCreate(e) {
		e.preventDefault();

		const { post, posts, dispatch } = this.props
		dispatch( handleCreateComment(post.id, this.state.text, posts) );

		this.setState({ text: "" })
		window.location.reload();
	}
}

const mapStateToProps = ({ posts, comments }, props) => ({ 
	posts,
	post: posts.find(p => p.id === props.match.params.post), 
	comments: comments.filter(c => c.parentId === props.match.params.post)
})

export default withRouter(connect(mapStateToProps)(Comments));