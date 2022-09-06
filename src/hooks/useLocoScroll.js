import { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/src/locomotive-scroll.scss';

gsap.registerPlugin(ScrollTrigger);

export default function useLocoScroll(id) {
	const [preloader, setPreloader] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setPreloader(false);
		}, 1000);
	}, []);

	useEffect(() => {
		if (preloader) return;

		const scrollEl = document.querySelector(id);

		let locoScroll = new LocomotiveScroll({
			el: scrollEl,
			smooth: true,
			multiplier: 1,
			class: 'is-reveal',
      mobile: {
        smooth: true
    },
		});

		locoScroll.on('scroll', () => {
			ScrollTrigger.update();
		});

		ScrollTrigger.scrollerProxy(scrollEl, {
			scrollTop(value) {
				if (locoScroll) {
					return arguments.length
						? locoScroll.scrollTo(value, 0, 0)
						: locoScroll.scroll.instance.scroll.y;
				}
        return null
			},
			getBoundingClientRect(){
        return {top: 0, left:0, width: window.innerWidth, height: window.innerHeight}
      },
      pinType: scrollEl.getElementsByClassName.transform ? 'transform': 'fixed'
		});
    

    const lsUpdate =()=>{
      if(locoScroll) {
        locoScroll.update()
      }
    }

    // ScrollTrigger.addEventListener('refresh', lsUpdate)
    // ScrollTrigger.refresh()

		return () => {
      if(locoScroll) {
        //ScrollTrigger.removeEventListener('refresh', lsUpdate)
        locoScroll.destroy()
        locoScroll = null
      }
    }
	}, [preloader, id]);

}
