import { Button, Card, Col, Input, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { getDocument } from "../../../../stores/DocumentStore";
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
            const dataWithIndex = infoArray.map((item, index) => ({ ...item, stt: index }));
            setData(dataWithIndex);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    const onCancel = () => {
        setCreateUpdateFormOpen(false);
    }

    const columns = [
        { title: 'STT', dataIndex: 'stt', render: (index: number) => index + 1 },
        { title: 'Tên tài liệu', dataIndex: 'do_title', },
        { title: 'Tác giả', dataIndex: 'author', },
        { title: 'Số lượng', dataIndex: 'do_total', },
        { title: 'Năm xuất bản', dataIndex: 'do_date_publish', },
        { title: 'Mã đầu sách', dataIndex: 'do_identifier', },
        { title: 'Dịch giả', dataIndex: 'do_translator', },
        { title: 'Nhà xuất bản', dataIndex: 'do_publisher', },
        { title: 'Ngôn ngữ', dataIndex: 'do_language', },
        { title: 'Chủ đề', dataIndex: 'do_topic', },
        { title: 'Danh mục', dataIndex: 'do_category', },
    ];

    const leftCol = isCreateUpdate ? cssResponsive(24, 24, 14, 14, 14, 14) : cssResponsive(24, 24, 24, 24, 24, 24);
    const rightCol = isCreateUpdate ? cssResponsive(24, 24, 10, 10, 10, 10) : cssResponsive(0, 0, 0, 0, 0, 0);
    return (
        <Card>
            <Row>
                <Col span={12}><h2 style={{ color: '#0958d9' }}>Tài liệu</h2></Col>
                <Col span={12} className="align-right">
                    <Button type="primary" onClick={() => setCreateUpdateFormOpen(true)}>Thêm dữ liệu</Button>
                    <Button type="primary">Xuất dữ liệu</Button>
                    <Button type="primary">Nhập dữ liệu</Button>
                </Col>
            </Row>
            <Row gutter={8} style={{ margin: "20px 0" }}>
                <Col span={6}>
                    <p className="p-title-search">Tên tài liệu</p>
                    <Input></Input>
                </Col>
                <Col span={6}>
                    <p className="p-title-search">Tác giả</p>
                    <Input></Input>
                </Col>
                <Col span={6}>
                    <p className="p-title-search">Năm xuất bản</p>
                    <Input></Input>
                </Col>
                <Col span={6}>
                    <p className="p-title-search">Mã đầu sách</p>
                    <Input></Input>
                </Col>
            </Row>
            <Row>
                <Col {...leftCol}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={data}
                        rowKey="do_id"
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