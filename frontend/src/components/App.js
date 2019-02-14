import React, { Component, Fragment } from "react";
import { Switch, Link, BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared.js';
import { MdHome } from "react-icons/md";
import LoadingBar from 'react-redux-loading'

import Home from '../pages/Home';
import PostPage from '../pages/PostPage';
import CategoryPage from '../pages/CategoryPage';
import PostFormPage from '../pages/PostFormPage';
import PageNotFound from '../pages/PageNotFound';
import CommentFormPage from '../pages/CommentFormPage';

class App extends Component {
	
	componentDidMount() {
		this.props.dispatch( handleInitialData() );
	}

	render() {
		return (
			<Router>
				<Fragment>
					<LoadingBar />

					{ this.props.loading ? null :
						<div className="App">
							<div className="App-header">
								<h2>Welcome to NinjaBlog</h2>
								<Link to={`/`}>
									<button className="home">
										<MdHome />
									</button>
								</Link>
							</div>

							<Switch>
								<Route path='/' exact component={ Home } />
								<Route path='/:category' exact component={ CategoryPage } />
								<Route path='/:category/:post' exact component={ PostPage } />
								<Route path='/:category/post/new' component={ PostFormPage } />
								<Route path='/:category/:post/edit' component={ PostFormPage } />
								<Route path='/:category/:post/:comment/edit' component={ CommentFormPage } />

								<Route component={PageNotFound} />
							</Switch>

						</div>
					}
				</Fragment>
			</Router>
		);
	}
}

export default connect(({ posts }) => ({
	loading: posts == null
}))(App);