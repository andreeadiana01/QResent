import React, { useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

const ActivateAccount = () => {

    const { activationToken } = useParams();
    const history = useHistory();
    const data = {
        activationToken: activationToken,
        // TODO
        password: "Test12345!"
    };

    useEffect(() => {
        axios.post('/api/auth/activate', data)
            .then(response => {
                if (response.status === 200) {
                    message.success('Account successfully activated!');
                    history.push('/');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });

    return (
        <div/>
    );
};

export default ActivateAccount;