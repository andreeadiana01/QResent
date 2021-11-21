import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import ContentContainer from './ContentContainer';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';

const Dashboard = () => {

    const [ collapsed, setCollapsed ] = useState(false);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Router>
            <Layout>
                <Sidebar toggleCollapse={toggleCollapse} collapsed={collapsed} />

                <Layout id="layout">
                    <DashboardHeader toggleCollapse={toggleCollapse} collapsed={collapsed} />

                    <Route exact path="/dashboard"
                           render={(props) => <ContentContainer {...props} title="Dashboard" />} />
                    <Route exact path="/admin/students"
                           render={(props) => <ContentContainer {...props} title="Manage students" />} />
                    <Route exact path="/admin/classes"
                           render={(props) => <ContentContainer {...props} title="Manage classes" />} />
                    <Route exact path="/settings"
                           render={(props) => <ContentContainer {...props} title="Settings" />} />
                </Layout>
            </Layout>
        </Router>
    );
};

export default Dashboard;