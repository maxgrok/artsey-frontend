import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      text: ""
    };
  }

  handleAuthorChange = e => {
    this.setState({ author: e.target.value });
  };

  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.sendComment(this.props.item, this.state.text, this.state.author);
    this.setState({
      text: "",
      author: ""
    });
  };

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <TextField
          id="name"
          label="Name"
          className={this.props.textField}
          value={this.state.author}
          onChange={this.handleAuthorChange}
          margin="normal"
        />
        <br />
        <input
          type="hidden"
          name="id"
          value={this.props.item._links.self.href}
        />
        <TextField
          id="comment"
          label="Comment"
          className={this.props.textField}
          value={this.state.text}
          onChange={this.handleTextChange}
          margin="normal"
        />
        <br />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

export default CommentForm;
