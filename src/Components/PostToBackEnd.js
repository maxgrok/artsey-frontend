import React from "react";

export default class PostToBackEnd extends React.Component {
	constructor(props) {
		super(props);
		this;
	}

	postArtist(item) {
		console.log(item);
	}

	postGene(item) {}

	postArtwork(item) {}

	render() {
		debugger;
		return (
			<div>
				PostToBackEnd{" "}
				{this.postArtist(this.props.searchResults.artist[0])}
			</div>
		);
	}
}
