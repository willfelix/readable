import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { MdEdit, MdDeleteForever, MdModeComment, MdThumbDown, MdThumbUp } from "react-icons/md";

import { handleDeletePost, handleVotePost } from '../actions/posts';
import PageNotFound from '../pages/PageNotFound'

class PostFooter extends Component {

	render() {
		const { post } = this.props;

		if (!post) {
			return <PageNotFound />
		}

		return (
			<div>
				<div className="post-actions">
					<Link to={`/${post.category}/${post.id}/edit`}>
						<button className='btn-edit'><MdEdit /></button>
					</Link>
					<button className='btn-delete' onClick={() => this.deletePost(post.id)}>
						<MdDeleteForever />
					</button>
				</div>

				<div className="post-footer">
					<div>
						<button className='vote' onClick={() => this.handleVote('upVote', post.id)}>
							<MdThumbUp />
						</button>
						<small>votes: {post.voteScore}</small>
						<button className='vote' onClick={() => this.handleVote('downVote', post.id)}>
							<MdThumbDown />
						</button>
					</div>
					<small><MdModeComment /> {post.commentCount}</small>
				</div>
			</div>
		);
	}

	deletePost(id) {
		if (window.confirm("Are you sure?")) {

			this.props.dispatch( handleDeletePost(id) );
			this.props.history.push('/');

		}
	}

	handleVote(vote, id) {

		this.props.dispatch( handleVotePost(vote, id) );

	}
}


const mapStateToProps = ({ posts }, props) => {
	const id = props.id ? props.id : props.match.params.post
	const post = posts.find(p => p.id === id)
	return { post }
}
export default withRouter( connect(mapStateToProps)(PostFooter) );