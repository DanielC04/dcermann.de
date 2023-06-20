import { useEffect, useState } from "react";


export const isInViewport = (el: Element): boolean => {
	const rect = el.getBoundingClientRect();
	return rect.top < window.innerHeight && rect.bottom > 0;
}

const useIsInView = (elementSelector: string) => {
	const [isInView, setIsInView] = useState(true);

	useEffect(() => {
		const el = document.querySelector(elementSelector);
		if (el == null) return;
		const checkIfElementInView = () => {
			if (isInViewport(el) !== isInView) setIsInView(!isInView);
		}
		window.addEventListener("scroll", checkIfElementInView);
		checkIfElementInView();
		return () => window.removeEventListener("scroll", checkIfElementInView);
	}, []);

	return isInView;
};

export default useIsInView;