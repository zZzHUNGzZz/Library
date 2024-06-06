import { Button, Card, Col, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { MemberDTO, deleteMember, getMember } from "../../../../stores/MemberStore";
import { cssResponsive } from "../../../../components/Manager/Responsive";
import { CreateOrUpdateMember } from "./CreateUpdateMember";
import TableMember from "./TableMember";
import { DeleteOutlined, ExportOutlined, ImportOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import ExportMember from "./ExportMember";
import ImportMember from "./ImportMember";
import { showDeleteConfirm } from "../../../../utils/showDeleteConfirm";

function Member() {
    const [data, setData] = useState<MemberDTO[]>([]);
    const [multiDatarSelected, setMultiDataSelected] = useState<MemberDTO[]>();
    const [isLoadDone, setIsLoadDone] = useState(true);
    const [memberSelected, setMemberSelected] = useState<MemberDTO>();
    const [isCreateUpdate, setCreateUpdateFormOpen] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [isModalExportOpen, setModalExportOpen] = useState(false);
    const [isModalImportOpen, setModalImportOpen] = useState(false);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const infoArray = await getMember(valueSearch);
        const dataWithIndex = infoArray.map((item, index) => ({ stt: index, ...item }));
        setData(dataWithIndex);
    };

    const onCreateOrUpdateModalOpen = (value?: MemberDTO) => {
        if (!!value) setMemberSelected(value)
        setCreateUpdateFormOpen(true);
    }

    const onCreateOrUpdateSuccess = async () => {
        await fetchData();
        onCancel();
        setIsLoadDone(!isLoadDone);
    }

    const onDeleteMember = async (id: string) => {
        showDeleteConfirm(async () => {
            await deleteMember([id]);
            await fetchData();
            message.success("Xóa dữ liệu thành công!");
        })
        setIsLoadDone(!isLoadDone);
    }

    const onMultiDeleteMember = () => {
        const listIdMember = multiDatarSelected?.map(item => item.me_id);
        showDeleteConfirm(async () => {
            await deleteMember(listIdMember!);
            await fetchData();
            message.success("Xóa " + listIdMember?.length + " dữ liệu thành công!");
        })
        setIsLoadDone(!isLoadDone);
    }

    const onCancel = () => {
        setMemberSelected(undefined)
        setCreateUpdateFormOpen(false);
    }

    const setMultiMemberSelect = (data: MemberDTO[]) => {
        setMultiDataSelected(data);
    }

    const leftCol = isCreateUpdate ? cssResponsive(24, 24, 14, 14, 14, 14) : cssResponsive(24, 24, 24, 24, 24, 24);
    const rightCol = isCreateUpdate ? cssResponsive(24, 24, 10, 10, 10, 10) : cssResponsive(0, 0, 0, 0, 0, 0);

    return (
        <Card>
            <Row gutter={[8, 8]}>
                <Col {...cssResponsive(24, 8, 4, 5, 5, 5)}><h2>Độc giả</h2></Col>
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
                        onClick={onMultiDeleteMember}
                    >
                        Xóa dữ liệu
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col {...leftCol}>
                    <TableMember
                        datasource={data}
                        onUpdate={onCreateOrUpdateModalOpen}
                        onDelete={onDeleteMember}
                        setMultiDataSelected={setMultiMemberSelect}
                    />
                </Col>
                <Col {...rightCol}>
                    <CreateOrUpdateMember
                        memberSelected={memberSelected}
                        onCreateOrUpdateSuccess={onCreateOrUpdateSuccess}
                        onCancelData={onCancel}
                    />
                </Col>
                <ImportMember
                    openModalImport={isModalImportOpen}
                    setOpenModalImport={setModalImportOpen}
                />
                <ExportMember
                    openModalExport={isModalExportOpen}
                    setOpenModalExport={setModalExportOpen}
                    datasource={!!multiDatarSelected ? multiDatarSelected! : data}
                />
            </Row>
        </Card>
    );
}

export default Member;