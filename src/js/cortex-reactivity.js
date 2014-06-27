var cortex = require('./cortex.js');

// NOTE: this may not even work at all. Maybe remove this altogether.
//
var CortexReactivity = module.exports = React.createClass({
    propTypes: {
        children: React.PropTypes.component.isRequired,
    },
    render: function () {
        console.log('cortex react render');
        return this.props.children;
    },
    componentDidMount: function () {
        cortex.on('update', this.refresh);
    },
    componentWillUnmount: function () {
        cortex.off('update', this.refresh);
    },
    refresh: function () {
        // this triggers a refresh of the entire app:
        console.log('entire tree refresh triggered');
        this.setState({lastRefresh: (new Date).getTime()});
        //this.forceUpdate();
    },
});
