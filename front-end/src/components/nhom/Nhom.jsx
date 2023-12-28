import React, { useEffect, useState } from "react";
import {
    Card,
    Table,
    Row,
    Col,
    Button,
    Input,
    Modal,
    Descriptions,
    Tag,
    Space,
} from "antd";
import { useData } from "../../context/AppContext";
import ThemNhomModal from "./ThemNhomModal";
import { Link, useHistory } from "react-router-dom";

const Nhom = () => {
    const { user } = useData();
    const history = useHistory();

    const columns = [
        {
            title: "Tên nhóm",
            dataIndex: "name",
            key: "name",
            width: "20%",
        },
        {
            title: "Mô tả",
            dataIndex: "desc",
            key: "desc",
            width: "30%",
        },
        {
            title: "Số lượng thành viên",
            dataIndex: "members",
            key: "members",
            render: (item) => item.length,
        },
        {
            title: "Vai trò",
            dataIndex: "members",
            key: "members",
            render: (item) => {
                const userId = user[0].id;
                const result = item.filter((i) => i.id === userId && i.isLeader === 1);

                if (result.length === 1) return <Tag color="green">Trưởng nhóm</Tag>;
                return <Tag color="blue">Thành viên</Tag>;
            },
        },
        {
            title: "Thao tác",
            render: (text, record) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <Button
                        size="small"
                        style={{ marginLeft: 5 }}
                        type="primary"
                        onClick={() => {
                            history.push(`/nhom/${record.id}`);
                        }}
                    >
                        Chi tiết
                    </Button>
                </div>
            ),
        },
    ];

    const { group, fetchNhom } = useData();
    const [addModalVisible, setAddModalVisible] = useState(false);
    const handleAdd = () => {
        setAddModalVisible(true);
    };

    useEffect(() => {
        fetchNhom();
    }, []);

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Danh sách các nhóm tham gia"
                        extra={
                            <Space>
                                <Space>
                                    <Button type="primary" onClick={handleAdd}>
                                        Thêm nhóm
                                    </Button>
                                </Space>
                            </Space>
                        }
                    >
                        <Table
                            pagination={false}
                            columns={columns}
                            dataSource={group}
                            className="ant-border-space"
                        />
                    </Card>
                </Col>
                {addModalVisible && (
                    <ThemNhomModal
                        editModalVisible={addModalVisible}
                        setEditModalVisible={setAddModalVisible}
                    />
                )}
            </Row>
        </div>
    );
};

export default Nhom;