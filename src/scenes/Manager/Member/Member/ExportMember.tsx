import { Button, Modal } from "antd";
import React, { useState } from "react";
import TableMember from "./TableMember";
import * as XLSX from "xlsx";
import { MemberDTO } from "../../../../stores/MemberStore";
import moment from "moment";

interface IProps {
    openModalExport: boolean;
    setOpenModalExport: (isOpen: boolean) => void;
    datasource: MemberDTO[];
}

const ExportMember: React.FC<IProps> = (props) => {
    const [column, setColumn] = useState<any[]>([]);

    const exportFile = () => {
        const tittleColumn = column.map(item => item.title);
        const currentDate = moment().format('DD/MM/YYYY_HH_mm_ss');
        const ws = XLSX.utils.aoa_to_sheet([tittleColumn, ...props.datasource.map(({me_id, ...obj}) => Object.values(obj))]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        XLSX.writeFile(wb, `member_${currentDate}.xlsx`);
    }

    return (
        <Modal
            width={'80vw'}
            footer={null}
            closeIcon={null}
            open={props.openModalExport}
        >
            <div className="justify-space-between">
                <h3>Xuất dữ liệu</h3>
                <div className="align-content">
                    <Button onClick={() => exportFile()}>Xuất dữ liệu</Button>
                    <Button className="button-danger" danger onClick={() => props.setOpenModalExport(false)}>Hủy</Button>
                </div>
            </div>
            <div className="line-space"></div>
            <TableMember
                isExportTable={true}
                datasource={props.datasource}
                columnImportExport={async (value) => await setColumn(value!)}
            />
        </Modal>
    )
}

export default ExportMember;