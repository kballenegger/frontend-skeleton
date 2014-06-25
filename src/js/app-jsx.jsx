/** @jsx React.DOM */


var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var Link = Router.Link;
var NotFound = Router.NotFound;


var CommentBox = require('./comment-app.js')

var Button = Bootstrap.Button;

var HelloWorld = React.createClass({
    render: function () {
        return <div>Hello, World! <Button bsStyle="primary">hello</Button> <Link href="/comments">Comments</Link></div>;
    }
});


var App = module.exports = React.createClass({
    render: function () {
        return <Locations path={this.props.path}>
            <Location path="/" handler={HelloWorld} />
            <Location path="/comments" handler={CommentBox} />
            <NotFound handler={HelloWorld} />
        </Locations>;
    }
});
