import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { defaultTransition } from '../../../utils/transitions';
import Crossword from '../Crossword/Crossword';
import {
	setCurrentRoute,
	setNavigateToFalse,
	setRouteRect,
} from '../../../redux/actions/actions';
import { HiArrowRight } from 'react-icons/hi';
import { mobileCoordinates } from '../../../utils/mobileCoordinates';
import { pagesData } from '../../../utils/pages-data';

import '../LandingStyles.scss';

const Header = () => {
	const routes = useSelector((state) => state.routes);
	const screen = useSelector((state) => state.screen);
	const [mobileRoute, setMobileRoute] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (routes.length > 0 && routes.length <= 4) {
			if (routes[routes.length - 1].navigate === true) {
				dispatch(setNavigateToFalse(routes[routes.length - 1]));
				dispatch(setCurrentRoute(routes[routes.length - 1]));
				navigate(`/${routes[routes.length - 1].title}`);
			}
		}
	}, [routes, navigate, dispatch]);

	const handleMobileExit = (e) => {
		const mobile = mobileCoordinates(e);
		setMobileRoute(e.target.id);
		dispatch(
			setRouteRect({
				x: mobile.finalX,
				y: mobile.finalY,
				title: e.target.id,
				height: mobile.elHeight,
				width: mobile.elWidth,
			})
		);
		navigate(`/${e.target.id}`);
	};

	return (
		<div className='header'>
			<motion.div
				className='header-section'
				style={{ width: '45%' }}
				exit={{
					opacity: 0,
				}}
			>
				<motion.h1
					className='header-title'
					initial={{
						opacity: 0,
						transform: 'translateY(10px)',
					}}
					animate={{
						opacity: 1,
						//scale: [1, 1.03,1],
						transform: 'translateY(-10px)',
						transition: { ...defaultTransition },
					}}
				>
					Hi! I'm <br />
					Fiorenza Seia*
				</motion.h1>
				<motion.p
					className='header-subtitle'
					initial={{
						opacity: 0,
						transform: 'translateY(10px)',
					}}
					animate={{
						opacity: 1,
						//scale: [1, 1.03,1],
						transform: 'translateY(-10px)',
						transition: { ...defaultTransition, delay: 1 },
					}}
				>
					A Full-Stack developer
				</motion.p>
				<motion.p
					className='header-description'
					initial={{
						opacity: 0,
						transform: 'translateY(10px)',
					}}
					animate={{
						opacity: 1,
						transform: 'translateY(-10px)',
						transition: { ...defaultTransition, delay: 2 },
					}}
				>
					*Actually I'm a website developed by her{' '}
				</motion.p>
				{screen && screen === 'desktop' && (
					<motion.p
						className='header-subtitle'
						initial={{
							opacity: 0,
							transform: 'translateY(10px)',
						}}
						animate={{
							opacity: 1,
							//scale: [1, 1.03,1],
							transform: 'translateY(-10px)',
							transition: { ...defaultTransition, delay: 3 },
						}}
					>
						Type your answers
						<motion.div
							style={{ marginLeft: '10px' }}
							animate={{
								x: [5, -5],
								transition: {
									duration: 0.4,
									yoyo: Infinity,
									ease: 'easeOut',
								},
							}}
						>
							<HiArrowRight />
						</motion.div>
					</motion.p>
				)}
			</motion.div>
			{screen && screen === 'desktop' ? (
				<motion.div
					className='header-section'
					style={{ width: '55%' }}
					initial={{
						opacity: 0,
					}}
					animate={{
						opacity: 1,

						transition: { ...defaultTransition, delay: 3 },
					}}
				>
					<Crossword />
				</motion.div>
			) : (
				<div className='header-section'>
					<motion.span
						className='header-mobile-links'
						id='projects'
						onClick={(e) => handleMobileExit(e)}
						exit={{
							top: '50vh',
              border: 'none',
							scale: 1.5,
							opacity: 'projects' === mobileRoute ? 1 : 0,
              color: pagesData.find((d) => d.slug === 'projects').color,
              y:'-100vh',
							transition: {
								...defaultTransition,
								delay: 1,
								opacity: { delay: 'projects' === mobileRoute ? 1 : 0 },
                y:{delay:2, duration:1}
							},
						}}
					>
						PROJECTS
					</motion.span>
					<motion.span
						className='header-mobile-links'
						id='challenges'
						onClick={(e) => handleMobileExit(e)}
						exit={{
							top: '50vh',
							scale: 1.5,
              border: 'none',
              color: pagesData.find((d) => d.slug === 'challenges').color,
							opacity: 'challenges' === mobileRoute ? 1 : 0,
              y:'-100vh',
							transition: {
								...defaultTransition,
								delay: 1,
								opacity: { delay: 'challenges' === mobileRoute ? 1 : 0 },
                y:{delay:2, duration:1}
							},
						}}
					>
						CHALLENGES
					</motion.span>
					<motion.span
						className='header-mobile-links'
						id='about'
						onClick={(e) => handleMobileExit(e)}
						exit={{
							top: '50vh',
							scale: 1.5,
              border: 'none',
							opacity: 'about' === mobileRoute ? 1 : 0,
              color: pagesData.find((d) => d.slug === 'about').color,
              y:'-100vh',
							transition: {
								...defaultTransition,
								delay: 1,
								opacity: { delay: 'about' === mobileRoute ? 1 : 0 },
                y:{delay:2, duration:1}
							},
						}}
					>
						ABOUT
					</motion.span>
					<motion.span
						className='header-mobile-links'
						id='contact'
						onClick={(e) => handleMobileExit(e)}
						exit={{
              scale: 1.5,
              border: 'none',
							opacity: 'contact' === mobileRoute ? 1 : 0,
              color: pagesData.find((d) => d.slug === 'contact').color,
							y:'-100vh',
							transition: {
								...defaultTransition,
								delay: 1,
								opacity: { delay: 'contact' === mobileRoute ? 1 : 0 },
                y:{delay:2, duration:1}
							},
						}}
					>
						CONTACT
					</motion.span>
				</div>
			)}
		</div>
	);
};

export default Header;
