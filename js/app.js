var CommentBox = React.createClass({
  render: function() {
    return (
      <div className = "commentBox">
        <h2>Comments</h2>
        <CommentList />

        <br/> <br/>
        <CommentForm />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="novy">Comment</Comment>
        <Comment author="novy2">Yet another</Comment>
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

        { this.props.children }
      </div>
    );
  }
});


React.render(
  <CommentBox />,
  document.getElementById('content')
);
