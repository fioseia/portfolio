import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { pagesData } from '../../utils/pages-data';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaLinkedin, FaGithub, FaCalendarAlt } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { colorLinks } from '../../utils/colorLink';

import './ContactStyles.scss';

const Contact = () => {
	const { x, y, height, width } = useSelector((state) => state.currentRoute);
  const screen = useSelector((state) => state.screen);
	const [inputs, setInputs] = useState({
		user_name: '',
		user_email: '',
		message: '',
	});
	const ref = useRef();
	const form = useRef();

	const color = pagesData.find((d) => d.slug === 'contact').color;

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				'service_n3o53ip',
				'template_35kidpa',
				form.current,
				'UrxFV_X95vU1StMR1'
			)
			.then(
				(result) => {
					toast('✉️ Message sent!');
					setInputs({
						user_name: '',
						user_email: '',
						message: '',
					});
				},
				(error) => {
					console.log(error.text);
				}
			);
	};

	// ANIMATIONS //
	let tl = gsap.timeline();
	tl.add('start');

	useEffect(() => {
    colorLinks('contact')
		// INITIAL TITLE ANIMATION //
		tl.fromTo(
			'.contact-title',
			{
				stagger: 0.1,
				ease: 'power2',
				scale: 4,
				lazy: false,
				top: y,
				left: x,
			},
			{
				left: screen === 'desktop' ? '17vh' : '0vh',
				top: screen === 'desktop' ? '30vh' : '12vh',
				opacity: 0.2,
				duration: 1,
				scale: 5,
				color: '#f1f1f1',
			},
			'start'
		);
		tl.to('.contact-container', {
			backgroundColor: color,
			ease: 'power2',
			duration: 1,
		});

		// TITLE SCROLL ANIMATION //

		tl.to('#contact-section', {
			opacity: 1,
		});

		ScrollTrigger.update();
		return () => (tl = null);
	}, [x, y]);

	const handleFocus = (e) => {
		let el = document.querySelector(`.label_${e.target.name}`);
		el.classList.add('focused');
	};

	const handleBlur = (e) => {
		let el = document.querySelector(`.label_${e.target.name}`);
		el.classList.remove('focused');
	};

	return (
		<>
			<div ref={ref} className='contact-container' id='contact-container'>
				<h1
					className='contact-title'
					id='contact-title'
					style={{ color, height, width }}
				>
					contact
				</h1>
				<div
					data-scroll-container
					className='contact-section'
					id='contact-section'
				>
					<div className='contact-form-section'>
						<form ref={form} onSubmit={sendEmail} autoComplete={'off'}>
							<label className='label_user_name'>Name</label>
							<input
								type='text'
								name='user_name'
								value={inputs.user_name}
								required
								autoComplete={'off'}
								onChange={(e) =>
									setInputs({ ...inputs, [e.target.name]: e.target.value })
								}
								onFocus={(e) => handleFocus(e)}
								onBlur={(e) => handleBlur(e)}
							/>
							<label className='label_user_email'>Email</label>
							<input
								type='email'
								name='user_email'
								value={inputs.user_email}
								required
								autoComplete='off'
								onChange={(e) =>
									setInputs({ ...inputs, [e.target.name]: e.target.value })
								}
								onFocus={(e) => handleFocus(e)}
								onBlur={(e) => handleBlur(e)}
							/>
							<label className='label_message'>Message</label>
							<textarea
								name='message'
								value={inputs.message}
								autoComplete='off'
								required
								onChange={(e) =>
									setInputs({ ...inputs, [e.target.name]: e.target.value })
								}
								onFocus={(e) => handleFocus(e)}
								onBlur={(e) => handleBlur(e)}
							/>
							<input type='submit' value='Send' id='form-button' />
						</form>
					</div>
					<div className='contact-form-section contact-links-wrapper'>
						<div>
							<a
								href='https://www.linkedin.com/in/fiorenza-seia-a79700217/'
								target='_blank'
								rel='noreferrer'
							>
								<span>
									<FaLinkedin />
								</span>
								<span>Linkedin</span>
								<span>
									<BsBoxArrowInUpRight />
								</span>
							</a>
						</div>
						<div>
							<a
								href='https://github.com/fioseia'
								target='_blank'
								rel='noreferrer'
							>
								<span>
									<FaGithub />
								</span>
								<span>Github</span>
								<span>
									<BsBoxArrowInUpRight />
								</span>
							</a>
						</div>
						<div>
							<a
								href='https://calendly.com/fiorenza-seia'
								target='_blank'
								rel='noreferrer'
							>
								<span>
									<FaCalendarAlt />
								</span>
								<span>Calendly</span>
								<span>
									<BsBoxArrowInUpRight />
								</span>
							</a>
						</div>
						<div>
							<a href='mailto:fiorenza.seia@gmail.com'>
								<span>
									<HiOutlineMail />
								</span>
								<span>Email</span>
								<span>
									<BsBoxArrowInUpRight />
								</span>
							</a>
						</div>
					</div>
				</div>
				<ToastContainer
					position='top-right'
					autoClose={3000}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</div>
		</>
	);
};

export default Contact;
