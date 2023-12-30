import React, { useEffect, useState } from 'react'
import { Image, Tag, Row, Col, Card, Space, Table, Button, Avatar, Input, DatePicker, message } from 'antd'
import { useData } from '../../context/AppContext'
import AddUserModal from './AddUserModal'
import UpdateUserModal from './UpdateUserModal'
import { BACK_END_URL } from '../../context/const'

const Admin = () => {
    const {userNormal, fetchUserNormal} = useData()
    useEffect(() => {
        fetchUserNormal()
    }, [])

    const columns = [
        {
            title: 'Tên đăng nhập',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Loại acc',
            dataIndex: 'role',
            key: 'role',
            render: (item) => {
                if(item === 0) return <Tag color='blue'>dân thường</Tag>
                return <Tag color='red'>admin</Tag>
            }
        },
        {
            title: 'Thao tác',
            render: (text, record) => (
                <div onClick={e => e.stopPropagation()}>
                      <Button onClick={() => handleUpdate(record)} size='small' style={{marginRight: 5}} type='primary'>Sửa</Button>
                      <Button onClick={() => handleDelete(record.id)} size='small' style={{marginRight: 5}} type='danger'>Xóa</Button>
                </div>
              ),
        },
    ]

    const [addModalVisible, setAddModalVisible] = useState(false);
    const handleAdd = () => {
    setAddModalVisible(true);
    };

    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [selectedMarket, setSelectedMarket] = useState(null);
    const handleUpdate = (data) => {
        setSelectedMarket(data)
        setUpdateModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${BACK_END_URL}admin/account/delete/${id}`)
            const data = await res.json()
            if(data.success) {
                fetchUserNormal()
                message.success("Xóa thành công")
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title={"Danh sách tài khoản"}
                    extra={
                        <Space>
                            <Space>
                              <Button type="primary" onClick={handleAdd}>Thêm</Button>
                            </Space>
                        </Space>
                    }>
                    <Table 
                        pagination={false} 
                        columns={columns} 
                        dataSource={userNormal}
                        className="ant-border-space"
                    />
                    </Card>
                </Col>
                { addModalVisible && <AddUserModal 
                  editModalVisible={addModalVisible}
                  setEditModalVisible={setAddModalVisible}
                />}
                { updateModalVisible && <UpdateUserModal 
                  editModalVisible={updateModalVisible}
                  setEditModalVisible={setUpdateModalVisible}
                  selectedMarket={selectedMarket}
                />}
            </Row>
        </div>
    )
}

export default Admin