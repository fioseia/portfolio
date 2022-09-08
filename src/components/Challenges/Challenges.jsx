import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { pagesData } from '../../utils/pages-data';
import useLocoScroll from '../../hooks/useLocoScroll';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { BiCodeCurly } from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';
import { challenges } from '../../utils/challenges-data';
import { colorLinks } from '../../utils/colorLink';

import './ChallengesStyles.scss';

const Project = ({
	id,
	title,
	media,
	description,
	technologies,
	deploy,
	repo,
}) => {
	const ref = useRef(null);
  const screen = useSelector((state) => state.screen);

  useEffect(() => {},[screen])

	return (
		<div className='project-container' data-scroll-section>
			<div className='project-wrapper'>
				<video
					ref={ref}
					onMouseEnter={() => ref.current.play()}
					onMouseLeave={() => ref.current.pause()}
					src={media}
					muted
          autoPlay={screen === 'mobile' ? true: false}
				></video>
				<div className='project-info' data-scroll data-scroll-speed={6}>
					<span className='project-info-id'>{`#0${id}`}</span>
					<span className='project-info-title'>{title}</span>
					<p>{description}</p>
					<p id='project-info-tech'>{technologies}</p>
					{/* <div className='project-links'>
						<a href={deploy}>
							<div>
								<BiCodeCurly
									style={{ color: '#f1f1f1', marginRight: '10px' }}
								/>
								<p>Deploy</p>
							</div>
						</a>
						<a href={repo}>
							<div>
								<BsGithub style={{ color: '#f1f1f1', marginRight: '10px' }} />
								<p>Repository</p>
							</div>
						</a>
					</div> */}
				</div>
			</div>
		</div>
	);
};

const Challenges = () => {
	const { x, y, height, width } = useSelector((state) => state.currentRoute);
	const ref = useRef();
	const screen = useSelector((state) => state.screen);
	const color = pagesData.find((d) => d.slug === 'challenges').color;

	gsap.registerPlugin(ScrollTrigger);
	useLocoScroll('#projects-container');

	// ANIMATIONS //
	let tl = gsap.timeline();
	tl.add('start');

	useEffect(() => {
		colorLinks('challenges');
		setTimeout(() => {
			gsap.fromTo(
				'.projects-title',
				{ lazy: false },
				{
					translateX: '100vw',
					ease: 'none',
					opacity: 0,
					scrollTrigger: {
						scrub: true,
						start: 'top top',
						trigger: '#projects-title',
						scroller: '#projects-container',
						end: '+=100%',
					},
				}
			);
		}, 2000);
		// INITIAL TITLE ANIMATION //
		tl.fromTo(
			'.projects-title',
			{
				stagger: 0.1,
				ease: 'power2',
				scale: 4,
				lazy: false,
				top: y,
				left: x,
			},
			{
				left: '5vw',
				top: screen === 'desktop' ? '30vh' : '110px',
				opacity: 0.2,
				duration: 1,
				scale: screen === 'desktop' ? 5 : 4,
				color: '#f1f1f1',
			},
			'start'
		);
		tl.to('.projects-container', {
			backgroundColor: color,
			ease: 'power2',
			duration: 1,
		});

		// TITLE SCROLL ANIMATION //

		tl.to('#projects-section', {
			opacity: 1,
		});

		ScrollTrigger.update();
		return () => (tl = null);
	}, [x, y,screen]);

	return (
		<>
			<div ref={ref} className='projects-container' id='projects-container'>
				<h1
					className='projects-title'
					id='projects-title'
					style={{ color, height, width }}
				>
					challenges
				</h1>
				<div
					data-scroll-container
					className='projects-sections-container'
					id='projects-section'
				>
					{challenges.map((project) => (
						<Project key={`${project.id}-${project.title}`} {...project} />
					))}
				</div>
			</div>
		</>
	);
};

export default Challenges;
