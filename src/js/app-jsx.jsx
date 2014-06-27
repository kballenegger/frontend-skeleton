/** @jsx React.DOM */

// Data layer
//
var cortex = require('./cortex.js');

// React stuff...
//
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var Link = Router.Link;
var NotFound = Router.NotFound;


// App components...
//
var CommentBox = require('./comment-app.js');


var Button = Bootstrap.Button
  , Jumbotron = Bootstrap.Jumbotron;

var HelloWorld = React.createClass({
    render: function () {
        return <Jumbotron>
            <h1>Hello, World!</h1>
            <p>This mini app demonstrates Kenneth's awesome frontend skeleton.</p>
            <p>The person with the most comments is
                <strong> {this.state.leader.author} </strong> with
                <strong> {this.state.leader.count} </strong> comments.</p>
            <Button bsStyle="primary"
                href="http://toogl.es/#/view/dQw4w9WgXcQ">Learn More</Button>
            <Button href="/comments" style={{'margin-left': '10px'}}>Comments</Button>
        </Jumbotron>;
    },
    leader: function() {
        var comments = cortex.comments.val();
        var grouped_counted = _.reduce(comments, function (acc, v) {
            if (!acc[v.author]) acc[v.author] = 0;
            acc[v.author] = acc[v.author] + 1;
            return acc;
        }, {});
        return  _.reduce(grouped_counted, function(acc, v, k) {
            if (v > acc.count) {
                return {author: k, count: v};
            }
            return acc;
        }, {count: 0});
    },
    getInitialState: function () {
        return {leader: this.leader()};
    },
    componentDidMount: function () {
        cortex.on('update', this.refreshLeader);
    },
    componentWillUnmount: function () {
        cortex.off('update', this.refreshLeader);
    },
    refreshLeader: function () {
        this.setState({leader: this.leader()});
    },
});


var Nav = Bootstrap.Nav
  , Navbar = Bootstrap.Navbar
  , NavItem = Bootstrap.NavItem;

var NavigationWrapper = function (body) {
    return React.createClass({
        render: function () {
            return <div>
                <Navbar>
                    <Nav>
                        <NavItem key="home" href="/">Home</NavItem>
                        <NavItem key="comments" href="/comments">Comments</NavItem>
                    </Nav>
                </Navbar>
                {body}
            </div>;
        },
    });
};

// This seems to be necessary because otherwise I cannot set props on router
// handlers. TODO: there must be a better way. Error said routes can be fns?
var PlainWrapper = function (body) {
    return React.createClass({
        render: function () {
            return <div>{body}</div>;
        },
    });
}


// Root router
//
var CaptureClicks = require('react-router-component/lib/CaptureClicks');
var App = module.exports = React.createClass({
    render: function () {
        return <CaptureClicks>
            <Locations path={this.props.path}>
                <Location path="/" handler={NavigationWrapper(HelloWorld())} />
                <Location path="/comments" handler={NavigationWrapper(CommentBox())} />
                <NotFound handler={PlainWrapper(HelloWorld())} />
            </Locations>
        </CaptureClicks>;
    }
});


var API = require('./api.js');
API.Auth.login('kenneth@ballenegger.com', 'password');
