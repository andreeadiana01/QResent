import React, { useEffect } from "react";
import { isAuthenticated } from "../../auth";
import Authentication from "../authentication/Authentication";
import { message, Spin } from "antd";
import axios from "axios";

const AttendClass = (props) => {
    useEffect(() => {
        postAttend(isAuthenticated().token).then(() => window.location.href = '/');
    }, []);

    const postAttend = (jwtToken) => {
        return axios.post('/api/attendance', {
            jwtToken: jwtToken,
            attendanceToken: props.match.params.attendanceToken
        })
            .then(response => message.success(response.data))
            .catch(() => message.error('Couldn\'t add attendance entry!'));
    }

    return (
        <div id="background">
            {
                isAuthenticated().token ?
                    <Spin size="large"/> :
                    <Authentication form="login" action="attend" attendanceToken={props.match.params.attendanceToken}/>
            }
        </div>
    )
}

export default AttendClass;