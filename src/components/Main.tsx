import * as React from 'react';
import { Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { Dashboard } from './Dashboard';
import { PostEvent } from './PostEvent';
import { VinoBot } from './VinoBot';
import { Login } from './Login';
import { Signup } from './Signup';
import { Home } from './Home';
import { Navigation } from './Navigation';
import { PrivateRoute } from './PrivateRoute';

export const Main = (props: any) => (
    <div className="d-flex justify-content-center">
        <Navigation />
        <Route exact={true} path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/vinobot" component={VinoBot} />
        <PrivateRoute path="/postevent" component={PostEvent} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <ToastContainer 
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={true}
            draggable={true}
            pauseOnHover={true}    
        />
    </div>
);