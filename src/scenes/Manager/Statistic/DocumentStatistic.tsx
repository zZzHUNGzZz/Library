import { Card, Col, DatePicker, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { DocumentInfoDTO, getDocumentInfo } from "../../../stores/DocumentInfoStore";

const dayjs = require('dayjs');

function DocumentStatistic() {
    const [year, setYear] = useState<number>(2024);
    const [data, setData] = useState<DocumentInfoDTO[]>([]);
    const [totalDocument, setTotalDocument] = useState<number>(0);

    useEffect(() => {
        fetchData();
        getTotalDocumentInYear();
    });

    const fetchData = async () => {
        const document = await getDocumentInfo("");
        setData(document);
    };

    const getDocumentCountByMonthYear = (month: number, year: number): number => {
        const count = data.filter(document => {
            const createAt = document.do_in_create_at;
            return createAt && createAt.year() === year && createAt.month() === (month - 1);
        }).length;

        return count;
    };

    const getTotalDocumentInYear = () => {
        let total: number = 0;
        for (let i = 1; i <= 12; i++) {
            let result = getDocumentCountByMonthYear(i, year)
            total += result
        }
        setTotalDocument(total);
    }

    const dataSource = [
        { month: 1, new_document: getDocumentCountByMonthYear(1, year) },
        { month: 2, new_document: getDocumentCountByMonthYear(2, year) },
        { month: 3, new_document: getDocumentCountByMonthYear(3, year) },
        { month: 4, new_document: getDocumentCountByMonthYear(4, year) },
        { month: 5, new_document: getDocumentCountByMonthYear(5, year) },
        { month: 6, new_document: getDocumentCountByMonthYear(6, year) },
        { month: 7, new_document: getDocumentCountByMonthYear(7, year) },
        { month: 8, new_document: getDocumentCountByMonthYear(8, year) },
        { month: 9, new_document: getDocumentCountByMonthYear(9, year) },
        { month: 10, new_document: getDocumentCountByMonthYear(10, year) },
        { month: 11, new_document: getDocumentCountByMonthYear(11, year) },
        { month: 12, new_document: getDocumentCountByMonthYear(12, year) },
    ];
    const columns = [
        { title: 'Tháng', dataIndex: 'month', key: 'month' },
        { title: 'Tài liệu mới', dataIndex: 'new_document', key: 'new_document' },
    ];
    return (
        <Card>
            <Row><DatePicker defaultValue={dayjs()} onChange={(value) => setYear(Number(value.format("YYYY")))} picker="year" /></Row>
            <Row style={{ marginBottom: 10 }}>
                <Col span={24}><h1 className="align-content-center">{"Báo cáo tài liệu mới năm " + year}</h1></Col>
            </Row>
            <Table
                className="center-table"
                size="small"
                bordered
                key={'stt'}
                rowKey="stt"
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                summary={() => (
                    <Table.Summary >
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}><b>Tổng</b></Table.Summary.Cell>
                            <Table.Summary.Cell index={1}><b>{totalDocument}</b></Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
            />
        </Card>
    );
}

export default DocumentStatistic;