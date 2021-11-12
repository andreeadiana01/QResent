import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Authentication from './components/authentication/Authentication';
import AuthenticatedRoute from './components/authentication/AuthenticatedRoute';
import ResetPassword from './components/authentication/ResetPassword';
import ActivateAccount from './components/authentication/ActivateAccount';
import MainMenu from './components/mainMenu/mainMenu'

var ok = false;
const App = () => {
    if(ok) {
    return (
        <Router>
            <Switch>
                <AuthenticatedRoute path="/" exact
                                    component={(props) => <Authentication {...props} form='login'/>} />

                <AuthenticatedRoute path="/activate/:activationToken" component={ActivateAccount} />

                <AuthenticatedRoute path="/reset/:resetToken" component={ResetPassword} />
            </Switch>
        </Router>
    );
    } else {
        ReactDOM.render(<MainMenu />, document.getElementById('root'));
        return 1;
    }
};

export default App;
