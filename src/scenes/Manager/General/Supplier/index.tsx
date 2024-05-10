import { Button, Card, Col, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { SupplierDTO, deleteSupplier, getSupplier } from "../../../../stores/SupplierStore";
import { cssResponsive } from "../../../../components/Manager/AppConst";
import { CreateOrUpdateSupplier } from "./CreateUpdateSupplier";
import TableSupplier from "./TableSupplier";
import { DeleteOutlined, ExportOutlined, ImportOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import ExportSupplier from "./ExportSupplier";
import ImportSupplier from "./ImportSupplier";

function Supplier() {
    const [data, setData] = useState<SupplierDTO[]>([]);
    const [multiDatarSelected, setMultiDataSelected] = useState<SupplierDTO[]>();
    const [isLoadDone, setIsLoadDone] = useState(true);
    const [supplierSelected, setSupplierSelected] = useState<SupplierDTO>();
    const [isCreateUpdate, setCreateUpdateFormOpen] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [isModalExportOpen, setModalExportOpen] = useState(false);
    const [isModalImportOpen, setModalImportOpen] = useState(false);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const infoArray = await getSupplier(valueSearch);
        const dataWithIndex = infoArray.map((item, index) => ({ stt: index, ...item }));
        setData(dataWithIndex);
    };

    const onCreateOrUpdateModalOpen = (value?: SupplierDTO) => {
        if (!!value) setSupplierSelected(value)
        setCreateUpdateFormOpen(true);
    }

    const onCreateOrUpdateSuccess = async () => {
        await fetchData();
        onCancel();
        setIsLoadDone(!isLoadDone);
    }

    const onDeleteSupplier = async (id: string) => {
        await deleteSupplier([id]);
        await fetchData();
        message.success("Xóa dữ liệu thành công!");
        setIsLoadDone(!isLoadDone);
    }

    const onMultiDeleteSupplier = async () => {
        const listIdSupplier = multiDatarSelected?.map(item => item.su_id)
        await deleteSupplier(listIdSupplier!);
        await fetchData();
        message.success("Xóa " + listIdSupplier?.length + " dữ liệu thành công!");
        setIsLoadDone(!isLoadDone);
    }

    const onCancel = () => {
        setSupplierSelected(undefined)
        setCreateUpdateFormOpen(false);
    }

    const setMultiSupplierSelect = (data: SupplierDTO[]) => {
        setMultiDataSelected(data);
    }

    const leftCol = isCreateUpdate ? cssResponsive(24, 24, 14, 14, 14, 14) : cssResponsive(24, 24, 24, 24, 24, 24);
    const rightCol = isCreateUpdate ? cssResponsive(24, 24, 10, 10, 10, 10) : cssResponsive(0, 0, 0, 0, 0, 0);

    return (
        <Card>
            <Row gutter={[8, 8]}>
                <Col {...cssResponsive(24, 8, 4, 5, 5, 5)}><h2>Nhà cung cấp</h2></Col>
                <Col {...cssResponsive(24, 16, 8, 7, 7, 7)}>
                    <Input allowClear placeholder="Nhập tìm kiếm" onChange={(e) => setValueSearch(e.target.value)}></Input>
                </Col>
                <Col {...cssResponsive(24, 24, 12, 12, 12, 12)} className="align-right">
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
                        onClick={onMultiDeleteSupplier}
                    >
                        Xóa dữ liệu
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col {...leftCol}>
                    <TableSupplier
                        datasource={data}
                        onUpdate={onCreateOrUpdateModalOpen}
                        onDelete={onDeleteSupplier}
                        setMultiDataSelected={setMultiSupplierSelect}
                    />
                </Col>
                <Col {...rightCol}>
                    <CreateOrUpdateSupplier
                        supplierSelected={supplierSelected}
                        onCreateOrUpdateSuccess={onCreateOrUpdateSuccess}
                        onCancelData={onCancel}
                    />
                </Col>
                <ImportSupplier
                    openModalImport={isModalImportOpen}
                    setOpenModalImport={setModalImportOpen}
                />
                <ExportSupplier
                    openModalExport={isModalExportOpen}
                    setOpenModalExport={setModalExportOpen}
                    datasource={!!multiDatarSelected ? multiDatarSelected! : data}
                />
            </Row>
        </Card>
    );
}

export default Supplier;