// React stuff
React = require('react');

Bootstrap = require('react-bootstrap');

// Mori
_ = require('underscore');

// App source code
//require('./app-wisp.js');
var App = require('./app-jsx.js');

if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    React.renderComponent(App({path: window.location.pathname}), document.getElementById('app'));
} else {
    module.exports = App;
}
