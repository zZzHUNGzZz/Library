import { Button, Card, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { AuthorStore, deleteAuthor, getAuthor } from "../../../../stores/AuthorStore";
import { cssResponsive } from "../../../../components/Manager/AppConst";
import { CreateOrUpdateAuthor } from "./CreateUpdateAuthor";
import TableAuthor from "./TableAuthor";
import { DeleteOutlined, ExportOutlined, ImportOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import ExportAuthor from "./ExportAuthor";

function Author() {
    const [data, setData] = useState<AuthorStore[]>([]);
    const [multiDatarSelected, setMultiDataSelected] = useState<AuthorStore[]>()
    const [isLoadDone, setIsLoadDone] = useState(true);
    const [authorSelected, setAuthorSelected] = useState<AuthorStore>()
    const [isCreateUpdate, setCreateUpdateFormOpen] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [isModalExportOpen, setModalExportOpen] = useState(false)

    useEffect(() => { fetchData() }, []);
    const fetchData = async () => {
        try {
            const infoArray = await getAuthor(valueSearch);
            const dataWithIndex = infoArray.map((item, index) => ({ stt: index, ...item }));
            setData(dataWithIndex);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    const onCreateOrUpdateModalOpen = (value?: AuthorStore) => {
        if (!!value) setAuthorSelected(value)
        setCreateUpdateFormOpen(true);
    }

    const onCreateOrUpdateSuccess = async () => {
        await fetchData();
        onCancel();
        setIsLoadDone(!isLoadDone);
    }

    const onDeleteAuthor = async (id: string) => {
        await deleteAuthor(id);
        await fetchData();
        setIsLoadDone(!isLoadDone);
    }

    const onCancel = () => {
        setAuthorSelected(undefined)
        setCreateUpdateFormOpen(false);
    }

    const setMultiAuthorSelect = (data: AuthorStore[]) => {
        setMultiDataSelected(data);
    }
    const leftCol = isCreateUpdate ? cssResponsive(24, 24, 14, 14, 14, 14) : cssResponsive(24, 24, 24, 24, 24, 24);
    const rightCol = isCreateUpdate ? cssResponsive(24, 24, 10, 10, 10, 10) : cssResponsive(0, 0, 0, 0, 0, 0);
    return (
        <Card>
            <Row gutter={[8, 8]} align={"bottom"}>
                <Col {...cssResponsive(24, 8, 4, 5, 5, 5)}><h2>Tác giả</h2></Col>
                <Col {...cssResponsive(24, 16, 8, 7, 7, 7)}>
                    <p className="p-title-search">Tác giả</p>
                    <Input placeholder="Mã, tên, bút danh" onChange={(e) => setValueSearch(e.target.value)}></Input>
                </Col>
                <Col {...cssResponsive(24, 24, 12, 12, 12, 12)} className="align-right">
                    <Button type="primary" title="Thêm dữ liệu" icon={<PlusOutlined />}
                        onClick={() => onCreateOrUpdateModalOpen(undefined)}>Thêm dữ liệu</Button>
                    <Button type="primary" title="Nhập dữ liệu" icon={<ImportOutlined />} >Nhập dữ liệu</Button>

                    <Button
                        type="primary"
                        title="Xuất dữ liệu"
                        icon={<ExportOutlined />}
                        onClick={() => setModalExportOpen(true)}
                    >
                        Xuất dữ liệu
                    </Button>
                </Col>
            </Row>

            <Row gutter={[0, 8]} style={{ margin: "20px 0 10px 0" }}>
                <Col {...cssResponsive(24, 24, 12, 12, 12, 12)} className="align-content">
                    <Button
                        title="Tìm kiếm"
                        icon={<SearchOutlined />}
                        onClick={async () => await fetchData()}
                    >
                        Tìm kiếm
                    </Button>
                    <Button title="Xóa tìm kiếm" className="button-danger" danger icon={<DeleteOutlined />}>Xóa tìm kiếm</Button>
                </Col>
                <Col {...cssResponsive(24, 24, 12, 12, 12, 12)} className="align-right">
                    <Button title="Thao tác hàng loạt" type="primary">Thao tác hàng loạt</Button>
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