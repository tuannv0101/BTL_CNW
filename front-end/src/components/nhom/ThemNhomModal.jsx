import React, { useState } from 'react'
import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography, Form, Input, Modal, DatePicker, Tag, Select, Popconfirm,
    InputNumber,
    Space
} from "antd";
import { BACK_END_URL } from '../../context/const';
import { useData } from '../../context/AppContext';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';

const ThemNhomModal = (props) => {
    const {
        editModalVisible, 
        setEditModalVisible,
    } = props

    const { user, fetchNhom } = useData()

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
                        label="Tên nhóm"
                        name="name"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="desc"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <TextArea></TextArea>
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    const handleAddSubmit = async (values) => {
        const fetchData = async () => {
        try {
            values.idLeader = user[0].id;
            console.log(values);
            const res = await fetch(`${BACK_END_URL}group/add`, {
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
                await fetchNhom()
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
            visible={editModalVisible}
            onCreate={handleAddSubmit}
            onCancel={() => {
                setEditModalVisible(false);
            }}
        />
    )
}

export default ThemNhomModal