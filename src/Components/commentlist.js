import React, { Component } from "react";
import Comment from "./comment";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.findComments = this.findComments.bind(this);
  }

  findComments(item) {
    return this.props.comments.filter(
      comment => comment.attributes["artsey-link"] === item._links.self.href
    );
  }

  render() {
    let commentNodes = this.findComments(this.props.item).map(comment => {
      return (
        <Comment
          author={comment.attributes.username}
          key={comment.id}
          id={comment.id}
          deleteComment={this.props.deleteComment}
        >
          {comment.attributes.content}
        </Comment>
      );
    });
    return <div className="commentList">{commentNodes}</div>;
  }
}

export default CommentList;
