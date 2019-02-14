import React, { Component } from "react";
import { connect } from 'react-redux';
import Category from './Category';

class Categories extends Component {
	
	componentDidMount() {}

	render() {

		const { categories } = this.props;

		return (
			<div className='categories'>
				<h3>Categories</h3>
				<ul>
					{ 
						!categories ? null :
						categories.map(c => (
							<Category key={c.name} category={c} />
						))
					}
				</ul>
			</div>
		);
	}
}

export default connect(({ categories }) => ({ categories }))(Categories)