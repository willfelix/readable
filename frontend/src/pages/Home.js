import React, { Component } from "react";
import { connect } from 'react-redux'

import Posts from '../components/Posts';
import Categories from '../components/Categories';

class Home extends Component {
	
	componentDidMount() {}

	render() {
		return (
			<div className="grid-container">

				<Categories />
				<Posts />

			</div>
		);
	}
}

export default connect()(Home);