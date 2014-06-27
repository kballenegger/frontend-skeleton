/** @jsx React.DOM */
var cortex = require('./cortex.js');

var Button = Bootstrap.Button
  , Jumbotron = Bootstrap.Jumbotron;


var Home = module.exports = React.createClass({
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
