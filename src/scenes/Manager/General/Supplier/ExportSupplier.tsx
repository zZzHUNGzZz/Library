import { Button, Modal } from "antd";
import React from "react";
import TableSupplier from "./TableSupplier";
import * as XLSX from "xlsx";
import { SupplierDTO } from "../../../../stores/SupplierStore";
import moment from "moment";

interface IProps {
    openModalExport: boolean;
    setOpenModalExport: (isOpen: boolean) => void;
    datasource: SupplierDTO[];
}

const ExportSupplier: React.FC<IProps> = (props) => {
    const currentDate = moment().format('DD/MM/YYYY_HH_mm_ss');
    const tittleColumn = ["STT", "Ảnh đại diện", "Mã tác giả", "Tên tác giả", "Ngày sinh", "Địa chỉ", "Email", "Học hàm", "Học vị", "Bút danh", "Thông tin thêm"];
    const exportFile = () => {
        const ws = XLSX.utils.aoa_to_sheet([tittleColumn, ...props.datasource.map(({su_id, ...obj}) => Object.values(obj))]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        XLSX.writeFile(wb, `supplier_${currentDate}.xlsx`);
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
            <TableSupplier
                isExportTable={true}
                datasource={props.datasource}
            />
        </Modal>
    )
}

export default ExportSupplier;