/** @jsx React.DOM */
var CommentBox = require('./comment-app.js')

var Button = Bootstrap.Button;

var HelloWorld = React.createClass({
    render: function () {
        return <div>Hello, World! <Button bsStyle="primary">hello</Button> <Link href="/comments">Comments</Link></div>;
    }
});


var App = module.exports = React.createClass({
    render: function () {
        return <html>
            <head>
                <title>FreshPay</title>
                <meta charset="utf-8" />
                <link rel="stylesheet" href="/static/style.css" type="text/css" media="screen" charset="utf-8" />
            </head>
            <body>
                <div id="app">
                    <Pages path={this.props.path}>
                        <Location path="/" handler={HelloWorld} />
                        <Location path="/comments" handler={CommentBox} />
                        <NotFound handler={HelloWorld} />
                    </Pages>
                </div>

                <script src="/static/app.js" type="text/javascript" charset="utf-8"></script>
            </body>
        </html>;
    }
});
