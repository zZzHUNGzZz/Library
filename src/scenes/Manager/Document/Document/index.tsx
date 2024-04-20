import { Button, Card, Col, Input, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { createDocument, getDocument } from "../../../../stores/DocumentStore";

function Document() {
    const [data, setData] = useState<any[]>([]);

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
        createDocument("ten tl", "tg", 100, "", "", "k biet", "cx ko luon", "vn", "chu de", null);
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
    return (
        <Card>
            <Row>
                <Col span={12}><h2>Thông tin tài liệu</h2></Col>
                <Col span={12} style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 8 }}>
                    <Button onClick={() => onCreateOrUpdateData()}>Thêm dữ liệu</Button>
                    <Button>Xuất dữ liệu</Button>
                    <Button>Nhập dữ liệu</Button>
                </Col>
            </Row>
            <Row style={{margin: "20px 0"}}>
                <Col span={6}>
                    <p>Tên tài liệu</p>
                    <Input></Input>
                </Col>
                <Col span={6}>
                    <p>Tác giả</p>
                    <Input></Input>
                </Col>
                <Col span={6}>
                    <p>Số lượng</p>
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
                <Col span={6}>
                    <p>Dịch giả</p>
                    <Input></Input>
                </Col>
                <Col span={6}>
                    <p>Nhà xuất bản</p>
                    <Input></Input>
                </Col>
                <Col span={6}>
                    <p>Ngôn ngữ</p>
                    <Input></Input>
                </Col>
                <Col span={6}>
                    <p>Chủ đề</p>
                    <Input></Input>
                </Col>
                <Col span={6}>
                    <p>Danh mục</p>
                    <Input></Input>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={data}
            />
        </Card>
    );
}

export default Document;