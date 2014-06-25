/** @jsx React.DOM */
var CommentBox = require('./comment-app.js')

var Button = Bootstrap.Button;

var HelloWorld = React.createClass({
    render: function () {
        return <div>Hello, World! <Button bsStyle="primary">hello</Button> <Link href="/comments">Comments</Link></div>;
    }
});


var App = React.createClass({
    render: function () {
        var routed = <Locations>
            <Location path="/" handler={HelloWorld} />
            <Location path="/comments" handler={CommentBox} />
            <NotFound handler={HelloWorld} />
        </Locations>;
        return routed;
    }
});

React.renderComponent(<App />, document.getElementById('app-jsx'));
