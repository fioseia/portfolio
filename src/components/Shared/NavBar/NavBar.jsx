import React from 'react';
import Logo from '../Logo/Logo';
import NavLinks from '../NavLinks/NavLinks';
// import Menu from '../Menu/Menu';
import './NavBarStyle.scss';

const NavBar = () => {
	return (
		<nav className='navbar'>
			<Logo />
			<NavLinks />
			{/* <Menu/> */}
		</nav>
	);
};

export default NavBar;
