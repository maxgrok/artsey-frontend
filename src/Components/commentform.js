import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ContainedButtons from './formbutton';

class CommentForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			author: "",
			text: ""
		}
	}

  handleAuthorChange = (e) => {
    this.setState({author: e.target.value});
  }

  handleTextChange = (e) => {
    this.setState({text: e.target.value});
  }
  
  handleSubmit = (e)=> {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  }

  render(){
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
          <TextField
          id="name"
          label="Name"
          className={this.props.textField}
          value={this.state.name}
          onChange={this.handleAuthorChange}
          margin="normal"
        /><br />
        <TextField
        	input="text"
          id="comment"
          label="Comment"
          className={this.props.textField}
          value={this.state.text}
          onChange={this.handleTextChange}
          margin="normal"
        /><br />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

export default CommentForm;


