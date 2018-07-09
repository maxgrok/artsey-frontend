import React, { Component } from 'react';

import Remarkable from 'remarkable';

class Comment extends Component {
	rawMarkup() {
      var md = new Remarkable();
      var rawMarkup = md.render(this.props.children.toString());
      return { __html: rawMarkup };
  	}

    render() {
        return (
      <div className="comment">
        <h4 style={{textAlign: "left"}}>
          {this.props.author}
        </h4>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
    }
}

export default Comment;
