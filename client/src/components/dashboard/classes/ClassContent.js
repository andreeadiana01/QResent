import React from 'react';
import { Tabs } from 'antd';
import StudentsEnrolledTable from '../../administration/classes/StudentsEnrolledTable';
import Attendance from '../attendance/Attendance';

const { TabPane } = Tabs;

const ClassContent = (props) => {
    return (
        <div className="content">
            <Tabs defaultActiveKey="2">
                <TabPane tab="Students" key="1">
                    <StudentsEnrolledTable classId={props.classId}/>
                </TabPane>
                <TabPane tab="Attendance" key="2">
                    <Attendance classId={props.classId}/>
                </TabPane>
                <TabPane tab="Info" key="3">
                    Content of tab 3
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ClassContent;