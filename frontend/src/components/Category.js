import React, { Component } from "react";
import { Link } from 'react-router-dom'

export default class Category extends Component {
	
	componentDidMount() {}

	render() {
		const { category } = this.props;
		return (
			<Link to={`/${category.path}`}>
				<li className="category-item">
					{category.name}
				</li>
			</Link>
		);
	}
}