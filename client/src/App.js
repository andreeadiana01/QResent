import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Authentication from './components/authentication/Authentication';
import AuthenticatedRoute from './components/authentication/AuthenticatedRoute';
import PrivateRoute from "./components/authentication/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import ActivateAccount from "./components/authentication/ActivateAccount";

const App = () => {
    return (
        <Router>
            <Switch>
                <AuthenticatedRoute path="/" exact
                                    component={(props) => <Authentication {...props} form='login'/>} />
                <AuthenticatedRoute path="/activate/:activationToken" component={ActivateAccount} />
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/admin/:content" component={Dashboard} />
                <PrivateRoute path="/settings" component={Dashboard} />
            </Switch>
        </Router>
    );
};

export default App;
