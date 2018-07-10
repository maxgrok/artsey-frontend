import React from "react";

export default class Login extends React.Component {
	handleSubmit(e) {
		e.preventDefault();
		console.log(e);
	}

	render() {
		return (
			<div>
				<form onsubmit={this.handleSubmit}>
					<input type="text" name="username" placeholder="username" />
					<input
						type="password"
						name="password"
						placeholder="password"
					/>
					<input type="submit" name="submit" />
				</form>
			</div>
		);
	}
}
