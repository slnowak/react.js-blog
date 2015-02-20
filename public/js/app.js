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
        <div className="jumbotron container">
          <div className="container col-md-6 jumbotron">
            <div className="page-header container">
              <h2>Comments</h2>
            </div>
            <CommentList comments={this.state.comments}/>

            <br/> <br/>
            <CommentForm submitCallback={this.addNewComment}/>
          </div>
        </div>

    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var comments = this.props.comments.map(function(comment) {
      return (
        <div className="container">
          <Comment author={comment.author}>
            {comment.content}
          </Comment>
        </div>
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
      <div className="container">
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input className="form-control" type="text" placeholder="Type your name" ref="author"/>
          <input className="form-control" type="text" placeholder="Say something ;)" ref="content"/>
          <input className="form-control" type="submit" value="Post!" className="btn btn-primary btn-lg"/>
        </form>
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment bs-callout bs-callout-danger">
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
