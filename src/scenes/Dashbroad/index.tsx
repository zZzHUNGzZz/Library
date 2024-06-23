import { Card, Col, Row } from "antd";
import { RiFileDamageLine } from "react-icons/ri";
import { AiOutlineBook } from "react-icons/ai";
import { LuFileBarChart } from "react-icons/lu";
import { LuFileCheck } from "react-icons/lu";
import './style.css';
import BarChart from "./Chart/BarChart";

function DashBroad() {
    return (
        <>
            <Row gutter={16}>
                <Col span={6}>
                    <Card style={{ backgroundColor: "#52C41A" }}>
                        <Row>
                            <Col span={20}>
                                <p style={{ fontSize: "17px", fontWeight: 500, margin: 0, color: "#ffffff" }}>Tổng số sách hiện có</p>
                                <span>2612</span>
                            </Col>
                            <Col span={4} className="card-content-icon">
                                <AiOutlineBook size={30} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ backgroundColor: "#1890FF" }}>
                        <Row>
                            <Col span={20}>
                                <p style={{ fontSize: "17px", fontWeight: 500, margin: 0, color: "#ffffff" }}>Sách sẵn sàng cho mượn</p>
                                <span>2002</span>
                            </Col>
                            <Col span={4} className="card-content-icon">
                                <LuFileCheck size={30} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ backgroundColor: "#FAAD14" }}>
                        <Row>
                            <Col span={20}>
                                <p style={{ fontSize: "17px", fontWeight: 500, margin: 0, color: "#ffffff" }}>Sách đang cho mượn</p>
                                <span>1226</span>
                            </Col>
                            <Col span={4} className="card-content-icon">
                                <LuFileBarChart size={30} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ backgroundColor: "#FF4D4F" }}>
                        <Row>
                            <Col span={20}>
                                <p style={{ fontSize: "17px", fontWeight: 500, margin: 0, color: "#ffffff" }}>Sách hỏng, mất, ...</p>
                                <span>38</span>
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