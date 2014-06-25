// React stuff
React = require('react');
Router = require('react-router-component');

Pages = Router.Pages;
Locations = Router.Locations;
Location = Router.Location;
Link = Router.Link;
NotFound = Router.NotFound;

Bootstrap = require('react-bootstrap');

// Mori
_ = require('mori');

// App source code
//require('./app-wisp.js');
var App = require('./app-jsx.js');

if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    React.renderComponent(App({path: window.location.pathname}), document);
} else {
    module.exports = App;
}
