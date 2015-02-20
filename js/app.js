var comments = [
  {author: "novy", content: "comment"},
  {author: "yvon", content: "Yet another comment"}
];


var CommentBox = React.createClass({
  render: function() {
    return (
      <div className = "commentBox">
        <h2>Comments</h2>
        <CommentList comments={this.props.comments}/>

        <br/> <br/>
        <CommentForm />

      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var comments = this.props.comments.map(function(comment) {
      return (
        <Comment author={comment.author}>
          {comment.content}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {comments}
      </div>
    );
  }
});


var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        comment form
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <p className="commentAuthor">
          { this.props.author }
        </p>

        {this.props.children}
      </div>
    );
  }
});


React.render(
  <CommentBox comments={comments}/>,
  document.getElementById('content')
);
