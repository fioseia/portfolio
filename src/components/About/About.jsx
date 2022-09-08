import React, { useEffect, useRef } from 'react';
import { pagesData } from '../../utils/pages-data';
import useLocoScroll from '../../hooks/useLocoScroll';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from '../../utils/splitText';
import { useSelector } from 'react-redux';
import aboutPic from '../../assets/aboutPic.png';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs } from 'react-icons/fa';
import {
	SiBootstrap,
	SiFramer,
	SiGreensock,
	SiRedux,
	SiExpress,
	SiPostgresql,
	SiFirebase,
	SiJira,
	SiSlack,
	SiGit,
	SiGithub,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import { DiScrum } from 'react-icons/di';
import { colorLinks } from '../../utils/colorLink';
import FiorenzaSeiaCVEspanol from '../../assets/FiorenzaSeia-CVEspanol.pdf'
import FiorenzaSeiaCVEnglish from '../../assets/FiorenzaSeia-resume-FullstackDeveloper.pdf'

import './AboutStyles.scss';

const About = () => {
	const { x, y, height, width } = useSelector((state) => state.currentRoute);
	const ref = useRef();
	const imgRef = useRef(null);
	const descriptionRef = useRef(null);
	const screen = useSelector((state) => state.screen);
	const color = pagesData.find((d) => d.slug === 'about').color;

	gsap.registerPlugin(ScrollTrigger);
	useLocoScroll('#about-container');

	// ANIMATIONS //
	let tl = gsap.timeline();
	tl.add('start');

	useEffect(() => {
		colorLinks('about');
		const split = new SplitText('#about-subtitle', {
			type: 'lines',
			linesClass: 'lineChildren',
		});

		const splitParent = new SplitText('#about-subtitle', {
			type: 'lines',
			linesClass: 'lineParent',
		});

		// INITIAL TITLE ANIMATION //
		if (screen === 'desktop') {
			tl.fromTo(
				'.about-title',
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
					top: screen === 'desktop' ? '30vh' : '12vh',
					opacity: 0.5,
					duration: 1,
					scale: screen === 'desktop' ? 5 : 4,
					color: '#f1f1f1',
				},
				'start'
			);
		}
		tl.to('.about-container', {
			backgroundColor: color,
			ease: 'power2',
			duration: 1,
		});

		setTimeout(() => {
			gsap.fromTo(
				'.about-title',
				{ lazy: false },
				{
					translateX: '100vw',
					ease: 'none',
					opacity: 0,
					scrollTrigger: {
						scrub: true,
						start: 'top top',
						trigger: '#about-title',
						scroller: '#about-container',
						end: '+=400%',
					},
				}
			);
		}, 1000);
		// TITLE SCROLL ANIMATION //

		tl.to('.about-title-container', {
			opacity: 1,
		});

		//FIRST PARAGRAPH ANIMATION //
		tl.to(split.lines, {
			delay: -1,
			duration: 1,
			y: 0,
			opacity: 1,
			stagger: 0.1,
			ease: 'power2',
		});

		// TECH INFINITE LOOP //
		let totalWidth = screen === 'desktop' ? 25 * 17 : 40 * 17;
		let dirFromRight = '-=' + totalWidth;
		let mod = gsap.utils.wrap(0, totalWidth);
		let techs = document.querySelectorAll('.tech-item');

		gsap.set(techs, {
			x: (i) => (screen === 'desktop' ? i * 25 : i * 40),
		});
		gsap.to(techs, {
			x: dirFromRight,
			modifiers: {
				x: (x) => mod(parseFloat(x)) + 'vw',
			},
			duration: 20,
			ease: 'none',
			repeat: -1,
		});

		ScrollTrigger.update();
		return () => (tl = null);
	}, [x, y, screen]);

	return (
		<>
			<div
				data-scroll-container
				ref={ref}
				className='about-container'
				id='about-container'
			>
				<h1
					className='about-title'
					id='about-title'
					style={{ color, height, width }}
				>
					about
				</h1>
				<div
					className='about-title-container'
					data-scroll-section
					id='about-title-container'
				>
					<h2 className='about-subtitle' id='about-subtitle'>
						I'm Fiorenza. I'm 28 years old and I'm a Full-Stack developer from
						Argentina.
					</h2>
				</div>
				<div data-scroll-section className='about-second-section'>
					<img
						src={aboutPic}
						alt=''
						className='about-image'
						data-scroll
						ref={imgRef}
					/>
					<h3 data-scroll className='about-second-title' data-scroll-speed='2'>
						I'm focused on developing <span>creative</span> and innovative{' '}
						<span>user experiences</span> paying special attention to{' '}
						<span>details</span>.
					</h3>
				</div>
				<div
					ref={descriptionRef}
					data-scroll-section
					className='about-third-section'
				>
					{/* <h3>Two importants aspects that make me who I am today:</h3> */}
					<p>
						After graduating as a doctor and dedicating myself to pediatrics for
						4 years, I launched to study programming out of simple curiosity.
						When writing my first algorithm in Javascript I was completely
						hooked by this world of technologies that I long to learn. My
						background has allowed me to work in different work enviroments and
						cultures, which brought with it the development of{' '}
						<span>empathy, communication and responsibility</span>. After some
						thinking I decided to leave my comfort zone convinced that my
						vocation for <span>finding solutions</span> to people's problems, paying special
						attention to providing a <span>good experience</span> in the meantime, are very helpful in this field. 
            I	look forward to facing challenges that drive me to develop both
						professionally and personally. <span>My curiosity a year later is even
						greater.</span>
					</p>
				</div>
				<div data-scroll-section className='about-fourth-section'>
					<p>my tech skills</p>
					<div className='about-tech'>
						<div className='about-tech-wrapper'>
							<div className='tech-item'>
								<FaHtml5 /> HTML5
							</div>
							<div className='tech-item'>
								<FaCss3Alt /> CSS3
							</div>
							<div
								className='tech-item'
								style={{ fontSize: screen === 'desktop' ? '2.3vw' : '1rem' }}
							>
								<SiBootstrap /> Bootstrap
							</div>
							<div
								className='tech-item'
								style={{ fontSize: screen === 'desktop' ? '2.1vw' : '0.8rem' }}
							>
								<SiFramer /> Framer Motion
							</div>
							<div className='tech-item'>
								<SiGreensock /> GSAP
							</div>
							<div className='tech-item'>
								<FaReact /> ReactJS
							</div>
							<div className='tech-item'>
								<SiRedux /> Redux
							</div>
							<div
								className='tech-item'
								style={{ fontSize: screen === 'desktop' ? '2.3vw' : '1rem' }}
							>
								<TbBrandReactNative /> React Native
							</div>
							<div className='tech-item'>
								<SiExpress /> Express
							</div>
							<div className='tech-item'>
								<FaNodeJs /> NodeJs
							</div>
							<div
								className='tech-item'
								style={{ fontSize: screen === 'desktop' ? '2.3vw' : '1rem' }}
							>
								<SiPostgresql /> PostgresSQL
							</div>
							<div className='tech-item'>
								<SiFirebase /> Firebase
							</div>
							<div className='tech-item'>
								<SiJira /> Jira
							</div>
							<div className='tech-item'>
								<SiSlack /> Slack
							</div>
							<div className='tech-item'>
								<DiScrum /> Scrum
							</div>
							<div className='tech-item'>
								<SiGit /> Git
							</div>
							<div className='tech-item'>
								<SiGithub /> GitHub
							</div>
						</div>
					</div>
          <div className='about-button-wrapper'>
            <a href={FiorenzaSeiaCVEnglish} download>English Resume</a>
            <a href={FiorenzaSeiaCVEspanol} download>CV Español</a>
          </div>
				</div>
			</div>
		</>
	);
};

export default About;
