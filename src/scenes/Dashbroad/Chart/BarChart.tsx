import { Col, Row, message } from 'antd';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FiMenu } from "react-icons/fi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

function BarChart() {
    return (
        <>
            <Row>
                <Col span={20}>
                    <span style={{ fontSize: "18px", fontWeight: 444, color: "black" }}>Thống kê số lượng sách đã được mượn trong 12 tháng qua</span>
                </Col>
                <Col span={4} style={{ display: "flex", justifyContent: "end", alignItems: "center", fontSize: "18px", color: "black" }}>
                    <FiMenu onClick={() => message.info("Chức năng chưa có =))")} />
                </Col>
            </Row>
            <div style={{ width: "100%", border: "1px solid lightgray", marginBottom: 20 }}></div>
            <Bar
                style={{ maxHeight: "400px" }}
                title='Thống kê số lượng sách đã được mượn trong 12 tháng qua'
                data={{
                    labels: [
                        "Tháng 1",
                        "Tháng 2",
                        "Tháng 3",
                        "Tháng 4",
                        "Tháng 5",
                        "Tháng 6",
                        "Tháng 7",
                        "Tháng 8",
                        "Tháng 9",
                        "Tháng 10",
                        "Tháng 11",
                        "Tháng 12",
                    ],
                    datasets: [
                        {
                            label: "Số lượng (cuốn)",
                            backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850",
                                "#3e22cd",
                                "#85eea2",
                                "#e823b9",
                                "#387a8f",
                                "#c48650",
                                "#f5222d",
                                "#faad14"
                            ],
                            data: [2478, 5267, 734, 2002, 784, 2612, 3433, 1226, 1600, 576, 3456, 2345]
                        }
                    ]
                }}

            />
        </>
    );
}

export default BarChart;