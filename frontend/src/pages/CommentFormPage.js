import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { handleGetCommentsByPostId, handleUpdateComment } from '../actions/comments'

import PageNotFound from './PageNotFound';

class CommentFormPage extends Component {
	
	state = { body: '' }

	constructor(props) {
		super(props)

		const post = props.match.params.post;
		props.dispatch( handleGetCommentsByPostId(post) )
	}

	componentDidMount() {
		this.updateState();
	}

	componentWillReceiveProps (props) {
		this.updateState(props);
  	}

	render() {
		const { comment, category, post } = this.props;
		let { body } = this.state;

		if (!comment || !post) {
			return <PageNotFound />
		}

		return (
			<div>
				<h3 className='center'>Updating comment #{comment.id}</h3>
				<div>
					<hr />
						<Link to={`/${category}/${post.id}`}>
							<p>{post.title}</p>
						</Link>
						<Link to={`/${category}`}>
							<small>{category}</small>
						</Link>
					<hr />
				</div>
				<form className='new-post' onSubmit={this.handleSubmit}>
					
					<textarea
						placeholder="Tell us more about this..."
						value={body}
						onChange={ (e) => this.setState({ body: e.target.value }) }
						className='textarea' />

					<button className='btn' type='submit' disabled={body === ''}>
						Submit
					</button>
				</form>
			</div>
		)
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { body } = this.state
		const { dispatch, id, category, post } = this.props

		dispatch( handleUpdateComment(id, body) );

		this.setState(() => ({ body: '' }))
		this.props.history.push(`/${category}/${post.id}`);
	}

	updateState(props) {
		const { comment } = props || this.props;
		if (comment) {
			this.setState({ body: comment.body, })
		}
	}
	
}

const mapStateToProps = ({ posts, comments }, props) => {
	const { comment, post, category } = props.match.params

	return {
		id: comment,
		post: posts.find(p => p.id === post),
		comment: comments.find(c => c.id === comment),
		category
	}
}

export default connect(mapStateToProps)(CommentFormPage);