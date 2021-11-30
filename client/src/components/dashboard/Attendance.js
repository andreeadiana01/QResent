import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, message, Popconfirm, Spin, Table, Typography } from "antd";
import AddStudentModal from "../administration/students/AddStudentModal";
import { departments, years, grades } from "../../constants";
import axios from "axios";

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0, }}
                           rules={[
                               {
                                   required: true,
                                   message: `Please Input ${title}!`,
                               },
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

const Attendance = (props) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [data, setData] = useState(students);
    const [courseId, setCourseId] = useState(1);

    const fetchAttendance = () => {
        // return axios.get(`/api/attendance/${props.classId}/${props.course}`, { headers: { 'Content-Type': 'application/json' } })
        //     .then((response) => {
        //         setStudents(response.data);
        //     });
    }

    // useEffect(() => {
    //     fetchAttendance().then(() => setLoading(false));
    // }, []);

    const isEditing = (record) => record.key === editingKey;
    const [modalVisibility, setModalVisibility] = useState(false);

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    }

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    function deleteStudent(record) {
        axios.delete(`/api/students/${record._id}`, { headers: { 'Content-Type': 'application/json' }})
            .then(() => {
                fetchAttendance().then(() => message.success('Student deleted'));
            });
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'fullName',
            width: '25%',
            editable: false,
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend'],
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
            editable: false,
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            href="javascript:"
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                          Save
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                          <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <Typography.Link onClick={() => deleteStudent(record)}>
                        Delete
                    </Typography.Link>
                );
            },
        },
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
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div className="content">
            {
                loading ?
                    <Spin size="large"/> :
                    <div>
                        <Form form={form} component={false}>
                            <Table
                                components={{
                                    body: {
                                        cell: EditableCell,
                                    },
                                }}
                                bordered
                                dataSource={students}
                                columns={mergedColumns}
                                rowClassName="editable-row"
                                pagination={{
                                    onChange: cancel,
                                    defaultPageSize: 20,
                                }}
                            />
                        </Form>

                        <AddStudentModal visible={modalVisibility} toggleModalVisibility={toggleModalVisibility}
                                         onOk={fetchAttendance}/>
                    </div>
            }
        </div>
    );
};

export default Attendance;