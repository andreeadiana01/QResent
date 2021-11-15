import React from 'react';
import { Layout } from 'antd';
import ContentHeader from './ContentHeader';
import Settings from "../pages/Settings";
import StudentsTable from "../administration/StudentsTable";

const { Content } = Layout;

const ContentContainer = (props) => {
    return (
        <Content id="content-container">
            <ContentHeader title={props.title}/>

            <div id="content-div">
                {/*{props.title === 'Dashboard' && </>}*/}
                {props.title === 'Manage students' && <StudentsTable />}
                {/*{props.title === 'Manage classes' && </>}*/}
                {/*{props.title === 'Classes' && </>}*/}
                {props.title === 'Settings' && <Settings/>}
            </div>

        </Content>
    );
};

export default ContentContainer;