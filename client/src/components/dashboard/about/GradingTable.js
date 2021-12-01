import React, { useState } from 'react';
import { Form, Input, InputNumber, Table } from 'antd';

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

const GradingTable = (props) => {
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;

    const cancel = () => {
        setEditingKey('');
    };

    const columns = [
        {
            title: 'Criteria',
            dataIndex: 'criteria',
            width: '50%',
            editable: true,
            sortDirections: ['ascend']
        },
        {
            title: 'Points',
            dataIndex: 'points',
            width: '50%',
            editable: true
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
            <Table
                components={{
                    body: {
                        cell: EditableCell
                    }
                }}
                bordered
                dataSource={props.grading}
                columns={mergedColumns}
                rowClassName="editable-row"
            />
        </div>
    );
};

export default GradingTable;