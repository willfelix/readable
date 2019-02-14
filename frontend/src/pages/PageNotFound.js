import React, { Component } from "react";
import { Link } from 'react-router-dom'

export default class PageNotFound extends Component {

	render() {
		return (
			<div >

				<h2>404</h2>
				<hr />
				<Link to={'/'}>
					go to Home
				</Link>

			</div>
		);
	}
}