import React from 'react'
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { FaCalendarAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import TypingText from './TypingText';

import './FooterStyles.scss'

const footer = {
  title: "Hi, let's ",
  subtitles: [
    "book a call",
    "discuss new ideas",
    "have a coffee",
    "work together"
  ]
}

const Footer = () => {
  return (
    <section className="footer-container">
      <div className="footer-left">
      <h4 id="footerTitle">{footer.title}</h4>
					<TypingText data={footer} />
					<span id="footerCursor">_</span>
      </div>
      <div className="footer-right">
      <div >
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
    </section>
  )
}

export default Footer