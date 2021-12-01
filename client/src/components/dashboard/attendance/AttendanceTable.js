import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, message, Popconfirm, Spin, Table, Typography } from 'antd';
import AddStudentModal from '../../administration/students/AddStudentModal';
import { departments, grades, years } from '../../../constants';
import axios from 'axios';

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0 }}
                           rules={[
                               {
                                   required: true,
                                   message: `Please Input ${title}!`
                               }
                           ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const AttendanceTable = (props) => {
    const [form] = Form.useForm();

    const columns = [
        {
            title: 'Name',
            dataIndex: 'studentName',
            width: '25%',
            editable: false,
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend']
        },
        {
            title: 'Department',
            dataIndex: 'department',
            width: '10%',
            editable: true,
            filters: departments.map((department) => ({ text: department, value: department })),
            sorter: (a, b) => a.department.localeCompare(b.department),
            onFilter: (value, record) => record.department === value
        },
        {
            title: 'Year',
            dataIndex: 'year',
            width: '10%',
            editable: true,
            filters: years.map((year) => ({ text: year, value: year })),
            sorter: (a, b) => a.year - b.year,
            onFilter: (value, record) => record.year === value
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            width: '10%',
            editable: true,
            filters: grades.map((grade) => ({ text: grade, value: grade })),
            sorter: (a, b) => a.grade.localeCompare(b.grade),
            onFilter: (value, record) => record.grade === value
        }
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title
            })
        };
    });

    return (
        <div>
            {
                props.loading ?
                    <Spin size="large"/> :
                    <div>
                        <Form form={form} component={false}>
                            <Table
                                components={{
                                    body: {
                                        cell: EditableCell
                                    }
                                }}
                                bordered
                                dataSource={props.students}
                                columns={mergedColumns}
                                rowClassName="editable-row"
                                pagination={{
                                    defaultPageSize: 20
                                }}
                            />
                        </Form>
                    </div>
            }
        </div>
    );
};

export default AttendanceTable;