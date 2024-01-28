"use client"
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton } from 'antd';

interface DataType {
    gender: string;
    name: string;
    email: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
}

const App: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('/candidates/fetch')
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

    return (
        <div
            id="scrollableDiv"
            style={{
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >

            <List
                dataSource={data}
                renderItem={(item) => (
                    <List.Item key={item.email}>
                        <List.Item.Meta
                            title={item.name}
                            description={item.email}
                        />
                        <div>Content</div>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default App;