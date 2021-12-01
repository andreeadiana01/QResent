import React from 'react';
import { Layout } from 'antd';
import ContentHeader from './ContentHeader';
import Settings from '../../pages/Settings';
import StudentsTable from '../../administration/students/StudentsTable';
import ClassesList from '../../administration/classes/ClassesList';
import ClassesPage from '../classes/ClassesPage';
import StudentsEnrolledTable from '../../administration/classes/StudentsEnrolledTable';
import QRCode from '../qr/QRCode';
import ClassContent from '../classes/ClassContent';

const { Content } = Layout;

const ContentContainer = (props) => {
    return (
        <Content id="content-container">
            <ContentHeader title={props.title}/>

            <div id="content-div">
                {props.title === 'Dashboard' && <ClassesPage/>}
                {props.title === 'Manage students' && <StudentsTable/>}
                {props.title === 'Manage classes' && <ClassesList/>}
                {props.title === 'Generate QR' && <QRCode/>}
                {props.title === 'Settings' && <Settings/>}
                {props.adminClassId && <StudentsEnrolledTable classId={props.adminClassId}/>}
                {props.classId && <ClassContent classId={props.classId}/>}
            </div>
        </Content>
    );
};

export default ContentContainer;