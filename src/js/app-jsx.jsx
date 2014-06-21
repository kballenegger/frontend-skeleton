/** @jsx React.DOM */
require('./comment-app.js')

React.renderComponent(
    <div className="container">
        <CommentBox />
    </div>,
    document.getElementById('app-jsx')
);
