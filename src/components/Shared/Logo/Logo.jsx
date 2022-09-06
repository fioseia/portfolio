import { Link } from 'react-router-dom';
import { Stretch } from './LogoAnimations';
import './LogoStyle.scss';
const Logo = () => {
	return (
		<Link to='/' className='logo'>
			<span
				className='logo-f'
			>
				F
			</span>
			<span className='logo-s'>S</span>
		</Link>
	);
};

export default Logo;
