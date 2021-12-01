import React from 'react';
import { Button, Form, Input, Modal, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const GradingModal = (props) => {
    return (
        <Modal title="Please scan QR" visible={props.visible} onCancel={props.toggleModalVisibility}
               destroyOnClose={true}
               footer={[
                   <Button key="back" onClick={props.toggleModalVisibility}>
                       Cancel
                   </Button>
               ]}>

            <Form name="dynamic_form_nest_item" onFinish={props.onFinish} autoComplete="off">
                <Form.List name="grading">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} style={{ display: 'flex' }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'criteria']}
                                        fieldKey={[fieldKey, 'criteria']}
                                        rules={[{ required: true, message: 'Missing criteria' }]}
                                    >
                                        <Input placeholder="Grading criteria"/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'points']}
                                        fieldKey={[fieldKey, 'points']}
                                        rules={[{ required: true, message: 'Missing points' }]}
                                    >
                                        <Input placeholder="Points"/>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default GradingModal;