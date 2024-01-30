"use client"
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Badge, Button, message, Popconfirm, List, Skeleton } from 'antd';
import Link from 'next/link'
import { getCurrentStatus, CandidateData } from '@/app/helpers';

const App: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<CandidateData[]>([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('/candidate/fetch')
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.candidates]);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });

    };

    useEffect(() => {
        loadMoreData();
    }, []);

    const badgeColors = ['gold', 'orange', 'lime', 'green', 'red']
    const [messageApi, contextHolder] = message.useMessage();

    const confirm = (id: number) => {
        fetch(`/candidate/delete`, {
            method: 'DELETE',
            body: JSON.stringify({
                id: id
            })
        }).then(async res => {
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
        <div
            id="scrollableDiv"
            className="overflow-auto px-4 p-0 border border-solid border-gray-400 border-opacity-35"
        >
            {contextHolder}
            <List
                dataSource={data}
                renderItem={(item) => (
                    <Badge.Ribbon text={getCurrentStatus(item.current_status)} color={badgeColors[item.current_status]}>
                        <List.Item
                            actions={[
                                <Link href={`/candidate/edit/${item.candidate_id}`}>Edit</Link>,
                                <Popconfirm
                                    title={`Delete ${item.candidate_name}'s Data`}
                                    description={`Are you sure you want to delete ${item.candidate_name}'s data?`}
                                    onConfirm={e => confirm(item.candidate_id)}
                                    okText="Yes"
                                >
                                    <Button type="text" danger>Delete</Button>
                                </Popconfirm>]}
                        >
                            <List.Item.Meta
                                title={item.candidate_name}
                                description={
                                    <div className='flex flex-col gap-2'>
                                        <a href={`mailto:${item.email}`}>{item.email}</a>
                                        <a href={`tel:${item.phone}`}>{item.phone}</a>
                                    </div>}
                            />

                        </List.Item>
                    </Badge.Ribbon>
                )}
            />
        </div>
    );
};

export default App;