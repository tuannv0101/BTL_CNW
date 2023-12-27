import React, { useState } from 'react'
import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography, Form, Input, Modal, DatePicker, Tag, Select, Popconfirm,
    InputNumber,
    Space
} from "antd";
import { BACK_END_URL } from '../../context/const';
import { useData } from '../../context/AppContext';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';

const MuaDiChoModal = (props) => {
    const {
        editModalVisible, 
        setEditModalVisible,
        selectedMarket,
    } = props

    const { user, fetchDiCho, monDo } = useData()

    const AddForm = ({ visible, onCreate, onCancel, initialValues }) => {
        const [form] = Form.useForm();
        return (
            <Modal visible={visible} title="Xác nhận mua" okText="Lưu" cancelText="Hủy" onCancel={onCancel} onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }}>
                <Form form={form} layout="vertical">
                    <Space direction='horizontal'>
                        <Space direction='vertical'>
                            <Form.Item
                                label="Ngày mua"
                                name="dateBought"
                                rules={[
                                    { required: true, message: "Hãy điền trường này" }
                                ]}
                                initialValue={moment()}
                            >
                                <DatePicker></DatePicker>
                            </Form.Item>
                            <Form.Item
                                label="Ngày hết hạn"
                                name="expire"
                                rules={[
                                    { required: true, message: "Hãy điền trường này" }
                                ]}
                                initialValue={moment()}
                            >
                                <DatePicker></DatePicker>
                            </Form.Item>
                        </Space>
                        <Space direction='vertical'>
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
                                label="Nơi để"
                                name="state"
                                rules={[
                                    { required: true, message: "Hãy điền trường này" }
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value={0}>Để ngoài</Radio>
                                    <Radio value={1}>Để tủ lạnh</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Space>
                    </Space>
                </Form>
            </Modal>
        );
    };

    const handleAddSubmit = async (values) => {
        const fetchData = async () => {
        try {
            values.dateBought = values.dateBought.format("YYYY-MM-DD")
            values.expire = values.expire.format("YYYY-MM-DD")
            values.idUserBought = user.id
            values.idMarket = selectedMarket
            const res = await fetch(`${BACK_END_URL}market/buy`, {
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
                message.success('Mua thành công!')
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
            visible={editModalVisible}
            onCreate={handleAddSubmit}
            onCancel={() => {
                setEditModalVisible(false);
            }}
        />
    )
}

export default MuaDiChoModal
