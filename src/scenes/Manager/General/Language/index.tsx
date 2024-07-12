import { Button, Card, Col, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { LanguageDTO, deleteLanguage, getLanguage } from "../../../../stores/LanguageStore";
import { cssResponsive } from "../../../../components/Manager/Responsive";
import { CreateOrUpdateLanguage } from "./CreateUpdateLanguage";
import TableLanguage from "./TableLanguage";
import { DeleteOutlined, ExportOutlined, ImportOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import ExportLanguage from "./ExportLanguage";
import ImportLanguage from "./ImportLanguage";
import { showDeleteConfirm } from "../../../../utils/showDeleteConfirm";

function Language() {
    const [data, setData] = useState<LanguageDTO[]>([]);
    const [multiDatarSelected, setMultiDataSelected] = useState<LanguageDTO[]>();
    const [isLoadDone, setIsLoadDone] = useState(true);
    const [languageSelected, setLanguageSelected] = useState<LanguageDTO>();
    const [isCreateUpdate, setCreateUpdateFormOpen] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [isModalExportOpen, setModalExportOpen] = useState(false);
    const [isModalImportOpen, setModalImportOpen] = useState(false);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const infoArray = await getLanguage(valueSearch);
        const dataWithIndex = infoArray.map((item, index) => ({ stt: index, ...item }));
        setData(dataWithIndex);
    };

    const onCreateOrUpdateModalOpen = (value?: LanguageDTO) => {
        if (!!value) setLanguageSelected(value)
        setCreateUpdateFormOpen(true);
    }

    const onCreateOrUpdateSuccess = async () => {
        await fetchData();
        onCancel();
        setIsLoadDone(!isLoadDone);
    }

    const onDeleteLanguage = async (id: string) => {
        showDeleteConfirm(async () => {
            await deleteLanguage([id]);
            await fetchData();
            message.success("Xóa dữ liệu thành công!");
        })
        setIsLoadDone(!isLoadDone);
    }

    const onMultiDeleteLanguage = () => {
        const listIdLanguage = multiDatarSelected?.map(item => item.la_id);
        showDeleteConfirm(async () => {
            await deleteLanguage(listIdLanguage!);
            await fetchData();
            message.success("Xóa " + listIdLanguage?.length + " dữ liệu thành công!");
        })
        setIsLoadDone(!isLoadDone);
    }

    const onCancel = () => {
        setLanguageSelected(undefined)
        setCreateUpdateFormOpen(false);
    }

    const setMultiLanguageSelect = (data: LanguageDTO[]) => {
        setMultiDataSelected(data);
    }

    const leftCol = isCreateUpdate ? cssResponsive(24, 24, 14, 14, 14, 14) : cssResponsive(24, 24, 24, 24, 24, 24);
    const rightCol = isCreateUpdate ? cssResponsive(24, 24, 10, 10, 10, 10) : cssResponsive(0, 0, 0, 0, 0, 0);

    return (
        <Card>
            <Row gutter={[8, 8]}>
                <Col {...cssResponsive(24, 24, 4, 4, 4, 4)}><h2>Ngôn ngữ</h2></Col>
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
                <Col {...cssResponsive(24, 24, 8, 6, 6, 6)}>
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
                        onClick={onMultiDeleteLanguage}
                    >
                        Xóa dữ liệu
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col {...leftCol}>
                    <TableLanguage
                        datasource={data}
                        onUpdate={onCreateOrUpdateModalOpen}
                        onDelete={onDeleteLanguage}
                        setMultiDataSelected={setMultiLanguageSelect}
                    />
                </Col>
                <Col {...rightCol}>
                    <CreateOrUpdateLanguage
                        languageSelected={languageSelected}
                        onCreateOrUpdateSuccess={onCreateOrUpdateSuccess}
                        onCancelData={onCancel}
                    />
                </Col>
                <ImportLanguage
                    openModalImport={isModalImportOpen}
                    setOpenModalImport={setModalImportOpen}
                />
                <ExportLanguage
                    openModalExport={isModalExportOpen}
                    setOpenModalExport={setModalExportOpen}
                    datasource={!!multiDatarSelected ? multiDatarSelected! : data}
                />
            </Row>
        </Card>
    );
}

export default Language;