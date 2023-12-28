import React, {useEffect, useState} from 'react'
import { Card, Table, Row, Col, Button, Input, Modal, Descriptions, Tag, Space, message, Popconfirm, Avatar, DatePicker } from 'antd';
import { useData } from '../../context/AppContext';
import ThemThanhVienModal from './ThemThanhVienModal';
import { BACK_END_URL } from '../../context/const';
import DiCho from '../dicho/DiCho';
import moment from 'moment'
import MuaDiChoModal from '../dicho/MuaDiChoModal';

const NhomChiTiet = (props) => {
    const { id } = props.match.params;
    const {user, group, fetchNhom, diChoShare, fetchDiChoShare} = useData()
    const members = group.find(i => i.id == id)?.members
    const columnMembers = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: '30%'
        },
        {
            title: 'Vai trò',
            render: item => {
                if(item.isLeader) return <Tag color='green'>trưởng nhóm</Tag>
                return <Tag color='blue'>thành viên</Tag>
            },
            width: '10%'
        },
        {
            title: 'Thao tác',
            render: (text, record) => 
                {
                    const ans = (<div onClick={e => e.stopPropagation()}>
                                    <Popconfirm
                                        title="Xóa thành viên"
                                        description="Bạn có chắc chắn muốn xóa"
                                        okText="OK"
                                        cancelText="NO"
                                    >
                                        <Button onClick={() => handleDeleteThanhVien(record.id, parseInt(id))} size='small' style={{marginLeft: 5}} type='danger'>Xóa</Button>
                                    </Popconfirm>
                                </div>)
                    const idLeader = members.filter(item => item.isLeader)[0]?.id
                    if(idLeader === user[0]?.id && record.id !== idLeader) return ans
                    else return <></>
                },
          }
    ]

    const handleDeleteThanhVien = async (idUser, idGroup) => {
        try {
            const options = {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({idUser, idGroup})
            }
            const res = await fetch(`${BACK_END_URL}member/delete`, options)
            const data = await res.json()
            if(data.success === true){
                fetchNhom()
                message.success('Xóa thành công')
            }else {
                message.warning('Xóa thất bại')
            }
        } catch (error) {
            message.warning("lỗi: " + error.message)
        }
    }

    const columnsShare = [
        {
            title: 'Món đồ',
            dataIndex: 'food',
            key: 'food',
            render: (item) => {
                return <Space direction='horizontal'>
                    <Avatar src={item.image}></Avatar>
                    <span>{item.name}</span>
                </Space>
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: "8%"
        },
        {
            title: 'Ngày phải mua',
            dataIndex: 'dateToBuy',
            key: 'dateToBuy',
            render: item => moment(item).format("YYYY-MM-DD")
        },
        {
            title: 'Ngày mua',
            dataIndex: 'dateBought',
            key: 'dateBought',
            render: item => item ? moment(item).format("YYYY-MM-DD") : <Tag color='default'>Chưa có</Tag>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'state',
            key: 'state',
            render: item => {
                if(item === 0) return <Tag color='orange'>Chưa mua</Tag>
                if(item === 1) return <Tag color='green'>Đã mua</Tag>
                return ""
            }
        },
        {
            title: 'Người mua',
            dataIndex: 'userBought',
            key: 'userBought',
            render: item => {
                if(item.id === null) return <Tag color='default'>Chưa có</Tag>
                if(item.id === user[0]?.id) return "Tôi"
                return item.username
            }
        },
        {
            title: 'Thao tác',
            render: (text, record) => {
                if(record.state === 0) return (
                        <div onClick={e => e.stopPropagation()}>
                            <Button onClick={() => handleMua(record.id)} size='small' style={{marginLeft: 5}} type='primary'>Mua</Button>
                        </div>)
                return (<div onClick={e => e.stopPropagation()}>
                            <Button disabled onClick={() => handleMua(record.id)} size='small' style={{marginLeft: 5}} type='primary'>Mua</Button>
                        </div>)
            },
        },
    ]

    const [addThanhVienModalVisible, setAddThanhVienModalVisible] = useState(false);
    const handleAddThanhVien = () => {
        setAddThanhVienModalVisible(true);
    };

    const [muaModalVisible, setMuaModalVisible] = useState(false);
    const [selectedMarket, setSelectedMarket] = useState(null);
    const handleMua = (idMarket) => {
        setSelectedMarket(idMarket)
        setMuaModalVisible(true);
    };

    useEffect(() => {
        fetchDiChoShare(parseInt(id))
    }, [])

    const [selectedDate, setSelectedDate] = useState(moment());
    const filteredData = diChoShare.filter((item) => {
        const itemDate = moment(item.dateToBuy);
        return selectedDate ? itemDate.isSame(selectedDate, 'day') : true;
      });

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs={24} xl={17}>
                <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title={<>Danh sách chia sẻ các món đồ cần mua <DatePicker
                        value={selectedDate} 
                        onChange={(date) => setSelectedDate(date)}
                        /></>}
                    extra={
                        <Space>
                            <Space>
                              {/* <Button type="primary" onClick={handleAdd}>Thêm</Button> */}
                            </Space>
                        </Space>
                    }>
                    <Table 
                        pagination={false} 
                        columns={columnsShare} 
                        dataSource={filteredData}
                        className="ant-border-space"
                    />
                    </Card>
                </Col>
                <Col xs="24" xl={7}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Thành viên"
                        extra={
                            <Space>
                                <Space>
                                    <Button type="primary" onClick={handleAddThanhVien}>Thêm thành viên</Button>
                                </Space>
                            </Space>
                        }>
                        <Table 
                            pagination={false} 
                            columns={columnMembers} 
                            dataSource={members}
                            className="ant-border-space"
                        />
                    </Card>
                    { addThanhVienModalVisible && <ThemThanhVienModal 
                        editModalVisible={addThanhVienModalVisible}
                        setEditModalVisible={setAddThanhVienModalVisible}
                        idGroup={id}
                        />}
                    { muaModalVisible && <MuaDiChoModal 
                        editModalVisible={muaModalVisible}
                        setEditModalVisible={setMuaModalVisible}
                        selectedMarket={selectedMarket}
                    />}
                </Col>
            </Row>
        </div>    
    )
}

export default NhomChiTiet