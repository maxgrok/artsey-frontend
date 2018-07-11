import React from "react";
const Token =
	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMTMyNDQ4MywiaWF0IjoxNTMwNzE5NjgzLCJhdWQiOiI1YjNjZWRjMmNkNTMwZTA4NTlhMzQ0NWEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWIzY2VkYzM4YjNiODEzNTQ0MmNkMDExIn0.CSvl6_A9XdChPrMIylGmCnb-iwb5-E1shyyBbC3QGJQ";
const url = "https://api.artsy.net/api/";
export default class DetailView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemDetails: {}
		};
	}

	getDetails(url) {
		return fetch(url, {
			headers: {
				"X-Xapp-Token": Token
			}
		})
			.then(resp => {
				console.log(resp);
				return resp.json();
			})
			.then(json => this.setState({ itemDetails: json }));
	}

	async modal(item) {
		let details = await this.getDetails(item._links.self.href);
		this.setState({ itemDetails: details });
		// debugger;
		return details;
	}

	componentDidMount() {
		this.getDetails(this.props.item._links.self.href);
	}

	render() {
		return (
			<div>
				Detail View
				<h2>
					{this.state.itemDetails.name
						? this.state.itemDetails.name
						: this.state.itemDetails.title}
				</h2>
				<p>{this.state.itemDetails.description}</p>
			</div>
		);
	}
}
