import { Button, Card, Col, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { DocumentInfoDTO, deleteDocumentInfo, getDocumentInfo } from "../../../stores/DocumentInfoStore";
import { cssResponsive } from "../../../components/Manager/AppConst";
import TableDocumentInfo from "./TableDocumentInfo";
import { DeleteOutlined, ExportOutlined, SearchOutlined } from "@ant-design/icons";
import ExportDocumentInfo from "./ExportDocumentInfo";
import { showDeleteConfirm } from "../../../utils/showDeleteConfirm";
import { UpdateDocumentInfo } from "./UpdateDocumentInfo";

function DocumentInfo() {
    const [data, setData] = useState<DocumentInfoDTO[]>([]);
    const [multiDatarSelected, setMultiDataSelected] = useState<DocumentInfoDTO[]>();
    const [isLoadDone, setIsLoadDone] = useState(true);
    const [documentInfoSelected, setDocumentInfoSelected] = useState<DocumentInfoDTO>();
    const [isCreateUpdate, setCreateUpdateFormOpen] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [isModalExportOpen, setModalExportOpen] = useState(false);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const infoArray = await getDocumentInfo(valueSearch);
        const dataWithIndex = infoArray.map((item, index) => ({ stt: index, ...item }));
        setData(dataWithIndex);
    };

    const onUpdateModalOpen = (value?: DocumentInfoDTO) => {
        if (!!value) setDocumentInfoSelected(value)
        setCreateUpdateFormOpen(true);
    }

    const onUpdateSuccess = async () => {
        await fetchData();
        onCancel();
        setIsLoadDone(!isLoadDone);
    }

    const onDeleteDocumentInfo = async (id: string) => {
        showDeleteConfirm(async () => {
            await deleteDocumentInfo([id]);
            await fetchData();
            message.success("Xóa dữ liệu thành công!");
        })
        setIsLoadDone(!isLoadDone);
    }

    const onMultiDeleteDocumentInfo = () => {
        const listIdDocumentInfo = multiDatarSelected?.map(item => item.do_in_id);
        showDeleteConfirm(async () => {
            await deleteDocumentInfo(listIdDocumentInfo!);
            await fetchData();
            message.success("Xóa " + listIdDocumentInfo?.length + " dữ liệu thành công!");
        })
        setIsLoadDone(!isLoadDone);
    }

    const onCancel = () => {
        setDocumentInfoSelected(undefined)
        setCreateUpdateFormOpen(false);
    }

    const setMultiDocumentInfoSelect = (data: DocumentInfoDTO[]) => {
        setMultiDataSelected(data);
    }

    const leftCol = isCreateUpdate ? cssResponsive(24, 24, 14, 14, 14, 14) : cssResponsive(24, 24, 24, 24, 24, 24);
    const rightCol = isCreateUpdate ? cssResponsive(24, 24, 10, 10, 10, 10) : cssResponsive(0, 0, 0, 0, 0, 0);

    return (
        <Card>
            <Row gutter={[8, 8]}>
                <Col {...cssResponsive(24, 8, 4, 5, 5, 5)}><h2>Thông tin tài liệu</h2></Col>
                <Col {...cssResponsive(24, 16, 8, 7, 7, 7)}>
                    <Input allowClear placeholder="Nhập tìm kiếm" onChange={(e) => setValueSearch(e.target.value)}></Input>
                </Col>
                <Col {...cssResponsive(24, 24, 12, 12, 12, 12)} className="align-right">
                    <Button type="primary" title="Xuất dữ liệu" icon={<ExportOutlined />} onClick={() => setModalExportOpen(true)}>Xuất dữ liệu</Button>
                </Col>
            </Row>

            <Row gutter={[0, 8]} style={{ margin: "20px 0 10px 0" }}>
                <Col className="align-content">
                    <Button
                        title="Tìm kiếm"
                        icon={<SearchOutlined />}
                        onClick={async () => await fetchData()}
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        danger
                        className="button-danger"
                        title="Xóa dữ liệu"
                        icon={<DeleteOutlined />}
                        onClick={onMultiDeleteDocumentInfo}
                    >
                        Xóa dữ liệu
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col {...leftCol}>
                    <TableDocumentInfo
                        datasource={data}
                        onUpdate={onUpdateModalOpen}
                        onDelete={onDeleteDocumentInfo}
                        setMultiDataSelected={setMultiDocumentInfoSelect}
                    />
                </Col>
                <Col {...rightCol}>
                    <UpdateDocumentInfo
                        documentInfoSelected={documentInfoSelected}
                        onUpdateSuccess={onUpdateSuccess}
                        onCancelData={onCancel}
                    />
                </Col>
                <ExportDocumentInfo
                    openModalExport={isModalExportOpen}
                    setOpenModalExport={setModalExportOpen}
                    datasource={!!multiDatarSelected ? multiDatarSelected! : data}
                />
            </Row>
        </Card>
    );
}

export default DocumentInfo;