import React, { useEffect, useState, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import { getLetters, setScreen } from './redux/actions/actions';
import { pagesData } from './utils/pages-data';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/Shared/NavBar/NavBar';
import { AnimatePresence } from 'framer-motion';
import { useWindowSizes } from './hooks/useWindowSizes';

const Header = React.lazy(() => import('./components/Landing/Header/Header'));
const Projects = React.lazy(() => import('./components/Projects/Projects'));
const Challenges = React.lazy(() => import('./components/Challenges/Challenges'));
const About = React.lazy(() => import('./components/About/About'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));


function App() {
	const location = useLocation();
	const dispatch = useDispatch();
  const windowSizes = useWindowSizes();

	useEffect(() => {
		dispatch(getLetters(pagesData));
    windowSizes.width < 600
			? dispatch(setScreen('mobile'))
			: dispatch(setScreen('desktop'));
	}, [dispatch,windowSizes]);


	return (
		<AnimatePresence exitBeforeEnter>
			<NavBar />
			<Routes location={location} key={location.pathname}>
				
					<Route exact path='/' element={<Header />} />
					<Route path='/projects' element={<Projects />} />
					<Route path='/challenges' element={<Challenges />} />
					<Route path='/about' element={<About />} />
					<Route path='/contact' element={<Contact />} />
		
			</Routes>
		</AnimatePresence>
	);
}

export default App;
