import React from 'react';

const Loading = () => {
	return (
		<div
			style={{
				width: '100vw',
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#000',
			}}
		>
			<h1
				style={{
					fontFamily: 'Poppins, sans-serif',
					fontSize: '7vw',
					color: '#f1f1f1',
					textTransform: 'uppercase',
				}}
			>
				FS portfolio
			</h1>
		</div>
	);
};

export default Loading;
