import { Card, Col, DatePicker, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { getMember, MemberDTO } from "../../../stores/MemberStore";
const dayjs = require('dayjs');

function DocumentStatistic() {
    const [year, setYear] = useState<number>(2024);
    const [data, setData] = useState<MemberDTO[]>([]);
    const [totalMember, setTotalMember] = useState<number>(0);

    useEffect(() => {
        fetchData();
        getTotalMemberInYear();
    }
    );
    const fetchData = async () => {
        const member = await getMember("");
        setData(member);
    };

    const getMemberCountByMonthYear = (month: number, year: number): number => {
        const count = data.filter(member => {
            const createAt = member.me_create_at;
            return createAt && createAt.year() === year && createAt.month() === (month - 1);
        }).length;

        return count;
    };

    const getTotalMemberInYear = () => {
        let total: number = 0;
        for (let i = 1; i <= 12; i++) {
            let result = getMemberCountByMonthYear(i, year)
            total += result
        }
        setTotalMember(total);
    }

    const dataSource = [
        { month: 1, new_member: getMemberCountByMonthYear(1, year) },
        { month: 2, new_member: getMemberCountByMonthYear(2, year) },
        { month: 3, new_member: getMemberCountByMonthYear(3, year) },
        { month: 4, new_member: getMemberCountByMonthYear(4, year) },
        { month: 5, new_member: getMemberCountByMonthYear(5, year) },
        { month: 6, new_member: getMemberCountByMonthYear(6, year) },
        { month: 7, new_member: getMemberCountByMonthYear(7, year) },
        { month: 8, new_member: getMemberCountByMonthYear(8, year) },
        { month: 9, new_member: getMemberCountByMonthYear(9, year) },
        { month: 10, new_member: getMemberCountByMonthYear(10, year) },
        { month: 11, new_member: getMemberCountByMonthYear(11, year) },
        { month: 12, new_member: getMemberCountByMonthYear(12, year) },
    ];

    const columns = [
        {
            title: 'Tháng',
            dataIndex: 'month',
            key: 'month',
        },
        {
            title: 'Độc giả mới',
            dataIndex: 'new_member',
            key: 'new_member',
        },
    ];
    return (
        <Card>
            <Row><DatePicker defaultValue={dayjs()} onChange={(value) => setYear(Number(value.format("YYYY")))} picker="year" /></Row>
            <Row style={{ marginBottom: 10 }}>
                <Col span={24}><h1 className="align-content-center">{"Báo cáo độc giả mới năm " + year} </h1></Col>
            </Row>
            <Table
                className="center-table"
                size="small"
                bordered
                key={'month'}
                rowKey="month"
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                summary={() => (
                    <Table.Summary >
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}><b>Tổng</b></Table.Summary.Cell>
                            <Table.Summary.Cell index={1}><b>{totalMember}</b></Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
            />
        </Card>
    );
}

export default DocumentStatistic;