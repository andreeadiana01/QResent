import React from 'react';
import { Divider, Layout } from 'antd';
import '../../../styles/dashboard.scss';
import SidebarMenu from './SidebarMenu';
import logoUpb from '../../../assets/images/logo-upb.png';
import logoQresent from '../../../assets/images/qresent-logo.svg';

const { Sider } = Layout;

const Sidebar = (props) => {
    return (
        <Sider id="sidebar" className="box-shadow" theme="light" width="15%" collapsible collapsed={props.collapsed}
               onCollapse={props.toggleCollapse}>

            <div className="logo centered">
                <img src={props.collapsed ? logoUpb : logoQresent} alt="logo.svg"/>
            </div>

            <Divider style={{ margin: 0 }}/>

            <SidebarMenu/>
        </Sider>
    );
};

export default Sidebar;