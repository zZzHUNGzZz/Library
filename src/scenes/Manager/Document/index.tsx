import { Button, Card, Col, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { DocumentDTO, deleteDocument, getDocument } from "../../../stores/DocumentStore";
import { cssResponsive } from "../../../components/Manager/Responsive";
import { CreateOrUpdateDocument } from "./CreateUpdateDocument";
import TableDocument from "./TableDocument";
import { DeleteOutlined, ExportOutlined, ImportOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import ExportDocument from "./ExportDocument";
import ImportDocument from "./ImportDocument";
import { showDeleteConfirm } from "../../../utils/showDeleteConfirm";

function Document() {
    const [data, setData] = useState<DocumentDTO[]>([]);
    const [multiDatarSelected, setMultiDataSelected] = useState<DocumentDTO[]>();
    const [isLoadDone, setIsLoadDone] = useState(true);
    const [documentSelected, setDocumentSelected] = useState<DocumentDTO>();
    const [isCreateUpdate, setCreateUpdateFormOpen] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [isModalExportOpen, setModalExportOpen] = useState(false);
    const [isModalImportOpen, setModalImportOpen] = useState(false);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const infoArray = await getDocument(valueSearch);
        const dataWithIndex = infoArray.map((item, index) => ({ stt: index, ...item }));
        setData(dataWithIndex);
    };

    const onCreateOrUpdateModalOpen = (value?: DocumentDTO) => {
        if (!!value) setDocumentSelected(value)
        setCreateUpdateFormOpen(true);
    }

    const onCreateOrUpdateSuccess = async () => {
        await fetchData();
        onCancel();
        setIsLoadDone(!isLoadDone);
    }

    const onDeleteDocument = async (id: string) => {
        showDeleteConfirm(async () => {
            await deleteDocument([id]);
            await fetchData();
            message.success("Xóa dữ liệu thành công!");
        })
        setIsLoadDone(!isLoadDone);
    }

    const onMultiDeleteDocument = () => {
        const listIdDocument = multiDatarSelected?.map(item => item.do_id);
        showDeleteConfirm(async () => {
            await deleteDocument(listIdDocument!);
            await fetchData();
            message.success("Xóa " + listIdDocument?.length + " dữ liệu thành công!");
        })
        setIsLoadDone(!isLoadDone);
    }

    const onCancel = () => {
        setDocumentSelected(undefined)
        setCreateUpdateFormOpen(false);
    }

    const setMultiDocumentSelect = (data: DocumentDTO[]) => {
        setMultiDataSelected(data);
    }

    const leftCol = isCreateUpdate ? cssResponsive(24, 24, 14, 14, 14, 14) : cssResponsive(24, 24, 24, 24, 24, 24);
    const rightCol = isCreateUpdate ? cssResponsive(24, 24, 10, 10, 10, 10) : cssResponsive(0, 0, 0, 0, 0, 0);

    return (
        <Card>
            <Row gutter={[8, 8]}>
                <Col {...cssResponsive(24, 24, 4, 4, 4, 4)}><h2>Tài liệu</h2></Col>
                <Col {...cssResponsive(24, 24, 20, 20, 20, 20)} className="align-content-right">
                    <Button type="primary" title="Thêm dữ liệu" icon={<PlusOutlined />} onClick={() => onCreateOrUpdateModalOpen(undefined)}>Thêm dữ liệu</Button>
                    <Button type="primary" title="Nhập dữ liệu" icon={<ImportOutlined />} onClick={() => setModalImportOpen(true)}>Nhập dữ liệu</Button>
                    <Button type="primary" title="Xuất dữ liệu" icon={<ExportOutlined />} onClick={() => setModalExportOpen(true)}>Xuất dữ liệu</Button>
                </Col>
            </Row>

            <Row gutter={[8, 8]} style={{ margin: "10px 0 10px 0" }}>
                <Col {...cssResponsive(24, 24, 8, 6, 6, 6)}>
                    <Input allowClear placeholder="Nhập tìm kiếm" onChange={(e) => setValueSearch(e.target.value)}></Input>
                </Col>
                <Col {...cssResponsive(12, 12, 8, 6, 6, 6)}>
                    <Button
                        title="Tìm kiếm"
                        icon={<SearchOutlined />}
                        onClick={async () => await fetchData()}
                    >
                        Tìm kiếm
                    </Button>
                </Col>
                <Col {...cssResponsive(12, 12, 8, 12, 12, 12)} style={{ textAlign: 'right' }}>
                    <Button
                        danger
                        type="primary"
                        className="button-danger"
                        title="Xóa dữ liệu"
                        icon={<DeleteOutlined />}
                        onClick={onMultiDeleteDocument}
                    >
                        Xóa dữ liệu
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col {...leftCol}>
                    <TableDocument
                        datasource={data}
                        onUpdate={onCreateOrUpdateModalOpen}
                        onDelete={onDeleteDocument}
                        setMultiDataSelected={setMultiDocumentSelect}
                    />
                </Col>
                <Col {...rightCol}>
                    <CreateOrUpdateDocument
                        documentSelected={documentSelected}
                        onCreateOrUpdateSuccess={onCreateOrUpdateSuccess}
                        onCancelData={onCancel}
                    />
                </Col>
                <ImportDocument
                    openModalImport={isModalImportOpen}
                    setOpenModalImport={setModalImportOpen}
                />
                <ExportDocument
                    openModalExport={isModalExportOpen}
                    setOpenModalExport={setModalExportOpen}
                    datasource={!!multiDatarSelected ? multiDatarSelected! : data}
                />
            </Row>
        </Card>
    );
}

export default Document;