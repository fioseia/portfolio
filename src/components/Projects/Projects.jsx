import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { pagesData } from '../../utils/pages-data';
import useLocoScroll from '../../hooks/useLocoScroll';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { BiCodeCurly } from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';
import { projects } from '../../utils/projects-data';
import { colorLinks } from '../../utils/colorLink';


import './ProjectsStyles.scss';

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
					data-scroll
          autoPlay={screen === 'mobile' ? true: false}
				></video>
				<div className='project-info' data-scroll data-scroll-speed={6}>
					<span className='project-info-id'>{`#0${id}`}</span>
					<span className='project-info-title'>{title}</span>
					<p>{description}</p>
					<p id='project-info-tech'>{technologies}</p>
					<div className='project-links'>
						<a href={deploy} target='_blank' rel='noreferrer'>
							<div>
								<BiCodeCurly style={{ marginRight: '10px' }} />
								<p>Deploy</p>
							</div>
						</a>
						<a href={repo} target='_blank' rel='noreferrer'>
							<div>
								<BsGithub style={{ marginRight: '10px' }} />
								<p>Repository</p>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

const Projects = () => {
	const { x, y, height, width } = useSelector((state) => state.currentRoute);
	const ref = useRef();
	const screen = useSelector((state) => state.screen);
	const color = pagesData.find((d) => d.slug === 'projects').color;

	gsap.registerPlugin(ScrollTrigger);
	useLocoScroll('#projects-container');

	// ANIMATIONS //
	let tl = gsap.timeline();
	tl.add('start');

	useEffect(() => {
		colorLinks('projects');
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
				scale: 5,
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
		<div ref={ref} className='projects-container' id='projects-container'>
			<h1
				className='projects-title'
				id='projects-title'
				style={{ color, height, width }}
			>
				projects
			</h1>
			<div
				data-scroll-container
				className='projects-sections-container'
				id='projects-section'
			>
				{projects.map((project) => (
					<Project key={`${project.id}-${project.title}`} {...project} />
				))}
			</div>
		</div>
	);
};

export default Projects;
