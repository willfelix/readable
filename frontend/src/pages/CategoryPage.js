import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageNotFound from './PageNotFound'

import Posts from '../components/Posts'
import Categories from '../components/Categories'

class CategoryPage extends Component {
	render() {
		const { category } = this.props

		if (!category) {
			return <PageNotFound />
		}

		return (
			<div className="grid-container">
				<Categories />
				<Posts category={category.name} />
			</div>
		)
	}
}

const mapStateToProps = ({ categories }, props) => ({
	category: categories.find(c => c.name === props.match.params.category)
})
export default connect(mapStateToProps)(CategoryPage);