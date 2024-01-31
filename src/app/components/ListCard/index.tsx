import { Badge, Button, Dropdown, Avatar, Popconfirm, List, Tooltip } from 'antd';
import { statusList, CandidateData } from '@/app/helpers';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Link from 'next/link'
import React, { cloneElement } from 'react';

const ListCard = ({ item, onCurrentStatusChange, idToShowLoader, onCandidateDeleteConfirm }:
    { item: CandidateData, onCurrentStatusChange: (e: { key: string }, id: number) => void, idToShowLoader: number, onCandidateDeleteConfirm: (id: number) => void }) => {
    const badgeColors = ['gold', 'orange', 'lime', 'green', 'red']
    const scoreColors = ['#C62828', '#AD1457', '#FFEB3B', '#FFC107', '#00E676', '#00C853']
    const items: MenuProps['items'] = statusList.map((status, index) => ({
        key: index,
        label: status,
        disabled: index === item.current_status,
    }))

    return (
        <Badge.Ribbon text={statusList[item.current_status]} color={badgeColors[item.current_status]}>
            <List.Item
                actions={[
                    <Link href={`/candidate/edit/${item.candidate_id}`}>Edit</Link>,
                    <Popconfirm
                        title={`Delete ${item.candidate_name}'s Data`}
                        description={`Are you sure you want to delete ${item.candidate_name}'s data?`}
                        onConfirm={e => onCandidateDeleteConfirm(item.candidate_id)}
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
            <List.Item >
                <div className='flex flex-row gap-32'>
                    <div>
                        Score:&nbsp;&nbsp;
                        <Avatar style={{ backgroundColor: `${scoreColors[item.score - 1]}` }} >{item.score}</Avatar>
                    </div>
                    <div>Expected Salary: &nbsp;&nbsp;{new Intl.NumberFormat('en-IN').format(item.expected_salary)}</div>
                </div>
            </List.Item>
            <List.Item>
                <div className='flex flex-row gap-2'>
                    Current Status:
                    <Dropdown.Button
                        menu={{ items, onClick: (e) => onCurrentStatusChange(e, item.candidate_id) }}
                        buttonsRender={([leftButton]) => [
                            <Tooltip title="tooltip" key="leftButton">
                                {leftButton}
                            </Tooltip>,
                            cloneElement(
                                <Button>
                                    <DownOutlined />
                                </Button>, { loading: item.candidate_id === idToShowLoader }),
                        ]}
                    >
                        {statusList[item.current_status]}
                    </Dropdown.Button>
                </div>
            </List.Item>
        </Badge.Ribbon>
    )
}

export default ListCard;