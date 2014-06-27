/** @jsx React.DOM */

var cortex = require('./cortex.js');
var CortexReactivityMixin = require('./cortex-reactivity.js');
var Markdown = require('markdown-js').markdown;

var Panel = Bootstrap.Panel;
var Button = Bootstrap.Button;

var Comment = React.createClass({
    render: function () {
        return <Panel header={this.props.prefix + this.props.author}>
            <div dangerouslySetInnerHTML={{__html: Markdown(this.props.text)}}></div>
        </Panel>;
    },
});

var CommentList = React.createClass({
    render: function () {
        var prefix = this.props.prefix.val();
        var comments = this.props.comments.val().map(function (e) {
            return <Comment author={e.author} text={e.text} key={e.id} prefix={prefix} />
        });
        return <div>{comments}</div>;
    },
});

var CommentInput = React.createClass({
    render: function () {
        return Bootstrap.Panel({}, <form onSubmit={this.submit}>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Name" ref="author" />
            </div>
            <div className="form-group">
                <textarea className="form-control" placeholder="Say something..." ref="text" />
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
            this.props.comments.push({id: (new Date).getTime(), author: author, text: text});
        }
        return false;
    },
});

var CommentBox = module.exports = React.createClass({
    mixins: [CortexReactivityMixin],
    render: function () {
        return <div>
            <form className="form-inline"><div className="form-group">
                    <label className="control-label" style={{'padding-right': '10px'}}>Prefix: </label>
                    <input className="form-control" type="text" defaultValue={cortex.prefs.prefix.val()}
                        onChange={this.prefixChanged} ref="prefix" />
            </div></form>
            <h1>Comments:</h1>
            <CommentList comments={cortex.comments} prefix={cortex.prefs.prefix} />
            <CommentInput comments={cortex.comments} />
        </div>;
    },
    getDefaultProps: function () {
        return {
            comments: cortex.comments,
            prefix: cortex.prefs.prefix
        };
    },
    prefixChanged: function () {
        this.props.prefix.set(this.refs.prefix.getDOMNode().value);
    },
});
