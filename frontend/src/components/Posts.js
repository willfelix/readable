import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { MdAddCircleOutline } from "react-icons/md";

import { sortPosts } from '../actions/posts'
import Post from './Post';

class Posts extends Component {
	
	componentDidMount() {}

	render() {
		return (
			<div className='posts'>

				<div className="sort-posts">
					<strong>Sort by:</strong>
					<span>
						<button onClick={() => this.sortBy('timestamp')}>Date</button>
						<button onClick={() => this.sortBy('voteScore')}>Votes</button>
						<button onClick={() => this.sortBy('commentCount')}>Comments</button>
					</span>
					<hr />
				</div>
				
				{ this.props.category ?
					<div>
						<h3>{this.props.category}</h3>
						<Link to={`/${this.props.category}/post/new`}>
							<button className='add'>
								<MdAddCircleOutline />
								<small>new post</small>
							</button>
						</Link>
					</div>
					: 
					<h3>All Posts</h3>
				}

				<ul>
					{ 
						this.props.posts.map(post => (
							<Post key={post.id} id={post.id} />
						))
					}
				</ul>
			</div>
		);
	}

	sortBy(prop) {
		this.props.dispatch( sortPosts(prop) );
	}
}

export default connect(({ posts }, { category }) => ({
	category,
	posts: category 
			? posts.filter(p => p.category === category) 
			: posts
}))(Posts);