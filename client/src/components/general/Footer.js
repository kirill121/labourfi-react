import React from 'react';

export default () => {
	return (
		<footer id='footer' className='bg-dark text-white mt-5 p-1 text-center'>
			Copyright &copy; {new Date().getFullYear()} <span id='signature'>Labourfi</span>
		</footer>
	)
}