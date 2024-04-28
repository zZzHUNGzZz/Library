import { Button, Card, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { DocumentStore, deleteDocument, getDocument } from "../../../../stores/DocumentStore";
import { cssResponsive } from "../../../../components/Manager/AppConst";
import { CreateOrUpdateDocument } from "./CreateUpdateDocument";
import TableDocument from "./TableDocument";

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
                <Col span={12}><h2 style={{ color: '#0958d9' }}>Tài liệu</h2></Col>
                <Col span={12} className="align-right">
                    <Button type="primary" onClick={() => onCreateOrUpdateModalOpen(undefined)}>Thêm dữ liệu</Button>
                    <Button type="primary">Xuất dữ liệu</Button>
                    <Button type="primary">Nhập dữ liệu</Button>
                </Col>
            </Row>
            <Row gutter={8} style={{ margin: "20px 0" }}>
                <Col span={6}>
                    <p className="p-title-search">Tên tài liệu</p>
                    <Input></Input>
                </Col>
                <Col span={6}>
                    <p className="p-title-search">Tác giả</p>
                    <Input></Input>
                </Col>
                <Col span={6}>
                    <p className="p-title-search">Năm xuất bản</p>
                    <Input></Input>
                </Col>
                <Col span={6}>
                    <p className="p-title-search">Mã đầu sách</p>
                    <Input></Input>
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