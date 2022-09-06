import gsap from "gsap"

export const Stretch = (el, perc) =>{
  gsap.timeline()
  .add()
  .to(el, {
    scaleX: perc,
    duration: 0.3,
    ease: 'linear'
  })
}