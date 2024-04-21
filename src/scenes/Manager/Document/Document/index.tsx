import { Button, Card, Col, Input, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { createDocument, getDocument } from "../../../../stores/DocumentStore";
import { cssResponsive } from "../../../../components/Manager/AppConst";
import { CreateOrUpdateDocument } from "./CreateUpdateDocument";

function Document() {
    const [data, setData] = useState<any[]>([]);
    const [isCreateUpdate, setCreateUpdateFormOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const infoArray = await getDocument();
            setData(infoArray);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    const onCreateOrUpdateData = () => {

    }

    const onCancel = () => {
        setCreateUpdateFormOpen(false);
    }

    const columns = [
        { title: 'Tên tài liệu', dataIndex: 'do_title', key: 'do_title', },
        { title: 'Tác giả', dataIndex: 'author', key: 'author', },
        { title: 'Số lượng', dataIndex: 'do_total', key: 'author', },
        { title: 'Năm xuất bản', dataIndex: 'do_date_publish', key: 'do_date_publish', },
        { title: 'Mã đầu sách', dataIndex: 'do_identifier', key: 'do_identifier', },
        { title: 'Dịch giả', dataIndex: 'do_translator', key: 'do_translator', },
        { title: 'Nhà xuất bản', dataIndex: 'do_publisher', key: 'do_publisher', },
        { title: 'Ngôn ngữ', dataIndex: 'do_language', key: 'do_language', },
        { title: 'Chủ đề', dataIndex: 'do_topic', key: 'do_topic', },
        { title: 'Danh mục', dataIndex: 'do_category' },
    ];

    const leftCol = isCreateUpdate ? cssResponsive(24, 24, 12, 12, 12, 12) : cssResponsive(24, 24, 24, 24, 24, 24);
    const rightCol = isCreateUpdate ? cssResponsive(24, 24, 12, 12, 12, 12) : cssResponsive(0, 0, 0, 0, 0, 0);
    return (
        <Card>
            <Row>
                <Col span={12}><h2>Thông tin tài liệu</h2></Col>
                <Col span={12} style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 8 }}>
                    <Button type="primary" onClick={() => setCreateUpdateFormOpen(true)}>Thêm dữ liệu</Button>
                    <Button type="primary">Xuất dữ liệu</Button>
                    <Button type="primary">Nhập dữ liệu</Button>
                </Col>
            </Row>
            <Row style={{ margin: "20px 0" }}>
                <Col span={6}>
                    <p>Tên tài liệu</p>
                    <Input></Input>
                </Col>
                <Col span={6}>
                    <p>Tác giả</p>
                    <Input></Input>
                </Col>
                <Col span={6}>
                    <p>Năm xuất bản</p>
                    <Input></Input>
                </Col>
                <Col span={6}>
                    <p>Mã đầu sách</p>
                    <Input></Input>
                </Col>
            </Row>
            <Row>
                <Col {...leftCol}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={data}
                        scroll={{ x: 1000 }}
                    />
                </Col>
                <Col {...rightCol}>
                    <CreateOrUpdateDocument
                        onCancelData={onCancel}
                    />
                </Col>
            </Row>
        </Card>
    );
}

export default Document;