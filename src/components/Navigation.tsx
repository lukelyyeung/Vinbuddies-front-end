import * as React from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.css';
import 'react-toastify/dist/ReactToastify.css';

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
import { AuthButton } from './authButton';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ProfileAction, getUserProfile } from '../actions/userProfile-action';
import { reduxRice } from '../module';
import { RootState } from '../store';
import { jwtLogin, LoginActions } from '../actions/auth-action';

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

    render() {
        return (
            <div className="d-flex justify-content-center">
                <Navbar color="faded" light={true} expand="md">
                    <NavbarBrand className="flexBox-row">
                        <div className="logo-wrap">
                            <h1 className="logo">VinBuddies</h1>
                        </div>
                    </NavbarBrand>
                    <NavbarToggler className="custom-toggler" onClick={this.toggle} />
                    <Collapse className="navbar-toggle" isOpen={this.state.isOpen} navbar={true}>
                        <Nav className="mr-auto" navbar={true}>
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
                        </Nav>
                        <Nav className="ml-auto" navbar={true}>
                            <UncontrolledDropdown nav={true} inNavbar={true}>
                                <DropdownToggle
                                    nav={true}
                                    caret={true}
                                >
                                    {this.props.userProfile.username}
                                </DropdownToggle>
                                <DropdownMenu right={true}>
                                    <DropdownItem><AuthButton /></DropdownItem>
                                    <DropdownItem>
                                        <div>
                                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export const Navigation = connect(
    (state: RootState) => ({
        userProfile: state.profile,
        isAuthenicated: state.auth.isAuthenticated
    }),
    (dispatch: Dispatch<ProfileAction|LoginActions>) => ({
        getUserProfile: (token: string): Promise<any> | any =>
            dispatch(getUserProfile(token)),
        jwtLogin: (token: string): Promise<any> =>
            dispatch(jwtLogin(token))
    })
)(PureNavigation);