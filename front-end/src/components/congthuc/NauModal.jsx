import React, { useState } from 'react'
import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography, Form, Input, Modal, DatePicker, Tag, Select, Popconfirm,
    InputNumber,
    Space
} from "antd";
import { BACK_END_URL } from '../../context/const';
import { useData } from '../../context/AppContext';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';

const NauModal = (props) => {
    const {
        editModalVisible, 
        setEditModalVisible,
        idRecipe
    } = props

    const { user, fetchNauAn } = useData()

    const AddForm = ({ visible, onCreate, onCancel, initialValues }) => {
        const [form] = Form.useForm();
        return (
            <Modal visible={visible} title="Lên kế hoạch nấu" okText="Lưu" cancelText="Hủy" onCancel={onCancel} onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }}>
                <Form form={form} layout="vertical">
                        <Form.Item
                            label="Ngày nấu"
                            name="date"
                            rules={[
                                { required: true, message: "Hãy điền trường này" }
                            ]}
                            initialValue={moment()}
                        >
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item
                            label="Bữa nấu"
                            name="state"
                            rules={[
                                { required: true, message: "Hãy điền trường này" }
                            ]}
                        >
                            <Select
                                options={[
                                    {
                                        label: "Bữa sáng",
                                        value: 0
                                    },
                                    {
                                        label: "Bữa trưa",
                                        value: 1
                                    },
                                    {
                                        label: "Bữa tối",
                                        value: 2
                                    }
                                ]}
                            ></Select>
                        </Form.Item>
                </Form>
            </Modal>
        );
    };

    const handleAddSubmit = async (values) => {
        const fetchData = async () => {
        try {
            values.date = values.date.format("YYYY-MM-DD")
            values.idRecipe = idRecipe
            values.idUser = user.id
            const res = await fetch(`${BACK_END_URL}cook/add`, {
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
                await fetchNauAn(user.id)
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

export default NauModal