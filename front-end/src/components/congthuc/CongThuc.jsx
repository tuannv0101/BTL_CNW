import React, { useEffect, useState } from 'react';
import { useData } from '../../context/AppContext';
import { DeleteOutlined, PlusOutlined, ReadOutlined } from '@ant-design/icons';
import {
    Image,
    Tag,
    Row,
    Col,
    Card,
    Space,
    Table,
    Button,
    Avatar,
    Modal,
    Select,
    Input,
    InputNumber,
    Form,
    message
} from 'antd';
import { BACK_END_URL } from '../../context/const';
import NauModal from './NauModal';

const { Option } = Select;
const { TextArea } = Input;

const CongThuc = () => {
    const { user, congThuc, fetchCongThuc, monDo } = useData();
    useEffect(() => {
        fetchCongThuc(user?.id)
    }, [])
    const monAn = monDo.filter(item => item.type === 1)
    const thucPham = monDo.filter(item => item.type === 0)

    const [modalVisible, setModalVisible] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        desc: '',
        food: '',
        materials: [],
    });
    const [materialValues, setMaterialValues] = useState([]);

    const handleOk = async () => {
        // Handle submit form here
        console.log(formValues, materialValues);
        const values = {}
        try {
            values.name = formValues.name;
            values.desc = formValues.desc;
            values.idUser = user.id;
            values.idFood = formValues.food;
            values.materials = materialValues;
            const res = await fetch(`${BACK_END_URL}recipe/add`, {
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
                await fetchCongThuc(user.id)
                message.success('Tạo thành công!')
                setModalVisible(false);

                setFormValues({
                    name: '',
                    desc: '',
                    food: '',
                    materials: [],
                })
                setMaterialValues([])
            }
          } catch (error) {
            console.error(error);
            message.error(error.message)
          }
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFoodChange = (value) => {
        setFormValues({ ...formValues, food: value });
    };

    const handleMaterialChange = (value, index) => {
        const newMaterialValues = [...materialValues];
        newMaterialValues[index] = { ...newMaterialValues[index], id: value };
        setMaterialValues(newMaterialValues);
    };

    const handleQuantityChange = (value, index) => {
        const newMaterialValues = [...materialValues];
        newMaterialValues[index] = { ...newMaterialValues[index], quantity: value };
        setMaterialValues(newMaterialValues);
    };

    const handleAddMaterial = () => {
        setMaterialValues([...materialValues, { material: '', quantity: 0 }]);
    };

    const handleRemoveMaterial = (index) => {
        const newMaterialValues = [...materialValues];
        newMaterialValues.splice(index, 1);
        setMaterialValues(newMaterialValues);
    };

    const columns = [
        {
            title: 'Tên công thức',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'desc',
            key: 'desc',
            width: '20%',
            ellipsize: true,
        },
        {
            title: 'Món nấu',
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
            title: 'Nguyên liệu',
            dataIndex: 'materials',
            key: 'materials',
            render: (item) => {
                return <Space direction='vertical' >
                    {item.map(i => 
                        <Space key={i.name} direction='horizontal'>
                            <Avatar src={i.image}></Avatar>
                            <span>{i.name}</span>
                            <Tag color='#87d068'>x{i.quantity} {i.unit}</Tag>
                        </Space>)
                    }
                </Space>
            }
        },
        {
            title: 'Thao tác',
            render: (text, record) => (
              <div onClick={e => e.stopPropagation()}>
                    <Button size='small' onClick={() => handleNau(record.id)} style={{marginLeft: 5}} type='primary'>Tạo dự định nấu</Button>
              </div>
            ),
        }
    ]
    
    const [nauModalVisible, setNauModalVisible] = useState(false);
    const [idRecipe, setIdRecipe] = useState(null)
    const handleNau = (id) => {
        setIdRecipe(id)
        setNauModalVisible(true);
    };


    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Danh sách các công thức"
                        extra={
                            <Space>
                                <Space>
                                <Button type="primary" onClick={() => setModalVisible(true)}>Thêm</Button>
                                </Space>
                            </Space>
                        }>
                        <Table 
                            pagination={false} 
                            columns={columns} 
                            dataSource={congThuc}
                            className="ant-border-space"
                        />
                    </Card>
                </Col>
                <Modal
                    visible={modalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    closable={false}
                >
                    <Form>
                        <Form.Item label="Tên công thức">
                            <Input name="name" value={formValues.name} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Mô tả">
                            <TextArea name="desc" value={formValues.desc} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Món ăn">
                            <Select value={formValues.food} onChange={handleFoodChange}>
                                {monAn.map((item) => (
                                    <Option key={item.id} value={item.id}>
                                        <Avatar src={item.image} />
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Nguyên liệu">
                            {materialValues.map((material, index) => (
                                <Row key={index} gutter={8} align="middle">
                                    <Col span={16}>
                                        <Select
                                            value={material.id}
                                            onChange={(value) => handleMaterialChange(value, index)}
                                        >
                                            {thucPham.map((item) => (
                                                <Option key={item.id} value={item.id}>
                                                    <Avatar src={item.image} />
                                                    {item.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col span={6}>
                                        <InputNumber
                                            value={material.quantity}
                                            onChange={(value) => handleQuantityChange(value, index)}
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <div className='btn-delete' onClick={() => handleRemoveMaterial(index)}>
                                            <DeleteOutlined />
                                        </div>
                                    </Col>
                                </Row>
                            ))}
                            <div className='btn-add' onClick={handleAddMaterial}><PlusOutlined /></div>
                        </Form.Item>
                    </Form>
                </Modal>
                { nauModalVisible && <NauModal 
                  editModalVisible={nauModalVisible}
                  setEditModalVisible={setNauModalVisible}
                  idRecipe={idRecipe}
                />}
            </Row>
        </div>
    );
}

export default CongThuc;