/** @jsx React.DOM */

var Nav = Bootstrap.Nav
  , Navbar = Bootstrap.Navbar
  , NavItem = Bootstrap.NavItem;

var NavigationWrapper = module.exports = function (body) {
    return React.createClass({
        render: function () {
            return <div>
                <Navbar>
                    <Nav>
                        <NavItem key="home" href="/">Home</NavItem>
                        <NavItem key="comments" href="/comments">Comments</NavItem>
                    </Nav>
                </Navbar>
                {body}
            </div>;
        },
    });
};

