import React from 'react';
import { Layout } from 'antd';
import ContentHeader from './ContentHeader';
import Settings from "../pages/Settings";
import StudentsTable from "../administration/StudentsTable";
import ClassesPage from "./ClassesPage";

const { Content } = Layout;

const ContentContainer = (props) => {
    return (
        <Content id="content-container">
            <ContentHeader title={props.title}/>

            <div id="content-div">
                {props.title === 'Dashboard' && <ClassesPage/>}
                {props.title === 'Manage students' && <StudentsTable/>}
                {/*{props.title === 'Manage classes' && </>}*/}
                {props.title === 'Settings' && <Settings/>}
            </div>

        </Content>
    );
};

export default ContentContainer;