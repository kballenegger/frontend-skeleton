/** @jsx React.DOM */

var cortex = require('./cortex.js');
var Auth = require('./api.js').Auth;


var LoginForm = React.createClass({
    render: function() {
        console.log('login form render');
        var buttonClass = 'btn btn-primary' +
            (this.state.enabled ? '' : ' disabled');
        return <form onSubmit={this.submit}>
            <div className="form-group">
                <input type="email" className="form-control" placeholder="email" ref="email" />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" placeholder="password" ref="password" />
            </div>
            <div className="form-group">
                <input type="submit" className={buttonClass} value="Login" />
            </div>
        </form>;
    },
    getInitialState: function () {
        return {enabled: true};
    },
    submit: function () {
        if (!this.state.enabled) { return false; }
        // fake code
        console.log('timeout')
        setTimeout(function () {
            console.log('setting')
            cortex.session.auth.set('123');
        }, 1000);
        this.setState({enabled: false});
        return false;
        // real code
        var email = this.refs.email.getDOMNode().value.trim();
        var password = this.refs.password.getDOMNode().value.trim();
        if (email && password) {
            Auth.login(email, password);
        }
        return false;
    },
});


// This requires one property, `authorized`. That property must be a React
// class. It will be instantiated and rendered when the content is valid.
//
// Any other properties set on this object will be passed down to its child.
//
var AuthGate = module.exports = React.createClass({
    render: function () {
        console.log('rerendering: auth gate');
        var authorized = this.props.authorized;
        console.log('rerendering');
        console.log(cortex.session.auth.val());
        if (cortex.session.auth.val()) {
            // TODO: what about when the token is invalid?
            return transferPropsTo(authorized());
        } else {
            return <LoginForm />;
        }
    },
});
