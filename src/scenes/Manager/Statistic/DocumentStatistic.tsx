import { Button, Card, Col, Input, Row, Table, message } from "antd";
import { ExportOutlined, ImportOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { getTotalDocument } from "../../../stores/SessionStore";
import { useEffect, useState } from "react";

function DocumentStatistic() {

    const [count, setCount] = useState(0);

    useEffect(() => {
        const getCount = () => {
            getTotalDocument()
                .then(totalCount => {
                    setCount(totalCount);
                })
                .catch(error => {
                    console.error("Lỗi khi lấy tổng số tài liệu:", error);
                });
        };

        getCount();
    }, []);

    const dataSource = [{ a: 0, b: 0, c: 0, d: 0, e: count }];


    const columns = [
        {
            title: 'Số lượng tài liệu mất',
            dataIndex: 'a',
            key: 'a',
        },
        {
            title: 'Số lượng tài liệu hỏng',
            dataIndex: 'b',
            key: 'b',
        },
        {
            title: 'Số lượng tài liệu mất',
            dataIndex: 'c',
            key: 'c',
        },
        {
            title: 'Số lượng tài liệu đang cho mượn',
            dataIndex: 'd',
            key: 'd',
        },
        {
            title: 'Số lượng tài liệu đang được sử dụng',
            dataIndex: 'e',
            key: 'e',
        },
    ];
    return (
        <Card>
            <Row gutter={[8, 8]}>
                {/* <Col span={24} className="align-right">
                    <Button type="primary" title="Nhập dữ liệu" icon={<ImportOutlined />} >Nhập dữ liệu</Button>
                    <Button type="primary" title="Xuất dữ liệu" icon={<ExportOutlined />}>Xuất dữ liệu</Button>
                </Col> */}
                <Col span={24}><h1 className="align-center">Báo cáo tài liệu</h1></Col>
            </Row>
            <Table
                bordered
                key={'stt'}
                rowKey="stt"
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
        </Card>
    );
}

export default DocumentStatistic;