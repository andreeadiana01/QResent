import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import axios from 'axios';

const AddClassForm = (props) => {
    const [componentSize, setComponentSize] = useState('default');
    const [loading, setLoading] = useState(true);
    const [teachers, setTeachers] = useState([]);
    const [form] = Form.useForm();

    const fetchTeachers = () => {
        return axios.get('/api/teachers/', { headers: { 'Content-Type': 'application/json' } })
            .then(response => setTeachers(response.data));
    };

    useEffect(() => {
        fetchTeachers().then(() => setLoading(false));
    }, []);

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const requiredRule = (field) => ({
        required: true,
        message: `Please insert the ${field}!`
    });

    const handleError = (err) => {
        form.resetFields();
        message.error(err.message);
    };

    function addClass(values) {
        const data = JSON.stringify(values);

        axios.post('/api/classes/', data, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                if (response.status === 200) {
                    message.success('Class added!');
                    form.resetFields();
                    props.onAdd();
                }
            })
            .catch(err => handleError(err));
    }

    return (
        <div>
            <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal"
                  initialValues={{
                      size: componentSize
                  }}
                  onValuesChange={onFormLayoutChange}
                  size={componentSize}
                  onFinish={addClass}
            >

                <Form.Item label="Name" name="name" rules={[requiredRule('name')]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Alias" name="alias" rules={[requiredRule('alias')]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Teacher" name="teacherId" rules={[requiredRule('department')]}>
                    <Select>
                        {
                            loading ?
                                <Select.Option value="wait">Please wait...</Select.Option> :
                                teachers.map((teacher) =>
                                    <Select.Option value={teacher._id}>{teacher.fullName}</Select.Option>
                                )
                        }
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddClassForm;