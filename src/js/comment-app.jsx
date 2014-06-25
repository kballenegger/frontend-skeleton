/** @jsx React.DOM */

var Markdown = require('markdown-js').markdown;

var Panel = Bootstrap.Panel;
var Button = Bootstrap.Button;

var Comment = React.createClass({
    render: function () {
        return <Panel header={this.props.prefix + this.props.author}>
            <div dangerouslySetInnerHTML={{__html: Markdown(this.props.text)}}></div>
        </Panel>;
    }
});

var CommentList = React.createClass({
    render: function () {
        var prefix = this.props.prefix;
        var comments = this.props.data.map(function (e) {
            return <Comment author={e.author} text={e.text} key={e.id} prefix={prefix} />
        });
        return <div>{comments}</div>;
    }
});

var CommentInput = React.createClass({
    render: function () {
        return Bootstrap.Panel({}, <form onSubmit={this.submit}>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Name" ref="author" />
            </div>
            <div className="form-group">
                <textarea className="form-control" placeholder="Say something..." ref="text"></textarea>
            </div>
            <div className="form-group">
                <input type="submit" className="btn btn-primary" value="Post" />
            </div>
        </form>);
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
        return <div>
            <form className="form-inline"><div className="form-group">
                    <label className="control-label" style={{'padding-right': '10px'}}>Prefix: </label>
                    <input className="form-control" type="text" value={this.state.prefix}
                        onChange={this.prefixChanged} ref="prefix" />
            </div></form>
            <h1>Comments:</h1>
            <CommentList data={this.state.data} prefix={this.state.prefix} />
            <CommentInput callback={this.commentsUpdated} />
        </div>;
    },
    getInitialState: function () {
        return {
            data: [
                {id: 1, author: "Brandon Goldman", text: "I am Brandon!"},
                {id: 2, author: "George Burke", text: "I am George!"},
                {id: 3, author: "Kenneth Ballenegger", text: "I am **Kenneth**!"}
            ],
            prefix: "Author: "
        };
    },
    prefixChanged: function () {
        var state = this.state;
        state["prefix"] = this.refs.prefix.getDOMNode().value;
        this.setState(state);
    },
    commentsUpdated: function (comment) {
        comment.id = ++counter;
        this.setState({data: this.state.data.concat(comment)});
    }
});
