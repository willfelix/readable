import React, { Component } from 'react'
import { connect } from 'react-redux'

import PostDetail from '../components/PostDetail'
import PageNotFound from './PageNotFound'

class PostPage extends Component {

	render() {
		const { post } = this.props

		if (!post) {
			return <PageNotFound />
		}

		return (
			<div className="grid-container">
				<PostDetail />
			</div>
		)
	}
}

const mapStateToProps = ({ posts }, props) => ({
	post: posts.find(p => p.id === props.match.params.post)
})
export default connect(mapStateToProps)(PostPage);