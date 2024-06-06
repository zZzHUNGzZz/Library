import { Button, Card, Col, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { MemberBorrowReturningDTO, deleteMemberBorrowReturning, getMemberBorrowReturning } from "../../../../stores/MemberBorrowReturningStore";
import { cssResponsive } from "../../../../components/Manager/Responsive";
import { CreateOrUpdateMemberBorrowReturning } from "./CreateUpdateMemberBorrowReturning";
import TableMemberBorrowReturning from "./TableMemberBorrowReturning";
import { DeleteOutlined, ExportOutlined, ImportOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import ExportMemberBorrowReturning from "./ExportMemberBorrowReturning";
import { showDeleteConfirm } from "../../../../utils/showDeleteConfirm";
import ImportMemberBorrowReturning from "./ImportMemberBorrowReturning";

function MemberBorrowReturning() {
    const [data, setData] = useState<MemberBorrowReturningDTO[]>([]);
    const [multiDatarSelected, setMultiDataSelected] = useState<MemberBorrowReturningDTO[]>();
    const [isLoadDone, setIsLoadDone] = useState(true);
    const [memberBorrowReturningSelected, setMemberBorrowReturningSelected] = useState<MemberBorrowReturningDTO>();
    const [isCreateUpdate, setCreateUpdateFormOpen] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [isModalExportOpen, setModalExportOpen] = useState(false);
    const [isModalImportOpen, setModalImportOpen] = useState(false);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const infoArray = await getMemberBorrowReturning(valueSearch);
        const dataWithIndex = infoArray.map((item, index) => ({ stt: index, ...item }));
        setData(dataWithIndex);
    };

    const onCreateOrUpdateModalOpen = (value?: MemberBorrowReturningDTO) => {
        if (!!value) setMemberBorrowReturningSelected(value)
        setCreateUpdateFormOpen(true);
    }

    const onCreateOrUpdateSuccess = async () => {
        await fetchData();
        onCancel();
        setIsLoadDone(!isLoadDone);
    }

    const onDeleteMemberBorrowReturning = async (id: string) => {
        showDeleteConfirm(async () => {
            await deleteMemberBorrowReturning([id]);
            await fetchData();
            message.success("Xóa dữ liệu thành công!");
        })
        setIsLoadDone(!isLoadDone);
    }

    const onMultiDeleteMemberBorrowReturning = () => {
        const listIdMemberBorrowReturning = multiDatarSelected?.map(item => item.br_re_id);
        showDeleteConfirm(async () => {
            await deleteMemberBorrowReturning(listIdMemberBorrowReturning!);
            await fetchData();
            message.success("Xóa " + listIdMemberBorrowReturning?.length + " dữ liệu thành công!");
        })
        setIsLoadDone(!isLoadDone);
    }

    const onCancel = () => {
        setMemberBorrowReturningSelected(undefined)
        setCreateUpdateFormOpen(false);
    }

    const setMultiMemberBorrowReturningSelect = (data: MemberBorrowReturningDTO[]) => {
        setMultiDataSelected(data);
    }

    const leftCol = isCreateUpdate ? cssResponsive(24, 24, 14, 14, 14, 14) : cssResponsive(24, 24, 24, 24, 24, 24);
    const rightCol = isCreateUpdate ? cssResponsive(24, 24, 10, 10, 10, 10) : cssResponsive(0, 0, 0, 0, 0, 0);

    return (
        <Card>
            <Row gutter={[8, 8]}>
                <Col {...cssResponsive(24, 8, 4, 5, 5, 5)}><h2>Độc giả mượn</h2></Col>
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
                        onClick={onMultiDeleteMemberBorrowReturning}
                    >
                        Xóa dữ liệu
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col {...leftCol}>
                    <TableMemberBorrowReturning
                        datasource={data}
                        onUpdate={onCreateOrUpdateModalOpen}
                        onDelete={onDeleteMemberBorrowReturning}
                        setMultiDataSelected={setMultiMemberBorrowReturningSelect}
                    />
                </Col>
                <Col {...rightCol}>
                    <CreateOrUpdateMemberBorrowReturning
                        memberBorrowReturningSelected={memberBorrowReturningSelected}
                        onCreateOrUpdateSuccess={onCreateOrUpdateSuccess}
                        onCancelData={onCancel}
                    />
                </Col>
                <ImportMemberBorrowReturning
                    openModalImport={isModalImportOpen}
                    setOpenModalImport={setModalImportOpen}
                />
                <ExportMemberBorrowReturning
                    openModalExport={isModalExportOpen}
                    setOpenModalExport={setModalExportOpen}
                    datasource={!!multiDatarSelected ? multiDatarSelected! : data}
                />
            </Row>
        </Card>
    );
}

export default MemberBorrowReturning;