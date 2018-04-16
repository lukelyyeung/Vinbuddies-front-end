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
import { VinoBot } from './VinoBot';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ProfileAction, getUserProfile } from '../actions/userProfile-action';
import { PrivateRoute } from './privateRoute';

export class PureNavigation extends React.Component<any, reduxRice.NavigationState> {
    constructor(props: any) {
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

    async componentDidMount() {
        const token = localStorage.getItem('token');
        if (token !== null) {
            await this.props.getUserProfile(token);
        }
    }

    async componentWillUpdate() {
        const token = localStorage.getItem('token');
        if (token !== null) {
            await this.props.getUserProfile(token);
        }
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
                                <Link className="nav-link" to="/vinobot">Vinobot</Link>
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
                <Route path="/vinobot" component={VinoBot} />
                <PrivateRoute path="/postevent" component={PostEvent} />
                <PrivateRoute path="/dashboard" component={dashboard} />
            </div>
        );
    }
}

export const Navigation = connect(
    null,
    (dispatch: Dispatch<ProfileAction>) => ({
        getUserProfile: (token: string): Promise<any> | any => dispatch(getUserProfile(token))
    }),
    null,
    { pure: false }
)(PureNavigation);