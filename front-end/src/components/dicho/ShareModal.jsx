import React, { useState } from 'react'
import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography, Form, Input, Modal, DatePicker, Tag, Select, Popconfirm,
    InputNumber,
    Space
} from "antd";
import { BACK_END_URL } from '../../context/const';
import { useData } from '../../context/AppContext';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';

const ShareModal = (props) => {
    const {
        editModalVisible, 
        setEditModalVisible,
        selectedMarket
    } = props

    const { user, fetchDiCho, monDo, group } = useData()

    const AddForm = ({ visible, onCreate, onCancel, initialValues }) => {
        const [form] = Form.useForm();
        return (
            <Modal visible={visible} title="Chia sẻ với nhóm" okText="Lưu" cancelText="Hủy" onCancel={onCancel} onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }}>
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Chọn nhóm"
                        name="idGroup"
                        rules={[
                            { required: true, message: "Hãy điền trường này" }
                        ]}
                    >
                        <Select
                            options={group.map(item => {
                                return {
                                    label: item.name,
                                    value: item.id
                                }
                            })}
                        ></Select>
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    const handleAddSubmit = async (values) => {
        const fetchData = async () => {
        try {
            values.idMarket = selectedMarket
            const res = await fetch(`${BACK_END_URL}group/market-share/add`, {
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

export default ShareModal