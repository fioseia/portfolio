import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setScreen } from '../redux/actions/actions';

const getSize = () => {
	const isClient = typeof window === 'object';

	return {
		width: isClient ? window.innerWidth : 0,
		height: isClient ? window.innerHeight : 0,
	};
};

export const useWindowSizes = () => {
	const isClient = typeof window === 'object';
  const dispatch= useDispatch()

	const [windowSize, setWindowSize] = useState(getSize);

	useEffect(() => {
		if (!isClient) return undefined;
		function handleResize() {
			setWindowSize(getSize());
      windowSize.width < 600
			? dispatch(setScreen('mobile'))
			: dispatch(setScreen('desktop'));
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isClient]);

	return windowSize;
};
