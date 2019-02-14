import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { MdRemoveRedEye } from "react-icons/md";
import { handleCreatePost, handleUpdatePost } from '../actions/posts'

class PostFormPage extends Component {
	state = {
		title: '',
		body: ''
	}

	componentDidMount() {
		this.updateState();
	}

	componentWillReceiveProps (props) {
		this.updateState(props);
  	}

	render() {
		const { id, category } = this.props;
		const headTitle = id ? `Update post #${id}` : "Create post";
		let { title, body } = this.state;

		return (
			<div>
				<h3 className='center'>{ headTitle }</h3>
				<div>
					<hr />
					<small>{category}</small>
					<hr />

					{
						!id ? null :
						<Link to={`/${category}/${id}`}>
							<button className="btn-show"> <MdRemoveRedEye /> </button>
						</Link>
					}
				</div>
				<form className='new-post' onSubmit={this.handleSubmit}>
					<input type="text" value={title}
						placeholder="What's happening?"
						onChange={ (e) => this.setState({ title: e.target.value }) }
						className='textfield'
						maxLength={280} />

					<textarea
						placeholder="Tell us more about this..."
						value={body}
						onChange={ (e) => this.setState({ body: e.target.value }) }
						className='textarea' />

					<button className='btn' type='submit' disabled={title === '' || body === ''}>
						Submit
					</button>
				</form>
			</div>
		)
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { title, body } = this.state
		const { dispatch, id, category } = this.props

		const action = id ? handleUpdatePost(id, title, body) : handleCreatePost(title, body, category);
		dispatch(action);

		this.setState(() => ({ title: '', body: '' }))
		this.props.history.push(`/`);
	}

	updateState(props) {
		const { post } = props || this.props;
		if (post) {
			this.setState({
				title: post.title,
				body: post.body,
			})
		}
	}
	
}

const mapStateToProps = ({ posts }, props) => {
	const { post, category } = props.match.params

	return {
		id: post,
		post: posts.find(p => p.id === post),
		category
	}
}

export default connect(mapStateToProps)(PostFormPage);