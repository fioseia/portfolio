import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import Loading from './components/Shared/Loading/Loading';

ReactDOM.render(
	<React.StrictMode>
		<Suspense fallback={<Loading />}>
			<Provider store={store}>
				<BrowserRouter>
					<App style={{maxWidth: '100vw'}}/>
				</BrowserRouter>
			</Provider>
		</Suspense>
	</React.StrictMode>,
	document.getElementById('root')
);
