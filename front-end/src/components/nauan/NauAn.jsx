import React, { useEffect, useState } from 'react'
import { useData } from '../../context/AppContext'
import { Image, Tag, Row, Col, Card, Space, Table, Button, Avatar, DatePicker, message } from 'antd'
import moment from 'moment'
import { BACK_END_URL } from '../../context/const'

const NauAn = () => {
    const { user, nauAn, congThuc, fetchNauAn, fetchCongThuc, fetchKho, kho } = useData()

    useEffect(() => {
        fetchNauAn(user.id)
        fetchCongThuc(user.id)
        fetchKho(user.id)
    }, [])

    const columns = [
        {
            title: 'Món ăn',
            dataIndex: 'idRecipe',
            key: 'idRecipe',
            render: item => {
                if(congThuc.length !== 0){
                    const food = congThuc.find(i => i.id === item).food
                    return <Space direction='horizontal'>
                                <Avatar src={food.image}></Avatar>
                                <span>{food.name}</span>
                            </Space>
                } else return ""
            }
        },
        {
            title: 'Nguyên liệu',
            dataIndex: 'idRecipe',
            key: 'idRecipe',
            render: item => {
                if(congThuc.length !== 0){
                    const materials = congThuc.find(i => i.id === item).materials
                    return <Space direction='vertical' >
                                {materials.map(material => {
                                        const numOfMaterialInKho = searchInKho(material.name)
                                        const isThieu = (numOfMaterialInKho < material.quantity)

                                        return <Space key={material.name} direction='horizontal'>
                                            <Avatar src={material.image}></Avatar>
                                            <span>{material.name}</span>
                                            <Tag color='#87d068'>x{material.quantity} {material.unit}</Tag>
                                            {isThieu && <Tag color='#f50'>Thiếu {material.quantity - numOfMaterialInKho} {material.unit}</Tag>}
                                        </Space>
                                    })
                                }
                            </Space>
                } else return ""
            }
        },
        {
            title: 'Ngày nấu',
            dataIndex: 'date',
            key: 'date',
            render: item => moment(item).format("YYYY-MM-DD")
        },
        {
            title: 'Bữa nấu',
            dataIndex: 'state',
            key: 'state',
            render: (item) => {
                if(item === 0) return <Tag color='orange'>Bữa sáng</Tag>
                if(item === 1) return <Tag color='blue'>Bữa trưa</Tag>
                if(item === 2) return <Tag color='green'>Bữa tối</Tag>
                return <Tag color='green'>hehe</Tag>
            }
        },
        {
            title: 'Thao tác',
            render: (text, record) => (
                <div onClick={e => e.stopPropagation()}>
                      <Button size='small' onClick={() => handleDelete(record.id)} style={{marginLeft: 5}} type='danger'>Xóa</Button>
                </div>
              )
        }
    ]

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${BACK_END_URL}cook/delete/${id}`)
            const data = await res.json()
            if(data.success === true){
                fetchNauAn(user.id)
                message.success('Xóa thành công')
            }
        } catch (error) {
            message.warning('Thất bại', error.message)
        }
    }

    const searchInKho = (name) => {
        const result = kho.filter(item => item.food.name === name && diffInDays(item.expire, moment()) >= 0 )
        return result.reduce((init, item) => init + item.quantity ,0)
    }

    function diffInDays(timeString1, timeString2) {
        const time1 = moment(timeString1);
        const time2 = moment(timeString2);
        const diffInDays = time1.diff(time2, 'days');
        return diffInDays;
    }

    const [selectedDate, setSelectedDate] = useState(moment());
    const filteredData = nauAn.filter((item) => {
        const itemDate = moment(item.date);
        return selectedDate ? itemDate.isSame(selectedDate, 'day') : true;
      });

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title={<>Danh sách món dự định nấu <DatePicker
                        value={selectedDate} 
                        onChange={(date) => setSelectedDate(date)}
                        /></>}
                    extra={
                        <Space>
                            <Space>
                              {/* <Button type="primary" onClick={() => {}}>Thêm</Button> */}
                            </Space>
                        </Space>
                    }>
                    <Table 
                        pagination={false} 
                        columns={columns} 
                        dataSource={filteredData}
                        className="ant-border-space"
                    />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default NauAn