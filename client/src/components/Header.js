import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default class Header extends React.PureComponent {

    render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        return (
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><Link to='/'>Courses</Link></h1>
                    <nav>
                    {authUser ? (
                        <React.Fragment>
                            <span>Welcome, {authUser.firstName}! </span>
                            <NavLink to="/signout">Sign Out</NavLink>
                        </React.Fragment>
                        ) : (
                        <React.Fragment>
                            <div className="header--signedout">
                                <NavLink className="signup" to="/signup">Sign Up </NavLink>
                                <NavLink className="signin" to="/signin">Sign In</NavLink>
                            </div>
                        </React.Fragment>
                        )}
                    </nav>
                </div>
            </header>
        )
    }
}