import * as React from 'react';
import { Route, Link } from 'react-router-dom';
// import { PrivateRoute } from './privateRoute';
import { Login } from './login';
import { Home } from './home';
import '../css/nav.css';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { dashboard } from './dashboard';
import { AuthButton } from './authButton';
import { Signup } from './signup';
import { PostEvent } from './postEvent';
// import { EventJournal } from './EventJournal';

export class Navigation extends React.Component<{}, reduxRice.NavigationState> {
    constructor(props: {}) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className="d-flex justify-content-center">
                <Navbar color="faded" light={true} expand="md">
                    <NavbarBrand href="/">
                        <div className="logo flexBox-row"><h1>Vinbuddies</h1></div>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse className="navbar-toggle" isOpen={this.state.isOpen} navbar={true}>
                        <Nav className="ml-auto" navbar={true}>
                            <NavItem>
                                <Link className="nav-link" to="/">Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to="/">Vinobot</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to="/">Contact</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to="/">Marts</Link>
                            </NavItem>
                            <UncontrolledDropdown nav={true} inNavbar={true}>
                                <DropdownToggle nav={true} caret={true}>User</DropdownToggle>
                                <DropdownMenu right={true}>
                                    <DropdownItem><AuthButton /></DropdownItem>
                                    <DropdownItem>
                                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link className="nav-link" to="/postevent">Post Event</Link>
                                    </DropdownItem>
                                    <DropdownItem divider={true} />
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Route exact={true} path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/postevent" component={PostEvent} />
                <Route path="/dashboard" component={dashboard} />
            </div>
        );
    }
}