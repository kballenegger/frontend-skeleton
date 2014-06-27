/** @jsx React.DOM */

// React stuff...
//
var ReactRouter = require('react-router-component');
var Locations = ReactRouter.Locations;
var Location = ReactRouter.Location;
var Link = ReactRouter.Link;
var NotFound = ReactRouter.NotFound;


// App components...
//
var CommentBox = require('./comment-app.js');
var HelloWorld = require('./home.js');
var NavigationWrapper = require('./navigation.js');
var AuthGate = require('./auth-gate.js');
var CortexReactivity = require('./cortex-reactivity.js');

// Root router
//
var CaptureClicks = require('react-router-component/lib/CaptureClicks');
var Router = React.createClass({
    render: function () {
        return <CaptureClicks>
            <Locations path={this.props.path}>
                <Location path="/" handler={NavigationWrapper(HelloWorld())} />
                <Location path="/comments" handler={NavigationWrapper(CommentBox())} />
                <NotFound handler={HelloWorld} />
            </Locations>
        </CaptureClicks>;
    },
});


var App = module.exports = React.createClass({
    render: function () {
        var props = this.props;
        props.authorized = Router;
        return CortexReactivity(null, AuthGate(props));
    },
});
