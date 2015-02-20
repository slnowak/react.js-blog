var CommentBox = React.createClass({
  render: function() {
    return (
      <div className = "commentBox">
        comment box
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        comments
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


React.render(
  <CommentBox />,
  document.getElementById('content')
);
