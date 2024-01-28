"use client"

import React from 'react';
import { Button, Select, Form, Input } from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};



type FieldType = {
    name?: string;
    password?: string;
    remember?: string;
};
const { Option } = Select;

const App: React.FC = () => {
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    const validateMessages = {
        required: 'Please enter ${label}!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        }
    };
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            validateMessages={validateMessages}
        >
            <Form.Item<FieldType>
                label="Candidate Name"
                name="name"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item name={['user', 'email']} label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, min: 8, max: 15 }]}
            >
                <Input type='number' addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="salary" label="Expected Salary" rules={[{ required: true, type: "number" }]}>
                <Input type='number' />
            </Form.Item>
            <Form.Item label="Current Status">
                <Select>
                    <Select.Option value="0">Contacted</Select.Option>
                    <Select.Option value="1">Interview Scheduled</Select.Option>
                    <Select.Option value="2">Offer Extended</Select.Option>
                    <Select.Option value="3">Hired</Select.Option>
                    <Select.Option value="4">Rejected</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form >
    )
};

export default App;