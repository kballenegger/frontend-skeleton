/** @jsx React.DOM */


// React stuff...
//
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var Link = Router.Link;
var NotFound = Router.NotFound;


// App components...
//
var CommentBox = require('./comment-app.js')

var Button = Bootstrap.Button;

var HelloWorld = React.createClass({
    render: function () {
        return <div>Hello, World! <Button bsStyle="primary">hello</Button> <Link href="/comments">Comments</Link></div>;
    }
});


var Nav = Bootstrap.Nav
  , Navbar = Bootstrap.Navbar
  , NavItem = Bootstrap.NavItem;

var NavigationWrapper = function (body, cortex) {
    return React.createClass({
        render: function () {
            return <div>
                <Navbar>
                    <Nav>
                        <NavItem key="home" href="/">Home</NavItem>
                        <NavItem key="comments" href="/comments">Comments</NavItem>
                    </Nav>
                </Navbar>
                {body({cortex: cortex})}
            </div>;
        }
    });
};
// Data layer
//
var Cortex = require('cortexjs');

var cortex = new Cortex({});


// Root router
//
var CaptureClicks = require('react-router-component/lib/CaptureClicks');
var App = module.exports = React.createClass({
    render: function () {
        return <CaptureClicks>
            <Locations path={this.props.path}>
                <Location path="/" handler={NavigationWrapper(HelloWorld, cortex)} />
                <Location path="/comments" handler={NavigationWrapper(CommentBox, cortex)} />
                <NotFound handler={HelloWorld} />
            </Locations>
        </CaptureClicks>;
    }
});
