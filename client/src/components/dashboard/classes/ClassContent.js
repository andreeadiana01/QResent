import React, { useState } from "react";
import GenerateQR from "./GenerateQR";
import Attendance from "../Attendance";
import { Tabs, Calendar, Button } from "antd";
import StudentsEnrolledTable from "../../administration/classes/StudentsEnrolledTable";

const { TabPane } = Tabs;

const ClassContent = (props) => {
    const [calendarVisibility, setCalendarVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(Date.now());

    const setDate = (value) => {
        setSelectedDate(value._d);
    }

    const toggleCalendarVisibility = () => {
        setCalendarVisibility(!calendarVisibility);
    }

    return (
        <div className="content">
            <Tabs>
                <TabPane tab="Students" key="1">
                    <StudentsEnrolledTable classId={props.classId}/>
                </TabPane>
                <TabPane tab="Attendance" key="2">
                    <div className="content" style={{'display': 'flex', 'flex-direction': 'row'}}>
                    <Button style={{'margin': '0 0.5rem'}} type="primary" onClick={toggleCalendarVisibility}>Open Calendar</Button>
                        {
                            calendarVisibility &&
                            <div className="site-calendar-demo-card">
                                <Calendar fullscreen={false} onSelect={setDate}/>
                            </div>
                        }
                        <GenerateQR classId={props.classId}/>
                    </div>
                    <Attendance classId={props.classId}/>
                </TabPane>
                <TabPane tab="Grading" key="3">
                    Content of tab 3
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ClassContent