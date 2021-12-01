import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Spin, Table, Typography } from 'antd';
import axios from 'axios';
import { departments, grades, years } from '../../../constants';
import SelectStudentsModal from './SelectStudentsModal';
import { isAuthenticated } from '../../../auth';

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

const StudentsEnrolledTable = (props) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);

    const fetchStudents = () => {
        return axios.get(`/api/classes/${props.classId}/students`, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                setStudents(response.data);
            });
    };


    useEffect(() => {
        fetchStudents().then(() => setLoading(false));
    }, []);

    const isEditing = (record) => record.key === editingKey;
    const [modalVisibility, setModalVisibility] = useState(false);

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    };

    const cancel = () => {
        setEditingKey('');
    };

    function unenrollStudent(record) {
        axios.delete(`/api/classes/${props.classId}/students/${record._id}`)
            .then(() => fetchStudents().then(() => message.success('Student unenrolled!')));
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'fullName',
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
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '20%',
            editable: false
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <Typography.Link onClick={() => unenrollStudent(record)}>
                        Remove
                    </Typography.Link>
                );
            }
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
                title: col.title,
                editing: isEditing(record)
            })
        };
    });

    return (
        <div className="content">
            {
                loading ?
                    <Spin size="large"/> :
                    <div>
                        <Button onClick={toggleModalVisibility} type="primary"
                                style={{
                                    marginBottom: 16
                                }}
                        >
                            Add students
                        </Button>
                        <Form form={form} component={false}>
                            <Table
                                components={{
                                    body: {
                                        cell: EditableCell
                                    }
                                }}
                                bordered
                                dataSource={students}
                                columns={mergedColumns}
                                rowClassName="editable-row"
                                pagination={{
                                    onChange: cancel,
                                    defaultPageSize: 20
                                }}
                            />
                        </Form>

                        <SelectStudentsModal visible={modalVisibility} toggleModalVisibility={toggleModalVisibility}
                                             onOk={fetchStudents} classId={props.classId} updateTable={fetchStudents}/>
                    </div>
            }
        </div>
    );
};

export default StudentsEnrolledTable;