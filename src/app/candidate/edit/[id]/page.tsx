"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import Form from '@/app/components/Form'
import { message } from 'antd';
import { statusList } from '@/app/helpers';



const App: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const router = useParams()
    const { id } = router
    const [data, setData] = useState();

    useEffect(() => {
        fetch(`/candidate/edit/fetch?id=${id}`)
            .then((res) => res.json())
            .then((body) => {
                const { phone } = body.candidate
                body.candidate.phone = phone.split(' ')[1];
                body.candidate.prefix = phone.split(' ')[0];
                body.candidate.current_status = statusList[Number(body.candidate.current_status)]
                setData(body.candidate);
            })
    }, []);

    const onSubmit = (values: any) => {
        values.id = id
        fetch('/candidate/edit/submit', { method: "PUT", body: JSON.stringify(values) })
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
        <Form formData={data} onSubmit={onSubmit} />
    )
};

export default App;