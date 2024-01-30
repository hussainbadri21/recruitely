"use client"
import Form from '@/app/components/Form'
import { message } from 'antd';

const App: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const onSubmit = (values: any) => {
        fetch('/candidate/add/submit', { method: "POST", body: JSON.stringify(values) })
            .then(async res => {
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
                console.log(e)
                messageApi.open({
                    type: 'error',
                    content: 'Something went wrong',
                });
            });
    };
    return (
        <>
            {contextHolder}
            <Form onSubmit={onSubmit} />
        </>
    )
};

export default App