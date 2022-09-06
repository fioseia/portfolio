import { useSelector, useDispatch } from 'react-redux';
import { addPage, setLetterToTrue } from '../redux/actions/actions';

const useCrossword = () => {
	const pages = useSelector((state) => state.pages);
	const dispatch = useDispatch();

	const addRoutes = () => {
		pages.forEach((page) => {
			if (
				Object.values(page).every(
					(value) => value === true || typeof value === 'string'
				)
			) {
				dispatch(addPage(page['title']));
			}
		});
	};

	const handleKeyup = ({ key }) => {
		if (/^[A-Za-z]$/.test(key) && pages.some((el) => Object.hasOwn(el, key))) {
			dispatch(setLetterToTrue(key));
			addRoutes();
		}
	};

	return { handleKeyup, addRoutes };
};
export default useCrossword;
