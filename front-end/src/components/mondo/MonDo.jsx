import React, { useEffect, useState } from 'react'
import { useData } from '../../context/AppContext'
import { Image, Tag, Row, Col, Card, Space, Table, Button, Avatar, message } from 'antd'
import ThemMonDoModal from './ThemMonDoModal'
import { BACK_END_URL } from '../../context/const'

const MonDo = () => {

    const { user, monDo, fetchMonDo } = useData()

    useEffect(() => {
        fetchMonDo(user[0].id)
    }, [])

    const columns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (item) => {
                return <Image style={{borderRadius: '50%'}} width={50} height={50} sizes='small' src={item}></Image>
            },
            width: "10%"

        },
        {
            title: 'Tên món đồ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            render: (item) => {
                if(item === 0) return <Tag color='purple'>Thực phẩm</Tag>
                return <Tag color='orange'>Món ăn</Tag>
            }
        },
        {
            title: 'Thao tác',
            render: (text, record) => (
              <div onClick={e => e.stopPropagation()}>
                    <Button size='small' onClick={() => handleDelete(record.id)} style={{marginLeft: 5}} type='danger'>Xóa</Button>
              </div>
            ),
        }
    ]

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const res = await fetch(`${BACK_END_URL}food/delete/${id}`)
            const data = await res.json()
            if(data.success === true){
                fetchMonDo(user[0].id)
                message.success('Xóa thành công')
            }
        } catch (error) {
            message.warning('Thất bại', error.message)
        }
    }

    const [addModalVisible, setAddModalVisible] = useState(false);
    const handleAdd = () => {
    setAddModalVisible(true);
    };

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title="Danh sách các món đồ"
                    extra={
                        <Space>
                            <Space>
                              <Button type="primary" onClick={handleAdd}>Thêm món đồ</Button>
                            </Space>
                        </Space>
                    }>
                    <Table 
                        pagination={false} 
                        columns={columns} 
                        dataSource={monDo}
                        className="ant-border-space"
                    />
                    </Card>
                </Col>
                { addModalVisible && <ThemMonDoModal 
                  editModalVisible={addModalVisible}
                  setEditModalVisible={setAddModalVisible}
                />}
            </Row>
        </div>
    )
}

export default MonDo