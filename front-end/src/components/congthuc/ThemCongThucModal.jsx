import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography, Form, Input, Modal, DatePicker, Tag, Select, Popconfirm,
    InputNumber,
    Space
} from "antd";
import { BACK_END_URL } from '../../context/const';
import { useData } from '../../context/AppContext';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';

const ThemCongThucModal = (props) => {
    const {
        editModalVisible, 
        setEditModalVisible,
    } = props

    const [selectedFood, setSelectedFood] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    
    useEffect(() => {
        setIsModalVisible(editModalVisible)
    }, [editModalVisible])

    const { user, fetchDiCho, monDo } = useData()

    const monAn = monDo.filter(item => item.type === 1)
    const thucPham = monDo.filter(item => item.type === 0)

    const AddForm = ({ visible, onCreate, onCancel, initialValues }) => {
        const [form] = Form.useForm();
        return (
            <Modal visible={visible} title="Thêm nhóm mới" okText="Lưu" cancelText="Hủy" onCancel={onCancel} onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }}>
                <Form form={form} layout="vertical">
                        <Form.Item
                            label="Tên công thức"
                            name="name"
                            rules={[
                                { required: true, message: "Hãy điền trường này" }
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Mô tả"
                            name="desc"
                            rules={[
                                { required: true, message: "Hãy điền trường này" }
                            ]}
                        >
                            <TextArea/>
                        </Form.Item>
                    <Form.Item
                        label="Chọn món ăn"
                        name="idFood"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <Select
                            options={monAn.map(item => {
                                return {
                                    label: <Space direction='horizontal'>
                                                <Avatar size={25} src={item.image}></Avatar>
                                                <span>{item.name}</span>
                                            </Space>,
                                    value: item.id
                                }
                            })}
                            onChange={(value) => setSelectedFood(value)}
                        ></Select>
                    </Form.Item>
                        <Form.Item
                            label="Số lượng"
                            name="quantity"
                            rules={[
                                { required: true, message: "Hãy điền trường này" }
                            ]}
                            initialValue={1}
                        >
                            <InputNumber></InputNumber>
                        </Form.Item>
                        <Form.Item
                            label="Ngày mua"
                            name="dateToBuy"
                            rules={[
                                { required: true, message: "Hãy điền trường này" }
                            ]}
                            initialValue={moment()}
                        >
                            <DatePicker></DatePicker>
                        </Form.Item>
                </Form>
            </Modal>
        );
    };

    const handleAddSubmit = async (values) => {
        const fetchData = async () => {
        try {
            values.idUser = user.id
            values.dateToBuy = values.dateToBuy.format("YYYY-MM-DD")
            const res = await fetch(`${BACK_END_URL}market/add`, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            });
            const data = await res.json();
            if(data.success === true){
                await fetchDiCho(user.id)
                message.success('Tạo thành công!')
                setEditModalVisible(false);
            }
          } catch (error) {
            console.error(error);
          }
        }

        await fetchData()
    }

    return (
        <AddForm
            visible={isModalVisible}
            onCreate={handleAddSubmit}
            onCancel={() => {
                setEditModalVisible(false);
                setIsModalVisible(false); // ẩn modal
            }}
        />
    )
}

export default ThemCongThucModal