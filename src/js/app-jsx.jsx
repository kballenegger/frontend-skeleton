/** @jsx React.DOM */

var converter = {
        'makeHtml': function (x) {
            return x + ' - BLAH';
        }
    };
var mdToHtml = function mdToHtml(md) {
        return converter.makeHtml(md);
    };


var Comment = React.createClass({
    render: function () {
        return <div className="comment">
            <div className="author">{this.props.author}</div>
            <div className="text">{mdToHtml(this.props.text)}</div>
        </div>;
    }
});

var CommentList = React.createClass({
    render: function () {
        var comments = this.props.data.map(function (e) {
            return <Comment author={e.author} text={e.text} />
        });
        return <div>{comments}</div>;
    }
});

var CommentInput = React.createClass({
    render: function () {
        return <form onSubmit={this.submit}>
            <input type="text" placeholder="Name" ref="author" />
            <input type="text" placeholder="Say something..." ref="text" />
            <input type="submit" value="Post" />
        </form>;
    },
    submit: function (argument) {
        var authorDom = this.refs.author.getDOMNode();
        var textDom = this.refs.text.getDOMNode();
        var author = authorDom.value.trim();
        var text = textDom.value.trim();
        if (text && author) {
            authorDom.value = '';
            textDom.value = '';
            this.props.callback({author: author, text: text});
        }
        return false;
    }
});

var CommentBox = React.createClass({
    render: function () {
        return <div className="comment-box">
            <h1>Comments:</h1>
            <CommentList data={this.state.data} />
            <CommentInput callback={this.commentsUpdated} />
        </div>;
    },
    getInitialState: function () {
        return {
            data: [
                {author: "Brandon Goldman", text: "I am Brandon!"},
                {author: "George Burke", text: "I am George!"},
                {author: "Kenneth Ballenegger", text: "I am Kenneth!"}
            ]};
    },
    commentsUpdated: function (comment) {
        this.setState({data: this.state.data.concat(comment)});
    }
});

React.renderComponent(
    <div className="container">
        <CommentBox />
    </div>,
    document.getElementById('app-jsx')
);
