"use client"
import React, { useEffect, useState } from 'react';
import { message, List, Skeleton } from 'antd';
import ListCard from "@/app/components/ListCard";
import { CandidateData } from '@/app/helpers';


const App: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<CandidateData[]>([]);
    const [idToShowLoader, setIdToShowLoader] = useState(-1)

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

    const [messageApi, contextHolder] = message.useMessage();


    const onCurrentStatusChange = (e: { key: string }, id: number) => {
        setIdToShowLoader(id)
        fetch('/candidate/edit/status', {
            method: 'PUT',
            body: JSON.stringify({
                id,
                current_status: e.key,
            }),
        }).then(async res => {
            const body = await res.json()
            switch (res.status) {
                case 200:
                    messageApi.open({
                        type: 'success',
                        content: body.message,
                    });
                    const objIndex = data.findIndex(obj => obj.candidate_id === id);
                    const updatedState = [
                        ...data.slice(0, objIndex),
                        body.updated_data,
                        ...data.slice(objIndex + 1),
                    ];
                    setData(updatedState);
                    break;
                case 400:
                    messageApi.open({
                        type: 'error',
                        content: body.message,
                    });
                    break;
            }
            setIdToShowLoader(-1)
        })
            .catch((e) => {
                console.log(e)
                messageApi.open({
                    type: 'error',
                    content: 'Something went wrong',
                });
                setIdToShowLoader(-1)
            });
    };

    const onCandidateDeleteConfirm = (id: number) => {
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
                    const objIndex = data.findIndex(obj => obj.candidate_id === id);
                    const updatedState = [
                        ...data.slice(0, objIndex),
                        ...data.slice(objIndex + 1),
                    ];
                    setData(updatedState);
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
            <Skeleton active loading={loading} >
                <List
                    pagination={{ position: 'bottom', align: 'center', pageSize: 10 }}
                    dataSource={data}
                    renderItem={(item) => <ListCard item={item} onCurrentStatusChange={onCurrentStatusChange} idToShowLoader={idToShowLoader} onCandidateDeleteConfirm={onCandidateDeleteConfirm} />}
                />
            </Skeleton>

        </div >
    );
};

export default App;