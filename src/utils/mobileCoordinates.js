
export const mobileCoordinates=(e)=>{
  const isClient = typeof window === 'object';
		let width = isClient ? window.innerWidth : 0
		let height = isClient ? window.innerHeight : 0

  const xPos = () => {
    if (!e.target) return 0;
    const rect = e.target.getBoundingClientRect();
    return width / 2 - rect.left - rect.width / 2;
  };
  const yPos = () => {
    if (!e.target) return 0;
    const rect = e.target.getBoundingClientRect();
    return height / 2 - rect.top - rect.height / 2;
  };

  let initialX = xPos();
  let initialY = yPos();
  let elWidth =e.target.getBoundingClientRect().width
  let elHeight =e.target.getBoundingClientRect().height
  let finalX= width / 2 - elWidth / 2
  let finalY = height / 2 - elHeight / 2

  return {initialX, initialY, finalX, finalY, elWidth, elHeight}
}