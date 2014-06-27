var cortex = require('./cortex.js');

// TODO: only react to change to a small part of the tree, instead of all...
//
var CortexReactivityMixin = module.exports = {
    componentDidMount: function () {
        cortex.on('update', this.cortexReactivityMixinRefresh);
    },
    componentWillUnmount: function () {
        cortex.off('update', this.cortexReactivityMixinRefresh);
    },
    cortexReactivityMixinRefresh: function () {
        this.setState({cortexReactivityMixinLastRefresh: (new Date).getTime()});
    },
};
