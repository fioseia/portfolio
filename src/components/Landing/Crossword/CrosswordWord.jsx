import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSizes } from '../../../hooks/useWindowSizes';
import { motion } from 'framer-motion';
import { defaultTransition } from '../../../utils/transitions';
import { pagesData } from '../../../utils/pages-data';
import { setRouteRect } from '../../../redux/actions/actions';

const CrosswordWord = ({ title, index }) => {
	const dispatch = useDispatch();
	const pages = useSelector((state) => state.pages);
	const currentRoute = useSelector((state) => state.currentRoute.title);
	const windowSizes = useWindowSizes();
	const [letters, setLetters] = useState();
	const [coordinates, setCoordinates] = useState({
		x: 0,
		y: 0,
	});
	const ref = useRef();

	useEffect(() => {
		setLetters(pages.find((p) => p.title === title));
	}, [pages, title]);

	useEffect(() => {
		const xPos = () => {
			if (!ref.current) return 0;
			const rect = ref.current.getBoundingClientRect();
			return windowSizes.width / 2 - rect.left - rect.width / 2;
		};
		const yPos = () => {
			if (!ref.current) return 0;
			const rect = ref.current.getBoundingClientRect();
			return windowSizes.height / 2 - rect.top - rect.height / 2;
		};

		setCoordinates({
			x: xPos(),
			y: yPos(),
		});

    if(title ==='about' || title ==='projects'){

      dispatch(
        setRouteRect({
          x:
            windowSizes.width / 2 -
            ref.current.getBoundingClientRect().height / 2,
          y:
            windowSizes.height / 2 -
            ref.current.getBoundingClientRect().width / 2,
          // x: xPos(),
          // y: yPos(),
          title,
          height: ref.current.getBoundingClientRect().width,
          width: ref.current.getBoundingClientRect().height,
        })
      );
    }else{
      dispatch(
        setRouteRect({
          x:
            windowSizes.width / 2 -
            ref.current.getBoundingClientRect().width / 2,
          y:
            windowSizes.height / 2 -
            ref.current.getBoundingClientRect().height / 2,
          // x: xPos(),
          // y: yPos(),
          title,
          height: ref.current.getBoundingClientRect().height,
          width: ref.current.getBoundingClientRect().width,
        })
      );
    }
	}, [dispatch, title, windowSizes]);

	return (
		<motion.div
			ref={ref}
			className={title}
			exit={{
				x: coordinates.x,
				y: coordinates.y,
				rotate: title === 'projects' || title === 'about' ? -90 : 0,
				scale: 1.5,
				opacity: title === currentRoute ? 1 : 0,
				transition: {
					...defaultTransition,
					delay: 1,
					opacity: { delay: title === currentRoute ? 1 : 0 },
				},
			}}
		>
			{title.split('').map((letter, i) => (
				<motion.div
					className='square'
					key={`${title}-${letter}${i}`}
					exit={{
						boxShadow: 'none',
						rotate: title === 'projects' || title === 'about' ? 90 : 0,
						color: pagesData.find((d) => d.slug === title).color,
						transition: {
							...defaultTransition,
							boxShadow: { delay: 0 },
							delay: 1,
						},
					}}
				>
					{i === 0 && (
						<motion.span exit={{ opacity: 0 }}>{index + 1}</motion.span>
					)}
					<motion.p
						exit={{
							///fontWeight: 'bold',
							scale: 2.5,
							transition: { ...defaultTransition, delay: 1 },
						}}
						className={
							letters && letters[letter] === true
								? 'letter visible'
								: 'letter hidden'
						}
					>
						{letter}
					</motion.p>
				</motion.div>
			))}
		</motion.div>
	);
};

export default CrosswordWord;
