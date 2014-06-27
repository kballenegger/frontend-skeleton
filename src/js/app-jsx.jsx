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
var CommentBox = require('./comment-app.js');
var HelloWorld = require('./home.js');
var NavigationWrapper = require('./navigation.js');

// Root router
//
var CaptureClicks = require('react-router-component/lib/CaptureClicks');
var App = module.exports = React.createClass({
    render: function () {
        return <CaptureClicks>
            <Locations path={this.props.path}>
                <Location path="/" handler={NavigationWrapper(HelloWorld())} />
                <Location path="/comments" handler={NavigationWrapper(CommentBox())} />
                <NotFound handler={HelloWorld} />
            </Locations>
        </CaptureClicks>;
    }
});


var API = require('./api.js');
API.Auth.login('kenneth@ballenegger.com', 'password');
