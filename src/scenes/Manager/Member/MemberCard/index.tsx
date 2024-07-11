import { Button, Card, Col, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { MemberCardDTO, deleteMemberCard, getMemberCard } from "../../../../stores/MemberCardStore";
import { cssResponsive } from "../../../../components/Manager/Responsive";
import { CreateOrUpdateMemberCard } from "./CreateUpdateMemberCard";
import TableMemberCard from "./TableMemberCard";
import { DeleteOutlined, ExportOutlined, ImportOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import ExportMemberCard from "./ExportMemberCard";
import ImportMemberCard from "./ImportMemberCard";
import { showDeleteConfirm } from "../../../../utils/showDeleteConfirm";

function MemberCard() {
    const [data, setData] = useState<MemberCardDTO[]>([]);
    const [multiDatarSelected, setMultiDataSelected] = useState<MemberCardDTO[]>();
    const [isLoadDone, setIsLoadDone] = useState(true);
    const [memberCardSelected, setMemberCardSelected] = useState<MemberCardDTO>();
    const [isCreateUpdate, setCreateUpdateFormOpen] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [isModalExportOpen, setModalExportOpen] = useState(false);
    const [isModalImportOpen, setModalImportOpen] = useState(false);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const infoArray = await getMemberCard(valueSearch);
        const dataWithIndex = infoArray.map((item, index) => ({ stt: index, ...item }));
        setData(dataWithIndex);
    };

    const onCreateOrUpdateModalOpen = (value?: MemberCardDTO) => {
        if (!!value) setMemberCardSelected(value)
        setCreateUpdateFormOpen(true);
    }

    const onCreateOrUpdateSuccess = async () => {
        await fetchData();
        onCancel();
        setIsLoadDone(!isLoadDone);
    }

    const onDeleteMemberCard = async (id: string) => {
        showDeleteConfirm(async () => {
            await deleteMemberCard([id]);
            await fetchData();
            message.success("Xóa dữ liệu thành công!");
        })
        setIsLoadDone(!isLoadDone);
    }

    const onMultiDeleteMemberCard = () => {
        const listIdMemberCard = multiDatarSelected?.map(item => item.me_ca_id);
        showDeleteConfirm(async () => {
            await deleteMemberCard(listIdMemberCard!);
            await fetchData();
            message.success("Xóa " + listIdMemberCard?.length + " dữ liệu thành công!");
        })
        setIsLoadDone(!isLoadDone);
    }

    const onCancel = () => {
        setMemberCardSelected(undefined)
        setCreateUpdateFormOpen(false);
    }

    const setMultiMemberCardSelect = (data: MemberCardDTO[]) => {
        setMultiDataSelected(data);
    }

    const leftCol = isCreateUpdate ? cssResponsive(24, 24, 14, 14, 14, 14) : cssResponsive(24, 24, 24, 24, 24, 24);
    const rightCol = isCreateUpdate ? cssResponsive(24, 24, 10, 10, 10, 10) : cssResponsive(0, 0, 0, 0, 0, 0);

    return (
        <Card>
            <Row gutter={[8, 8]}>
                <Col {...cssResponsive(24, 24, 4, 4, 4, 4)}><h2>Thẻ độc giả</h2></Col>
                <Col {...cssResponsive(24, 24, 20, 20, 20, 20)} className="align-content-right">
                    <Button type="primary" title="Thêm dữ liệu" icon={<PlusOutlined />} onClick={() => onCreateOrUpdateModalOpen(undefined)}>Thêm dữ liệu</Button>
                    <Button type="primary" title="Nhập dữ liệu" icon={<ImportOutlined />} onClick={() => setModalImportOpen(true)}>Nhập dữ liệu</Button>
                    <Button type="primary" title="Xuất dữ liệu" icon={<ExportOutlined />} onClick={() => setModalExportOpen(true)}>Xuất dữ liệu</Button>
                </Col>
            </Row>

            <Row gutter={[8, 8]} style={{ margin: "20px 0 10px 0" }}>
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
                        onClick={onMultiDeleteMemberCard}
                    >
                        Xóa dữ liệu
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col {...leftCol}>
                    <TableMemberCard
                        datasource={data}
                        onUpdate={onCreateOrUpdateModalOpen}
                        onDelete={onDeleteMemberCard}
                        setMultiDataSelected={setMultiMemberCardSelect}
                    />
                </Col>
                <Col {...rightCol}>
                    <CreateOrUpdateMemberCard
                        memberCardSelected={memberCardSelected}
                        onCreateOrUpdateSuccess={onCreateOrUpdateSuccess}
                        onCancelData={onCancel}
                    />
                </Col>
                <ImportMemberCard
                    openModalImport={isModalImportOpen}
                    setOpenModalImport={setModalImportOpen}
                />
                <ExportMemberCard
                    openModalExport={isModalExportOpen}
                    setOpenModalExport={setModalExportOpen}
                    datasource={!!multiDatarSelected ? multiDatarSelected! : data}
                />
            </Row>
        </Card>
    );
}

export default MemberCard;