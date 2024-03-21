import { Card, Col, Row } from "antd";
import { IoSettingsOutline } from "react-icons/io5";
import './style.css';
import BarChart from "./Chart/BarChart";


function DashBroad() {
    return (
        <>
            <Row gutter={16}>
                <Col span={6}>
                    <Card style={{ backgroundColor: "#007bff" }}>
                        <Row>
                            <Col span={20}>
                                <p style={{ fontSize: "18px", fontWeight: 500, margin: 0 }}>Tổng số sách hiện có</p>
                                <span>2612</span>
                            </Col>
                            <Col span={4} className="card-content-icon">
                                <IoSettingsOutline size={'25px'} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ backgroundColor: "#333333" }}>
                        <Row>
                            <Col span={20}>
                                <p style={{ fontSize: "18px", fontWeight: 500, margin: 0 }}>Sách sẵn sàng cho mượn</p>
                                <span>2002</span>
                            </Col>
                            <Col span={4} className="card-content-icon">
                                <IoSettingsOutline size={'25px'} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ backgroundColor: "#FAAD14" }}>
                        <Row>
                            <Col span={20}>
                                <p style={{ fontSize: "18px", fontWeight: 500, margin: 0 }}>Sách đang cho mượn</p>
                                <span>1226</span>
                            </Col>
                            <Col span={4} className="card-content-icon">
                                <IoSettingsOutline size={'25px'} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ backgroundColor: "#F5222D" }}>
                        <Row>
                            <Col span={20}>
                                <p style={{ fontSize: "18px", fontWeight: 500, margin: 0 }}>Sách hỏng, mất, ...</p>
                                <span>38</span>
                            </Col>
                            <Col span={4} className="card-content-icon">
                                <IoSettingsOutline size={'25px'} />
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