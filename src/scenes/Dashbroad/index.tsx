import { Card, Col, Row } from "antd";
import { RiFileDamageLine } from "react-icons/ri";
import { AiOutlineBook } from "react-icons/ai";
import { LuFileBarChart } from "react-icons/lu";
import { LuFileCheck } from "react-icons/lu";
import './style.css';
import BarChart from "./Chart/BarChart";
import { cssResponsive } from "../../components/Manager/Responsive";
import { useEffect, useState } from "react";
import { DocumentInfoDTO, getDocumentInfo } from "../../stores/DocumentInfoStore";
import moment from "moment";

function DashBroad() {
    const [data, setData] = useState<DocumentInfoDTO[]>([]);
    const [numberBookAvailable, setNumberBookAvailable] = useState<number>(0);
    const [numberBookReady, setNumberBookReady] = useState<number>(0);
    const [numberBookLoan, setNumberBookLoan] = useState<number>(0);
    const [numberBookProblem, setNumberBookProblem] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const arrDocument = await getDocumentInfo('');
            setData(arrDocument);
        };

        fetchData();
        calculateData();
    }, [data]);

    const calculateData = () => {
        setNumberBookAvailable(data.length);
        let readyCount = 0;
        let loanCount = 0;
        let problemCount = 0;

        data.forEach(item => {
            if (item.do_in_status === 1) {
                readyCount++;
            } else if (item.do_in_status === 2) {
                loanCount++;
            } else {
                problemCount++;
            }
        });

        setNumberBookReady(readyCount);
        setNumberBookLoan(loanCount);
        setNumberBookProblem(problemCount);
    }

    return (
        <>
            <Row gutter={[16, 8]}>
                <Col {...cssResponsive(24, 24, 12, 12, 6, 6)}>
                    <Card style={{ backgroundColor: "#52C41A" }}>
                        <Row>
                            <Col span={20}>
                                <p style={{ fontSize: "17px", fontWeight: 500, margin: 0, color: "#ffffff" }}>Tổng số sách hiện có</p>
                                <span>{numberBookAvailable}</span>
                            </Col>
                            <Col span={4} className="card-content-icon">
                                <AiOutlineBook size={30} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col {...cssResponsive(24, 24, 12, 12, 6, 6)}>
                    <Card style={{ backgroundColor: "#1890FF" }}>
                        <Row>
                            <Col span={20}>
                                <p style={{ fontSize: "17px", fontWeight: 500, margin: 0, color: "#ffffff" }}>Sách sẵn sàng cho mượn</p>
                                <span>{numberBookReady}</span>
                            </Col>
                            <Col span={4} className="card-content-icon">
                                <LuFileCheck size={30} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col {...cssResponsive(24, 24, 12, 12, 6, 6)}>
                    <Card style={{ backgroundColor: "#FAAD14" }}>
                        <Row>
                            <Col span={20}>
                                <p style={{ fontSize: "17px", fontWeight: 500, margin: 0, color: "#ffffff" }}>Sách đang cho mượn</p>
                                <span>{numberBookLoan}</span>
                            </Col>
                            <Col span={4} className="card-content-icon">
                                <LuFileBarChart size={30} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col {...cssResponsive(24, 24, 12, 12, 6, 6)}>
                    <Card style={{ backgroundColor: "#FF4D4F" }}>
                        <Row>
                            <Col span={20}>
                                <p style={{ fontSize: "17px", fontWeight: 500, margin: 0, color: "#ffffff" }}>Sách hỏng, mất, ...</p>
                                <span>{numberBookProblem}</span>
                            </Col>
                            <Col span={4} className="card-content-icon">
                                <RiFileDamageLine size={30} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Card style={{ width: "100%", marginTop: '20px' }}>
                    <BarChart />
                </Card>
            </Row>
        </>
    );
}

export default DashBroad;
