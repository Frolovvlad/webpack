import React from 'react';

import logo from '../img/preview.jpg';

export class Greeter extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<img src={logo} />
						<h1>Hello Webpack</h1>
					</div>
				</div>
			</div>
		);
	}
}