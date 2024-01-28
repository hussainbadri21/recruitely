"use client"

import React from 'react';
import { Button, Select, Form, Input, Slider, message } from 'antd';


type FieldType = {
    candidate_name?: string;
};
const { Option } = Select;

const App: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values: any) => {
        fetch('/candidates/add/submit', { method: "POST", body: JSON.stringify(values) })
            .then(async res => {
                const body = await res.json()
                switch (res.status) {
                    case 200:

                        messageApi.open({
                            type: 'success',
                            content: body.message,
                        });
                        window.location.href = '/candidates'
                        break;
                    case 400:
                        messageApi.open({
                            type: 'error',
                            content: body.message,
                        });
                        break;
                }
            })
            .catch((e) => {
                console.log(e)
                messageApi.open({
                    type: 'error',
                    content: 'Something went wrong',
                });
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="91">+91</Option>
                <Option value="1">+1</Option>
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
    const formatter = (value: number | undefined) => {
        value = value || 0
        let months = Math.round(value * 12)
        return months >= 12 ?
            `${parseInt((months / 12).toString())} years ${months % 12 > 0 ? `${(months % 12)} months` : ''}` :
            `${months} months`
    };


    return (
        <>
            {contextHolder}
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
                    name="candidate_name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name='email' label="Email"
                    rules={[{ required: true, type: 'email' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, min: 8, max: 15 }]}
                >
                    <Input type='number' addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name={['skills', 'react']}
                    label="Experience in React">
                    <Slider step={0.1} min={0} max={40} tooltip={{ formatter }} />
                </Form.Item>
                <Form.Item name={['skills', 'node']}
                    label="Experience in NodeJS">
                    <Slider step={1 / 12} min={0} max={40} tooltip={{ formatter }} />
                </Form.Item>
                <Form.Item name="expected_salary" label="Expected Salary" rules={[{ required: true }]}>
                    <Input type='number' />
                </Form.Item>

                <Form.Item name="current_status" label="Current Status" rules={[{ required: true }]}>
                    <Select placeholder="Select current status">
                        <Option value="0">Contacted</Option>
                        <Option value="1">Interview Scheduled</Option>
                        <Option value="2">Offer Extended</Option>
                        <Option value="3">Hired</Option>
                        <Option value="4">Rejected</Option>
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form >
        </>
    )
};

export default App