import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import ContentContainer from './ContentContainer';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import axios from "axios";

const Dashboard = (props) => {

    const [collapsed, setCollapsed] = useState(false);
    const [className, setClassName] = useState('');

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        getClassName(props.match.params.class);
    }, []);

    const getClassName = (classId) => {
        if (className || !classId) {
            return;
        }

        axios.get(`/api/classes/${classId}`)
            .then(response => setClassName(response.data.name))
            .catch(err => console.log(err));
    }


    return (
        <Router>
            <Layout>
                <Sidebar toggleCollapse={toggleCollapse} collapsed={collapsed}/>

                <Layout id="layout">
                    <DashboardHeader toggleCollapse={toggleCollapse} collapsed={collapsed}/>

                    <Route exact path="/dashboard"
                           render={(props) => <ContentContainer {...props} title="Dashboard"/>}/>
                    <Route exact path="/admin/students"
                           render={(props) => <ContentContainer {...props} title="Manage students"/>}/>
                    <Route exact path="/admin/classes"
                           render={(props) => <ContentContainer {...props} title="Manage classes"/>}/>
                    <Route path="/admin/classes/:class"
                           render={(props) => <ContentContainer {...props} title={className}
                                                                classId={props.match.params.class}/>}/>
                    <Route exact path="/settings"
                           render={(props) => <ContentContainer {...props} title="Settings"/>}/>
                    <Route exact path="/qr"
                           render={(props) => <ContentContainer {...props} title="Generate QR"/>}/>
                </Layout>
            </Layout>
        </Router>
    );
};

export default Dashboard;