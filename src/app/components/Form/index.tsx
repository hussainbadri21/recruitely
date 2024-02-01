import { Button, Select, Form, Input, Slider } from 'antd';
import { useEffect, FC, useState } from 'react';
import { getScore, CandidateData, statusList } from '@/app/helpers'


const CandidateForm: FC<{ formData?: CandidateData, onSubmit: (values: any) => void, loading: boolean }> = ({ formData, onSubmit, loading }) => {
    const { Option } = Select;
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



    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select className='w-[70px]'>
                <Option value="+91">+91</Option>
                <Option value="+1">+1</Option>
            </Select>
        </Form.Item>
    );
    const [form] = Form.useForm()

    const [score, setScore] = useState(0)


    useEffect(() => {
        form.setFieldsValue(formData)
        setScore(getScore(formData?.skills?.node ?? 0) + getScore(formData?.skills?.react ?? 0))
    }, [form, formData])


    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            className='max-w-[600px]'
            initialValues={formData}
            onFinish={onSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            validateMessages={validateMessages}
            form={form}
        >
            <Form.Item
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
                <Input type='number' addonBefore={prefixSelector} className='w-full' />
            </Form.Item>
            <Form.Item name={['skills', 'react']}
                label="Experience in React">
                <Slider step={1 / 12} min={0} max={40} tooltip={{ formatter }} onChange={(value) => setScore(getScore(Number(form.getFieldValue(['skills', 'node']) || 0)) + getScore(value))} />
            </Form.Item>
            <Form.Item name={['skills', 'node']}
                label="Experience in NodeJS">
                <Slider step={1 / 12} min={0} max={40} tooltip={{ formatter }} onChange={(value) => setScore(getScore(Number(form.getFieldValue(['skills', 'react']) || 0)) + getScore(value))} />
            </Form.Item>
            <Form.Item name="expected_salary" label="Expected Salary" rules={[{ required: true }]}>
                <Input type='number' />
            </Form.Item>
            <Form.Item name="current_status" label="Current Status" rules={[{ required: true }]}>
                <Select placeholder="Select current status">
                    {statusList.map((status: string, index: number) => <Option key={index} value={index}>{status}</Option>)}
                </Select>
            </Form.Item>
            <div className='ml-4 mb-8 sm:ml-24'>{`Score : ${score} / 6`}</div>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button loading={loading} type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form >
    )
};

export default CandidateForm