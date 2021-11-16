import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    message,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import * as constants from "../../constants";
import axios from "axios";

let formValues = {};

const AddStudentForm = () => {
    const [componentSize, setComponentSize] = useState('default');
    const [form] = Form.useForm();

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const requiredRule = (field) => ({
        required: true,
        message: `Please insert the ${field}!`,
    });

    const patternRule = {
        type: 'email',
        message: 'The input is not a valid email address!',
    };

    const [validationState, setValidationState] = useState({
        validateStatus: undefined,
        help: null,
    });

    const removeValidationState = () => {
        setValidationState({
            validateStatus: undefined,
            help: null,
        });
    };

    const handleError = (err) => {
        form.resetFields();
        message.error(err.message);
    };

    const auth = (values) => {
        const data = JSON.stringify(values);
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        formValues = values;

        axios.post('/api/students/', data, config)
            .then(response => {
                if (response.status === 200) {
                    message.success('An activation link has been sent to your email address!');
                    form.resetFields();
                }
            })
            .catch(err => handleError(err));
    }


    return (
        <>
            <Form form={form} labelCol={{ span: 4, }} wrapperCol={{ span: 14, }} layout="horizontal"
                  initialValues={{
                      size: componentSize,
                  }}
                  onValuesChange={onFormLayoutChange}
                  size={componentSize}
                  onFinish={auth}
            >

                <Form.Item label="First Name" name="firstName" rules={[requiredRule("first name")]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Last Name" name="lastName" rules={[requiredRule("last name")]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Email" name="email"
                           rules={[requiredRule("email"), patternRule]}
                           validateStatus={validationState.validateStatus}
                           help={validationState.help}>
                    <Input onChange={removeValidationState}/>
                </Form.Item>
                <Form.Item label="Department" name="department" rules={[requiredRule("department")]}>
                    <Select>
                        {constants.departments.map((department) => <Select.Option
                            value={department}>{department}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Year" name="year" rules={[requiredRule("year")]}>
                    <Select>
                        {constants.years.map((year) => <Select.Option value={year}>{year}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Grade" name="grade" rules={[requiredRule("grade")]}>
                    <Select>
                        {constants.grades.map((grade) => <Select.Option value={grade}>{grade}</Select.Option>)}
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddStudentForm;