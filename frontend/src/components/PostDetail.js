import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import PostFooter from './PostFooter'
import Comments from './Comments'

class PostDetail extends Component {

	render() {
		const { post } = this.props;

		return (
			<div style={{ width: '100%' }}>
				<div className='post'>
					<div className="post-header">
						<h4>{post.title}</h4>
						<small>by @{post.author}</small>
						<Link to={`/${post.category}`}>
							<small>{post.category}</small>
						</Link>
					</div>
					
					<div className="post-body">
						{post.body}
					</div>

					<PostFooter />
				</div>
				
				<Comments />

			</div>
		);
	}

}


const mapStateToProps = ({ posts }, props) => ({
	post: posts.find(p => p.id === props.match.params.post)
})
export default withRouter( connect(mapStateToProps)(PostDetail) );