import { Card, Col,  Row, Table } from "antd";
import { useEffect, useState } from "react";
import { getTotalMember } from "../../../stores/SessionStore";

function DocumentStatistic() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const getCount = () => {
            getTotalMember()
                .then(totalCount => {
                    setCount(totalCount);
                })
                .catch(error => {
                    console.error("Lỗi khi lấy tổng số tài liệu:", error);
                });
        };

        getCount();
    }, []);
    const dataSource = [
        { a: 1, b: 0},
        { a: 2, b: 0},
        { a: 3, b: 0},
        { a: 4, b: 0},
        { a: 5, b: count},
        { a: 6, b: 0},
        { a: 7, b: 0},
        { a: 8, b: 0},
        { a: 9, b: 0},
        { a: 10, b: 0},
        { a: 11, b: 0},
        { a: 12, b: 0},
    ];

    const columns = [
        {
            title: 'Tháng',
            dataIndex: 'a',
            key: 'a',
        },
        {
            title: 'Độc giả mới',
            dataIndex: 'b',
            key: 'b',
        },
    ];
    return (
        <Card>
            <Row gutter={[8, 8]}>
                <Col span={24}><h1 className="align-content-center">Báo cáo độc giả mới</h1></Col>
            </Row>
            <Table
                bordered
                key={'a'}
                rowKey="a"
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
        </Card>
    );
}

export default DocumentStatistic;