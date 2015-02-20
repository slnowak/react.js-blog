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

  addNewComment: function(comment) {
    $.ajax({
      url: this.props.url,
      type: 'POST',
      dataType: 'json',
      data: comment,
      success: function() {
        this._performOptimisticUpdate(comment);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  _performOptimisticUpdate: function(comment) {
    var comments = this.state.comments;
    var newComments = comments.concat([comment]);
    this.setState({comments: newComments});
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
        <CommentForm submitCallback={this.addNewComment}/>

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
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this._trimmedValue(this.refs.author);
    var content = this._trimmedValue(this.refs.content);

    if (author && content) {
      this.props.submitCallback(
        {author: author, content: content}
      );
      this._clearField(this.refs.author);
      this._clearField(this.refs.content);
    }

  },

  _trimmedValue: function(field) {
    return field.getDOMNode().value.trim();
  },

  _clearField: function(field) {
    field.getDOMNode().value = '';
  },

  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Type your name" ref="author"/>
        <input type="text" placeholder="Say something ;)" ref="content"/>
        <input type="submit" value="Post!"/>
      </form>
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
