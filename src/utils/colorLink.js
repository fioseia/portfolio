export const colorLinks =(route)=>{
  setTimeout(()=>{
    let links = document.querySelectorAll('.links-item');
    if (links.length > 0) {
      links.forEach((link) => link.classList.remove('selected'));
    }
    let el = document.querySelector(`.link-${route}`);
    el.classList.add('selected');
  },1000)
}