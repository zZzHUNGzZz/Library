import { Button, Modal } from "antd";
import React from "react";
import TableAuthor from "./TableAuthor";
import * as XLSX from "xlsx";
import { AuthorStore } from "../../../../stores/AuthorStore";
import moment from "moment";

interface IProps {
    openModalExport: boolean;
    setOpenModalExport: (isOpen: boolean) => void;
    datasource: AuthorStore[];
}

const ExportAuthor: React.FC<IProps> = ({ openModalExport, setOpenModalExport, datasource }) => {
    const currentDate = moment().format('DD/MM/YYYY_HH_mm_ss');
    const tittleColumn = ["STT", "Ảnh đại diện", "Mã tác giả", "Tên tác giả", "Ngày sinh", "Địa chỉ", "Email", "Học hàm", "Học vị", "Bút danh", "Thông tin thêm"];
    const exportFile = () => {
        const ws = XLSX.utils.aoa_to_sheet([tittleColumn, ...datasource.map(({au_id, ...obj}) => Object.values(obj))]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        XLSX.writeFile(wb, `author_${currentDate}.xlsx`);
    }

    return (
        <Modal
            width={'80vw'}
            footer={null}
            closeIcon={null}
            open={openModalExport}
        >
            <div className="justify-space-between">
                <h3>Xuất dữ liệu</h3>
                <div className="align-content">
                    <Button onClick={() => exportFile()}>Xuất dữ liệu</Button>
                    <Button className="button-danger" danger onClick={() => setOpenModalExport(false)}>Hủy</Button>
                </div>
            </div>
            <div className="line-space"></div>
            <TableAuthor
                isExportTable={true}
                datasource={datasource}
            />
        </Modal>
    )
}

export default ExportAuthor;