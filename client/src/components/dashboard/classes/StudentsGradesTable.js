import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Spin, Table } from 'antd';
import { grades } from '../../../constants';
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

const StudentsGradesTable = () => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [data, setData] = useState(students);

    const fetchStudents = () => {
        return axios.get('/api/students', { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                setStudents(response.data);
            });
    };

    useEffect(() => {
        fetchStudents().then(() => setLoading(false));
    }, []);

    const isEditing = (record) => record.key === editingKey;
    const [modalVisibility, setModalVisibility] = useState(false);

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record
        });
        setEditingKey(record.key);
    };

    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    };

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
                    </div>
            }
        </div>
    );
};

export default StudentsGradesTable;