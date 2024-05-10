import { Button, Card, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { PunishDTO, getPunish } from "../../../../stores/PunishStore";
import { cssResponsive } from "../../../../components/Manager/AppConst";
import { ExportOutlined, SearchOutlined } from "@ant-design/icons";
import ExportPunish from "./ExportPunish";
import TablePunish from "./TablePunish";

function Punish() {
    const [data, setData] = useState<PunishDTO[]>([]);
    const [multiDatarSelected, setMultiDataSelected] = useState<PunishDTO[]>();
    const [valueSearch, setValueSearch] = useState('');
    const [isModalExportOpen, setModalExportOpen] = useState(false);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const infoArray = await getPunish(valueSearch);
        const dataWithIndex = infoArray.map((item, index) => ({ stt: index, ...item }));
        setData(dataWithIndex);
    };

    const setMultiPunishSelect = (data: PunishDTO[]) => {
        setMultiDataSelected(data);
    }

    return (
        <Card>
            <Row gutter={[8, 8]}>
                <Col span={12}><h2>Phạt</h2></Col>
                <Col span={12} className="align-right">
                    <Button type="primary" title="Xuất dữ liệu" icon={<ExportOutlined />} onClick={() => setModalExportOpen(true)}>Xuất dữ liệu</Button>
                </Col>
            </Row>
            <Row gutter={[8, 8]} style={{ margin: "10px 0" }}>
                <Col {...cssResponsive(24, 12, 6, 6, 6, 6)}>
                    <p className="p-title-search">Độc giả</p>
                    <Input allowClear placeholder="Độc giả" onChange={(e) => setValueSearch(e.target.value)}></Input>
                </Col>
                <Col {...cssResponsive(24, 12, 6, 6, 6, 6)}>
                    <p className="p-title-search">Người phạt</p>
                    <Input allowClear placeholder="Người phạt" onChange={(e) => setValueSearch(e.target.value)}></Input>
                </Col>
                <Col {...cssResponsive(24, 12, 6, 6, 6, 6)}>
                    <p className="p-title-search">Lỗi</p>
                    <Input allowClear placeholder="Lỗi" onChange={(e) => setValueSearch(e.target.value)}></Input>
                </Col>
                <Col {...cssResponsive(24, 12, 6, 6, 6, 6)}>
                    <p className="p-title-search">Ngày phạt</p>
                    <Input allowClear placeholder="Ngày phạt" onChange={(e) => setValueSearch(e.target.value)}></Input>
                </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
                <Col className="align-content">
                    <Button
                        title="Tìm kiếm"
                        icon={<SearchOutlined />}
                        onClick={async () => await fetchData()}
                    >
                        Tìm kiếm
                    </Button>
                </Col>
            </Row>
            <TablePunish
                datasource={data}
                setMultiDataSelected={setMultiPunishSelect}
            />
            <ExportPunish
                openModalExport={isModalExportOpen}
                setOpenModalExport={setModalExportOpen}
                datasource={!!multiDatarSelected ? multiDatarSelected! : data}
            />
        </Card>
    );
}

export default Punish;