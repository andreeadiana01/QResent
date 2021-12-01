import React from 'react';
import { Tabs } from 'antd';
import StudentsEnrolledTable from '../../administration/classes/StudentsEnrolledTable';
import Attendance from '../attendance/Attendance';
import About from '../about/About';
import { isAuthenticated } from '../../../auth';

const { TabPane } = Tabs;

const ClassContent = (props) => {

    const isTeacher = () => {
        return isAuthenticated().user.role === 'TEACHER';
    };

    return (
        <div className="content">
            <Tabs defaultActiveKey="2">
                {
                    isTeacher() &&
                    <TabPane tab="Students" key="1">
                        <StudentsEnrolledTable classId={props.classId}/>
                    </TabPane>
                }

                <TabPane tab="Attendance" key="2">
                    <Attendance classId={props.classId}/>
                </TabPane>
                <TabPane tab="About" key="3">
                    <About classId={props.classId}/>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ClassContent;