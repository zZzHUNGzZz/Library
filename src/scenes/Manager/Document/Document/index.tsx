import { Button, Card, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { DocumentStore, deleteDocument, getDocument } from "../../../../stores/DocumentStore";
import { cssResponsive } from "../../../../components/Manager/AppConst";
import { CreateOrUpdateDocument } from "./CreateUpdateDocument";
import TableDocument from "./TableDocument";
import { DeleteOutlined, ExportOutlined, ImportOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";

function Document() {
    const [data, setData] = useState<DocumentStore[]>([]);
    const [isLoadDone, setIsLoadDone] = useState(true);
    const [documentSelected, setdocumentSelected] = useState<DocumentStore>()
    const [isCreateUpdate, setCreateUpdateFormOpen] = useState(false);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        try {
            const infoArray = await getDocument();
            const dataWithIndex = infoArray.map((item, index) => ({ ...item, stt: index }));
            setData(dataWithIndex);

        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    const onCreateOrUpdateModalOpen = (value?: DocumentStore) => {
        if (!!value) setdocumentSelected(value)
        setCreateUpdateFormOpen(true);
    }

    const onCreateOrUpdateSuccess = async () => {
        await fetchData();
        onCancel();
        setIsLoadDone(!isLoadDone);
    }

    const onDeleteDocument = async (id: string) => {
        await deleteDocument(id);
        await fetchData();
        setIsLoadDone(!isLoadDone);
    }

    const onCancel = () => {
        setdocumentSelected(undefined)
        setCreateUpdateFormOpen(false);
    }

    const leftCol = isCreateUpdate ? cssResponsive(24, 24, 14, 14, 14, 14) : cssResponsive(24, 24, 24, 24, 24, 24);
    const rightCol = isCreateUpdate ? cssResponsive(24, 24, 10, 10, 10, 10) : cssResponsive(0, 0, 0, 0, 0, 0);
    return (
        <Card>
            <Row>
                <Col {...cssResponsive(24, 24, 12, 12, 12, 12)}><h2>Tài liệu</h2></Col>
                <Col {...cssResponsive(24, 24, 12, 12, 12, 12)} className="align-right">
                    <Button type="primary" title="Thêm dữ liệu" icon={<PlusOutlined />}
                        onClick={() => onCreateOrUpdateModalOpen(undefined)}>Thêm dữ liệu</Button>
                    <Button type="primary" title="Nhập dữ liệu" icon={<ImportOutlined />} >Nhập dữ liệu</Button>
                    <Button type="primary" title="Xuất dữ liệu" icon={<ExportOutlined />} >Xuất dữ liệu</Button>
                </Col>
            </Row>
            <Row gutter={[8, 8]} style={{ margin: "20px 0 10px 0" }}>
                <Col {...cssResponsive(24, 12, 6, 6, 6, 4)}>
                    <p className="p-title-search">Tên tài liệu</p>
                    <Input></Input>
                </Col>
                <Col {...cssResponsive(24, 12, 6, 6, 6, 4)}>
                    <p className="p-title-search">Tác giả</p>
                    <Input></Input>
                </Col>
                <Col {...cssResponsive(24, 12, 6, 6, 6, 4)}>
                    <p className="p-title-search">Năm xuất bản</p>
                    <Input></Input>
                </Col>
                <Col {...cssResponsive(24, 12, 6, 6, 6, 4)}>
                    <p className="p-title-search">Mã đầu sách</p>
                    <Input></Input>
                </Col>
            </Row>
            <Row gutter={[0, 8]} style={{ margin: "20px 0 10px 0" }}>
                <Col {...cssResponsive(24, 24, 12, 12, 12, 12)} className="align-content">
                    <Button title="Tìm kiếm" icon={<SearchOutlined />}>Tìm kiếm</Button>
                    <Button title="Xóa tìm kiếm" className="button-danger" danger icon={<DeleteOutlined />}>Xóa tìm kiếm</Button>
                </Col>
                <Col {...cssResponsive(24, 24, 12, 12, 12, 12)} className="align-right">
                    <Button title="Thao tác hàng loạt" type="primary">Thao tác hàng loạt</Button>
                </Col>
            </Row>
            <Row>
                <Col {...leftCol}>
                    <TableDocument
                        datasource={data}
                        onUpdate={onCreateOrUpdateModalOpen}
                        onDelete={onDeleteDocument}
                    />
                </Col>
                <Col {...rightCol}>
                    <CreateOrUpdateDocument
                        documentSelected={documentSelected}
                        onCreateOrUpdateSuccess={onCreateOrUpdateSuccess}
                        onCancelData={onCancel}
                    />
                </Col>
            </Row>
        </Card>
    );
}

export default Document;