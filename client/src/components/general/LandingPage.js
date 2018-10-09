import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
	render(){
		return(
			<div className='landing'>
				<div className='dark-overlay landing-inner text-light'>
					<div className='container'>
						<div className='row'>						
							<div className='col-md-12 text-center'>
								<h1 id='labourSign' className='display-3'>Labourfi</h1>
								<hr />
								<Link to='/register' className='btn btn-lg btn-info mr2'>Sign up</Link>	
							</div>	
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default LandingPage;