import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import * as constants from "../../constants";

const AddStudentForm = () => {
    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const [error, setError] = useState({
        message: '',
        source: '',
    });

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


    return (
        <>
            <Form labelCol={{ span: 4, }} wrapperCol={{ span: 14, }} layout="horizontal"
                  initialValues={{
                      size: componentSize,
                  }}
                  onValuesChange={onFormLayoutChange}
                  size={componentSize}
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
            </Form>
        </>
    );
};

export default AddStudentForm;