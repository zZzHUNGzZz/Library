import { Col, Row, message } from 'antd';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FiMenu } from "react-icons/fi";
import { getLoanDocument, LoanDTO, updateLoanDocument } from '../../../stores/LoanStore';
import { useEffect, useState } from 'react';

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
    const [data, setData] = useState<LoanDTO[]>([]);
    const [dataChart, setDataChart] = useState<number[]>([]);
    const fetchData = async () => {
        const arr = await getLoanDocument();            
        setData(arr);
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        calculatoLoan();
    }, [data])
    const calculatoLoan = () => {        
        const result = Object.values(data)
        setDataChart(result as any);
    }
    return (
        <>
            <Row>
                <Col span={24}>
                    <span style={{ fontSize: "18px", fontWeight: 444, color: "black" }}>Thống kê số lượng sách đã được mượn trong 12 tháng qua</span>
                </Col>
                {/* <Col span={4} style={{ display: "flex", justifyContent: "end", alignItems: "center", fontSize: "18px", color: "black" }}>
                    <FiMenu onClick={async () => {}} />
                </Col> */}
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
                                "#4656E8",
                                "#B741FB",
                                "#02876f",
                                "#967210",
                                "#0C74E4",
                                "#cf4c10",
                                "#61CBF4",
                                "#018a3c",
                                "#387a8f",
                                "#c48650",
                                "#f5222d",
                                "#faad14"
                            ],
                            data: dataChart
                        }
                    ]
                }}

            />
        </>
    );
}

export default BarChart;