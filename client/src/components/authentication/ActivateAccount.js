import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, message } from 'antd';
import '../../styles/authentication.scss';
import PasswordField from './inputs/PasswordField';
import SubmitButton from './inputs/SubmitButton';

const ActivateAccount = () => {

    const { activationToken } = useParams();
    const history = useHistory();

    const [ error, setError ] = useState({
        message: '',
        source: '',
    });

    const resetPassword = (values) => {
        const data = {
            password: values.password,
            activationToken: activationToken,
        };

        axios.post('/api/auth/activate', data, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                if (response.status === 200) {
                    message.success('Password was successfully reset!');
                    history.push('/');
                }
            })
            .catch(err => {
                setError(err.response.data);
                message.error(err.response.data);
            });
    };

    return (
        <div id="background">
            <div id="reset-password">
                <div id="password-container">
                    <h1 className="form-title">Reset Password</h1>

                    <p>Insert your new password below.</p>

                    <Form onFinish={resetPassword}>
                        <PasswordField formType="register" error={error} />
                        <SubmitButton title="Reset Password" />
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ActivateAccount;