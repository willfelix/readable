import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import { handleVoteComment, handleDeleteComment } from '../actions/comments'

import { MdEdit, MdDeleteForever, MdThumbDown, MdThumbUp } from "react-icons/md";

class Comment extends Component {

	render() {
		const { category, comment } = this.props;

		return (
			<li className="comment">
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ padding: '5px 10px 0', fontWeight: 500 }}>
						by @{comment.author}
					</div>

					<div style={{ padding: '5px 10px 0' }}>
						<button className='vote' onClick={() => this.onVote('upVote', comment.id)}>
							<MdThumbUp />
						</button>
						<small>votes: {comment.voteScore}</small>
						<button className='vote' onClick={() => this.onVote('downVote', comment.id)}>
							<MdThumbDown />
						</button>
					</div>
				</div>

				<p> { comment.body } </p>

				<div className="post-actions">
					<Link to={`/${category}/${comment.parentId}/${comment.id}/edit`}>
						<button className='btn-edit'><MdEdit /></button>
					</Link>
					<button className='btn-delete' onClick={() => this.onDelete(comment.id)}>
						<MdDeleteForever />
					</button>
				</div>
			</li>
		);
	}

	onVote(vote, id) {

		this.props.dispatch( handleVoteComment(vote, id) );

	}

	onDelete(id) {
		if (window.confirm("Are you sure?")) {

			this.props.dispatch( handleDeleteComment(id) );
			window.location.reload()

		}
	}

}

const mapStateToProps = ({ comments }, props) => {
	const comment = comments.find(c => c.id === props.id);
	return { id: props.id, comment, category: props.match.params.category };
};

export default withRouter( connect(mapStateToProps)(Comment) );