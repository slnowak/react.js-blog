var CommentBox = React.createClass({
  getInitialState: function() {
    return {
      comments: []
    };
  },

  loadComments: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({comments: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadComments();
    setInterval(this.loadComments, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className = "commentBox">
        <h2>Comments</h2>
        <CommentList comments={this.state.comments}/>

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
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('content')
);
