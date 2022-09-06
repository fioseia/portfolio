import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentRoute } from '../../../redux/actions/actions';
import { pagesData } from '../../../utils/pages-data';
import './NavLinksStyles.scss';

const NavLinks = () => {
	const routes = useSelector((state) => state.routes);
	const dispatch = useDispatch();

	const handleClick = (route) => {
		dispatch(setCurrentRoute(route));
	};

	return (
		<div className='links-container'>
			{routes.map(
				(r) =>
					r.navigate === false && (
						<Link
							onClick={() => handleClick(r)}
							to={`/${r.title}`}
							key={`nav-link-${r.title}`}
							className={`links-item link-${r.title}`}
							style={{
								color: pagesData.find((d) => d.slug === r.title).color,
							}}
						>
							<span>{r.title}</span>
						</Link>
					)
			)}
		</div>
	);
};

export default NavLinks;
