export const SET_SCREEN = 'SET_SCREEN';
export const GET_LETTERS = 'GET_LETTERS';
export const SET_LETTER_TO_TRUE = 'SET_LETTER_TO_TRUE';
export const ADD_PAGE = 'ADD_PAGE';
export const SET_NAVIGATION_TO_FALSE = 'SET_NAVIGATION_TO_FALSE';
export const SET_CURRENT_ROUTE = 'SET_CURRENT_ROUTE';
export const SET_ROUTE_RECT = 'SET_ROUTE_RECT';

export const setScreen =(string)=>{
  return function (dispatch) {
    dispatch({type:SET_SCREEN, payload:string});
  }
}

export const getLetters = (data) => {
	let response = [];

	// charsArray = data.map((page) => page.slug.split('')).flat();
	// let uniqueChars = [...new Set(charsArray)];
	// uniqueChars.forEach((char) => (response[char] = false));
	try {
		for (let i = 0; i < data.length; i++) {
			let pages = {};
			data[i]['slug'].split('').forEach((char) => (pages[char] = false));
			response.push({ title: data[i]['slug'], ...pages });
		}

		return function (dispatch) {
			dispatch({ type: GET_LETTERS, payload: response });
		};
	} catch (e) {
		console.error(e);
	}
};

export const setLetterToTrue = (key) => {
	return function (dispatch) {
		dispatch({ type: SET_LETTER_TO_TRUE, payload: key });
	};
};

export const addPage = (page) => {
	return function (dispatch) {
		dispatch({ type: ADD_PAGE, payload: { title: page, navigate: true } });
	};
};

export const setNavigateToFalse = (route) => {
	return function (dispatch) {
		dispatch({ type: SET_NAVIGATION_TO_FALSE, payload: route });
	};
};

export const setCurrentRoute = (route) => {
	
	return function (dispatch) {
		dispatch({ type: SET_CURRENT_ROUTE, payload: route });
	};
};

export const setRouteRect = (element) => {
	return function (dispatch) {
		dispatch({ type: SET_ROUTE_RECT, payload: element });
	};
};
