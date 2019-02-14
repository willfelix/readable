import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import PostFooter from './PostFooter';

class Post extends Component {

	render() {
		const { post } = this.props;

		return (
			<li className='post'>
				<div className="post-header">
					<Link to={`/${post.category}/${post.id}`}>
						<h4>{post.title}</h4>
					</Link>
					<small>by @{post.author}</small>
				</div>

				<PostFooter id={post.id} />
			</li>
		);
	}
}

const mapStateToProps = ({ posts }, { id }) => {
	const post = posts.find(p => p.id === id);
	return { id, post };
};

export default connect(mapStateToProps)(Post);