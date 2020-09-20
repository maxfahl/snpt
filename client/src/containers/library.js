import React, { Component } from "react";
import { majorScale } from "evergreen-ui";

export default class Library extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (<div id="library" style={{ width: majorScale(40) }}>
			<p>Library</p>
		</div>);
	}
}
