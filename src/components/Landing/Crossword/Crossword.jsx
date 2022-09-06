import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useCrossword from '../../../hooks/useCrossword';
import { pagesData } from '../../../utils/pages-data';
import CrosswordWord from './CrosswordWord';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Crossword = () => {
	const { handleKeyup } = useCrossword();
	const [letter, setLetter] = useState('');

	useEffect(() => {
		window.addEventListener('keyup', handleKeyup);

		return () => window.removeEventListener('keyup', handleKeyup);
	}, [handleKeyup]);

	const handleSubmit = (e) => {
		e.preventDefault();
		handleKeyup({ key: letter });
	};

  const handleClue=() => {
    const messages = ['🙌🏽 TRY PROJECTS', '😊 TRY ABOUT', '👋🏽 TRY CONTACT', '💪🏽 TRY CHALLENGES']
    toast(messages[Math.floor(Math.random() * messages.length)])
  }

	return (
		<div className='crossword-container'>
			<div className='crossword-grid'>
				{pagesData.map((p, i) => (
					<CrosswordWord title={p.slug} index={i} key={`word-${i}`} />
				))}
			</div>
			<motion.div
				className='crossword-ref'
				exit={{
					opacity: 0,
				}}
			>
				{/* <span>Type your answers</span> */}
				<div>
					<p>
						1 - Noun. A piece of planned work or an activity that is finished
						over a period of time and intended to achieve a particular purpose.
						(plural)
					</p>
					<p>
						2 - Noun. Something that needs mental or physical effort in order to
						be done successfully and therefore tests a person's ability.
						(plural)
					</p>
					<p>3 - Preposition. On the subject of, or connected with.</p>
					<p>
						4 - Verb. To communicate with someone by calling or sending them a
						letter, email, etc.
					</p>
				</div>
				<div>
					<button id='header-clue-button'onClick={handleClue}>Give me a clue</button>
					<div className='crossword-input'>
						<form onSubmit={handleSubmit}>
							<input
								type='text'
								value={letter}
								onChange={(e) => setLetter(e.target.value)}
							/>
							<input type='submit' />
						</form>
					</div>
				</div>
			</motion.div>
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
	);
};

export default Crossword;
