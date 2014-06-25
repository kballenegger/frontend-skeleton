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
            <div className="author">{this.props.author} -- {this.props.username}</div>
            <div className="text">{mdToHtml(this.props.text)}</div>
        </div>;
    }
});

var CommentList = React.createClass({
    render: function () {
        var username = this.props.username;
        var comments = this.props.data.map(function (e) {
            return <Comment author={e.author} text={e.text} key={e.id} username={username} />
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
    submit: function () {
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

var counter = 3;

var CommentBox = module.exports = React.createClass({
    render: function () {
        return <div className="comment-box">
            <input type="text" value={this.state.username}
                onChange={this.usernameChanged} ref="username" />
            <h1>Comments:</h1>
            <CommentList data={this.state.data} username={this.state.username} />
            <CommentInput callback={this.commentsUpdated} />
        </div>;
    },
    getInitialState: function () {
        return {
            data: [
                {id: 1, author: "Brandon Goldman", text: "I am Brandon!"},
                {id: 2, author: "George Burke", text: "I am George!"},
                {id: 3, author: "Kenneth Ballenegger", text: "I am Kenneth!"}
            ],
            username: "Kenneth"
        };
    },
    usernameChanged: function () {
        var state = this.state;
        state["username"] = this.refs.username.getDOMNode().value;
        this.setState(state);
    },
    commentsUpdated: function (comment) {
        comment[id] = ++counter;
        this.setState({data: this.state.data.concat(comment)});
    }
});
