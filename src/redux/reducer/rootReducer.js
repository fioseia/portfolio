import {
	ADD_PAGE,
	GET_LETTERS,
	SET_CURRENT_ROUTE,
	SET_LETTER_TO_TRUE,
	SET_NAVIGATION_TO_FALSE,
	SET_ROUTE_RECT,
  SET_SCREEN,
} from '../actions/actions';

let initialState = {
	pages: [],
	routes: [],
	currentRoute: {},
	routesRefs: [],
  screen:''
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
    case SET_SCREEN: 
    return{
      ...state,
      screen: action.payload
    }
		case GET_LETTERS:
			return {
				...state,
				pages: action.payload,
			};

		case SET_LETTER_TO_TRUE:
			state.pages.map(
				(page) =>
					Object.hasOwn(page, action.payload) && (page[action.payload] = true)
			);
			return {
				...state,
				pages: [...state.pages],
			};

		case ADD_PAGE:
			return {
				...state,
				routes: !state.routes.find((r) => r.title === action.payload.title)
					? [...state.routes, action.payload]
					: [...state.routes],
			};

		case SET_NAVIGATION_TO_FALSE:
			const route = state.routes.find((r) => r.title === action.payload.title);
			route.navigate = false;
			return {
				...state,
				routes: [
					...state.routes.filter((r) => r.title !== action.payload.title),
					route,
				],
			};

		case SET_CURRENT_ROUTE:
			let aux = state.routesRefs.find((r) => r.title === action.payload.title);
			return {
				...state,
				currentRoute: { ...action.payload, ...aux },
			};

		case SET_ROUTE_RECT:
			return {
				...state,
				routesRefs: [...state.routesRefs, { ...action.payload }],
			};

		default:
			return { ...state };
	}
};

export default rootReducer;
