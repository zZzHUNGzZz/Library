import { Button, Card, Col, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { AuthorDTO, deleteAuthor, getAuthor } from "../../../../stores/AuthorStore";
import { cssResponsive } from "../../../../components/Manager/Responsive";
import { CreateOrUpdateAuthor } from "./CreateUpdateAuthor";
import TableAuthor from "./TableAuthor";
import { DeleteOutlined, ExportOutlined, ImportOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import ExportAuthor from "./ExportAuthor";
import ImportAuthor from "./ImportAuthor";
import { showDeleteConfirm } from "../../../../utils/showDeleteConfirm";

function Author() {
    const [data, setData] = useState<AuthorDTO[]>([]);
    const [multiDatarSelected, setMultiDataSelected] = useState<AuthorDTO[]>();
    const [isLoadDone, setIsLoadDone] = useState(true);
    const [authorSelected, setAuthorSelected] = useState<AuthorDTO>();
    const [isCreateUpdate, setCreateUpdateFormOpen] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [isModalExportOpen, setModalExportOpen] = useState(false);
    const [isModalImportOpen, setModalImportOpen] = useState(false);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const infoArray = await getAuthor(valueSearch);
        const dataWithIndex = infoArray.map((item, index) => ({ stt: index, ...item }));
        setData(dataWithIndex);
    };

    const onCreateOrUpdateModalOpen = (value?: AuthorDTO) => {
        if (!!value) setAuthorSelected(value)
        setCreateUpdateFormOpen(true);
    }

    const onCreateOrUpdateSuccess = async () => {
        await fetchData();
        onCancel();
        setIsLoadDone(!isLoadDone);
    }

    const onDeleteAuthor = async (id: string) => {
        showDeleteConfirm(async () => {
            await deleteAuthor([id]);
            await fetchData();
            message.success("Xóa dữ liệu thành công!");
        })
        setIsLoadDone(!isLoadDone);
    }

    const onMultiDeleteAuthor = () => {
        const listIdAuthor = multiDatarSelected?.map(item => item.au_id);
        showDeleteConfirm(async () => {
            await deleteAuthor(listIdAuthor!);
            await fetchData();
            message.success("Xóa " + listIdAuthor?.length + " dữ liệu thành công!");
        })
        setIsLoadDone(!isLoadDone);
    }

    const onCancel = () => {
        setAuthorSelected(undefined)
        setCreateUpdateFormOpen(false);
    }

    const setMultiAuthorSelect = (data: AuthorDTO[]) => {
        setMultiDataSelected(data);
    }

    const leftCol = isCreateUpdate ? cssResponsive(24, 24, 14, 14, 14, 14) : cssResponsive(24, 24, 24, 24, 24, 24);
    const rightCol = isCreateUpdate ? cssResponsive(24, 24, 10, 10, 10, 10) : cssResponsive(0, 0, 0, 0, 0, 0);

    return (
        <Card>
            <Row gutter={[8, 8]}>
                <Col {...cssResponsive(24, 8, 4, 5, 5, 5)}><h2>Tác giả</h2></Col>
                <Col {...cssResponsive(24, 16, 8, 7, 7, 7)}>
                    <Input allowClear placeholder="Nhập tìm kiếm" onChange={(e) => setValueSearch(e.target.value)}></Input>
                </Col>
                <Col {...cssResponsive(24, 24, 12, 12, 12, 12)} className="align-content-right">
                    <Button type="primary" title="Thêm dữ liệu" icon={<PlusOutlined />} onClick={() => onCreateOrUpdateModalOpen(undefined)}>Thêm dữ liệu</Button>
                    <Button type="primary" title="Nhập dữ liệu" icon={<ImportOutlined />} onClick={() => setModalImportOpen(true)}>Nhập dữ liệu</Button>
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
                        onClick={onMultiDeleteAuthor}
                    >
                        Xóa dữ liệu
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col {...leftCol}>
                    <TableAuthor
                        datasource={data}
                        onUpdate={onCreateOrUpdateModalOpen}
                        onDelete={onDeleteAuthor}
                        setMultiDataSelected={setMultiAuthorSelect}
                    />
                </Col>
                <Col {...rightCol}>
                    <CreateOrUpdateAuthor
                        authorSelected={authorSelected}
                        onCreateOrUpdateSuccess={onCreateOrUpdateSuccess}
                        onCancelData={onCancel}
                    />
                </Col>
                <ImportAuthor
                    openModalImport={isModalImportOpen}
                    setOpenModalImport={setModalImportOpen}
                />
                <ExportAuthor
                    openModalExport={isModalExportOpen}
                    setOpenModalExport={setModalExportOpen}
                    datasource={!!multiDatarSelected ? multiDatarSelected! : data}
                />
            </Row>
        </Card>
    );
}

export default Author;