import * as React from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Dispatch } from 'redux';
import { LoginActions, FbLoginUser } from '../actions/auth-action';
import env from '../env';
import { Redirect } from 'react-router';
const ENV = env.dev;

interface LocationProp {
    state: {
        from: {
            pathname: string
        }
    };
}

interface PureLoginProps {
    location: LocationProp;
    login: (userInfo: ReactFacebookLoginInfo & { accessToken: string }) => Promise<void>;
    isAuthenticated: boolean;
}

interface PureLoginState {
    redirectToReferrer: boolean;
}

class PureFbLogin extends React.Component<PureLoginProps, PureLoginState> {

    constructor(props: PureLoginProps) {
        super(props);
        this.state = {
            redirectToReferrer: false
        };
    }

    responseFacebook = async (userInfo: ReactFacebookLoginInfo & { accessToken: string }) => {
        await this.props.login(userInfo);
        if (this.props.isAuthenticated) {
            this.setState({ redirectToReferrer: true });
        }
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }
        return (
            <div>
                <FacebookLogin
                    appId={ENV.facebook_app_id}
                    autoLoad={false}
                    fields="name,email,picture,accessToken"
                    callback={this.responseFacebook}
                />
            </div>
        );
    }
}

export const FbLogin = connect(
    (state: RootState) => ({ isAuthenticated: state.auth.isAuthenticated }),
    (dispatch: Dispatch<LoginActions>) => ({
        login: (
            userInfo: ReactFacebookLoginInfo &
                { accessToken: string }): Promise<void> =>
            dispatch(FbLoginUser(userInfo))
    }))(PureFbLogin);