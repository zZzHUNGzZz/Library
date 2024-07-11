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
    const [isViewDocumentBorrowed, setIsViewDocumentBorrowed] = useState(false);
    const [isReturnDocumentBorrowed, setIsReturnDocumentBorrowed] = useState(false);

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

    const onViewDocumentBorrowed = (value?: MemberBorrowReturningDTO) => {
        if (!!value) setMemberBorrowReturningSelected(value);
        setIsViewDocumentBorrowed(true);
        setCreateUpdateFormOpen(true);
    }

    const onReturnDocumentBorrowed = (value?: MemberBorrowReturningDTO) => {
        if (!!value) setMemberBorrowReturningSelected(value);
        setIsReturnDocumentBorrowed(true);
        setCreateUpdateFormOpen(true);
    }

    const onCancel = () => {
        setMemberBorrowReturningSelected(undefined)
        setIsViewDocumentBorrowed(false);
        setCreateUpdateFormOpen(false);
        setIsReturnDocumentBorrowed(false);
    }

    const setMultiMemberBorrowReturningSelect = (data: MemberBorrowReturningDTO[]) => {
        setMultiDataSelected(data);
    }

    return (
        <Card>
            {!isCreateUpdate &&
                <>
                    <Row gutter={[8, 8]}>
                        <Col {...cssResponsive(24, 24, 5, 5, 5, 5)}><h2>Độc giả mượn</h2></Col>
                        <Col {...cssResponsive(24, 24, 19, 19, 19, 19)} className="align-content-right">
                            <Button type="primary" title="Thêm dữ liệu" icon={<PlusOutlined />} onClick={() => onCreateOrUpdateModalOpen(undefined)}>Thêm dữ liệu</Button>
                            {/* <Button type="primary" title="Nhập dữ liệu" icon={<ImportOutlined />} onClick={() => setModalImportOpen(true)}>Nhập dữ liệu</Button> */}
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
                                onClick={onMultiDeleteMemberBorrowReturning}
                            >
                                Xóa dữ liệu
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <TableMemberBorrowReturning
                                datasource={data}
                                onView={onViewDocumentBorrowed}
                                onReturn={onReturnDocumentBorrowed}
                                onUpdate={onCreateOrUpdateModalOpen}
                                onDelete={onDeleteMemberBorrowReturning}
                                setMultiDataSelected={setMultiMemberBorrowReturningSelect}
                            />
                        </Col>
                        <ImportMemberBorrowReturning
                            openModalImport={isModalImportOpen}
                            setOpenModalImport={setModalImportOpen}
                        />
                        <ExportMemberBorrowReturning
                            openModalExport={isModalExportOpen}
                            setOpenModalExport={setModalExportOpen}
                            datasource={multiDatarSelected?.length! > 0 ? multiDatarSelected! : data}
                        />
                    </Row>
                </>
            }
            {isCreateUpdate &&
                <CreateOrUpdateMemberBorrowReturning
                    isViewDocumentBorrowed={isViewDocumentBorrowed}
                    isReturnDocumentBorrowed={isReturnDocumentBorrowed}
                    memberBorrowReturningSelected={memberBorrowReturningSelected}
                    onCreateOrUpdateSuccess={onCreateOrUpdateSuccess}
                    onCancelData={onCancel}
                />}
        </Card>
    );
}

export default MemberBorrowReturning;