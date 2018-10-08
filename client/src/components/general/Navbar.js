import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../cssfiles/navbar.css';

class Navbar extends Component {
	render(){
		return(
			<nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
				<Link className="navbar-brand ml-4" id='labourfi' to="/">Labourfi</Link>
				<div className='container'>
					<button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#mobile-nav'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='mobile-nav'>
						<ul className='navbar-nav mr-auto'>
							<li className='nav-item'>
								<Link className='nav-link' to='/'> Labour </Link>
							</li>
						</ul>	
					</div>
				</div>
			</nav>
		)
	}	
}

export default Navbar;