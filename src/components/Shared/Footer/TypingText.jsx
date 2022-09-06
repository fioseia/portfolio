import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { RoughEase } from "gsap/EasePack";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin, RoughEase);

const TypingText = ({ data }) => {
	const [array, setArray] = useState(data.subtitles);
  let masterTL = gsap.timeline({repeat:-1});

	useEffect(() => {
		const cursor = document.querySelector("#footerCursor");
		const text = document.querySelector("#footerText");

		gsap.to(cursor, { opacity: 0, ease: "power2.inOut", repeat: -1 });

	
		array.forEach((subt) => {
      let tl = gsap.timeline({repeat:1, yoyo:true, repeatDelay: 2 })
      .to(text, { duration: 2, text: subt });
      masterTL.add(tl)
		});
	}, []);

	return <span id="footerText"></span>;
};

export default TypingText;