import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { isAuthenticated } from "../../auth";

const { SubMenu } = Menu;
import {
    BookOutlined,
    HomeOutlined,
    ReadOutlined,
    SettingOutlined,
    TeamOutlined,
    ToolOutlined
} from '@ant-design/icons';

const SidebarMenu = () => {
    const getPageKey = () => {
        const pageURL = window.location.href;
        const pageKey = pageURL.substr(pageURL.lastIndexOf('/') + 1);
        return pageKey === 'dashboard' ? 'playlist' : pageKey;
    };

    const [selected, setSelected] = useState(getPageKey());

    useEffect(() => {
        setSelected(getPageKey());
    }, []);

    const manageSelection = ({ key }) => {
        setSelected(key);
    };

    return (
        <Menu mode="inline" defaultSelectedKeys={[selected]} onSelect={manageSelection}>
            <Menu.Item key="Dashboard" icon={<HomeOutlined/>}>
                <Link to="/dashboard"/>
                Dashboard
            </Menu.Item>

            {
                isAuthenticated().user.isAdmin &&
                <SubMenu key="admin" icon={<ToolOutlined/>} title="Administration">
                    <Menu.Item key="admin-students" icon={<TeamOutlined/>}>
                        <Link to="/admin/students"/>
                        Students
                    </Menu.Item>

                    <Menu.Item key="admin-classes" icon={<ReadOutlined/>}>
                        <Link to="/admin/classes"/>
                        Classes
                    </Menu.Item>
                </SubMenu>
            }
            
            <Menu.Item key="settings" icon={<SettingOutlined/>}>
                <Link to="/settings"/>
                Settings
            </Menu.Item>
        </Menu>
    );
};

export default SidebarMenu;