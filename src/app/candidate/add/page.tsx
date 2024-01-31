"use client"
import Form from '@/app/components/Form'
import { message } from 'antd';
import { useState } from 'react';


const App: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)

    const onSubmit = (values: any) => {
        setLoading(true);
        fetch('/candidate/add/submit', { method: "POST", body: JSON.stringify(values) })
            .then(async res => {
                setLoading(false);
                const body = await res.json()
                switch (res.status) {
                    case 200:
                        messageApi.open({
                            type: 'success',
                            content: body.message,
                        });
                        window.location.href = '/'
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
                console.log(e);
                setLoading(false);
                messageApi.open({
                    type: 'error',
                    content: 'Something went wrong',
                });
            });
    };
    return (
        <>
            {contextHolder}
            <Form onSubmit={onSubmit} loading={loading} />
        </>
    )
};

export default App