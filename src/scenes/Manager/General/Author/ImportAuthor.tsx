import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Upload } from "antd";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { cssResponsive } from "../../../../components/Manager/AppConst";
import TableAuthor from "./TableAuthor";
import { AuthorDTO, createAuthor } from "../../../../stores/AuthorStore";

interface IProps {
    openModalImport: boolean;
    setOpenModalImport: (isOpen: boolean) => void;
}

const ImportAuthor: React.FC<IProps> = (props) => {
    const [isLoadDone, setIsLoadDone] = useState(false);
    const [column, setColumn] = useState<any[]>([]);
    const [datasource, setDatasource] = useState<any[]>([]);
    const [uploadedRowCount, setUploadedRowCount] = useState(0);
    const [emptyFileList, setEmptyFileList] = useState(false);

    const covertToJson = (datatable: any[]) => {
        const columnData = column.map(item => item.key)
        const rows: any = [];
        datatable.forEach((row: any) => {
            let rowData: any = {};
            row.forEach((element: any, index: any) => {
                rowData[columnData[index]] = element;
            });
            rows.push(rowData);
        })
        return rows;
    }

    const handleFileUpload = async (file: File) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const dataUpload: any = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            const datatable = [...dataUpload].slice(1);

            setDatasource(covertToJson(datatable));
            setUploadedRowCount(dataUpload.length - 1);
        };
        reader.readAsArrayBuffer(file);
        setIsLoadDone(!isLoadDone);
    };

    const handleImportAuthor = () => {
        const datasourceWithoutStt = datasource.map(({ stt, ...item }) => item);
        datasourceWithoutStt.forEach(async (element: AuthorDTO) => {
            await createAuthor(element);
        });
        onCancel();
    }

    const onRemoveFile = () => {
        setColumn([]);
        setDatasource([]);
        setUploadedRowCount(0);
    }

    const onCancel = () => {
        onRemoveFile()
        setEmptyFileList(true);
        props.setOpenModalImport(false);
    }

    return (
        <Modal
            width={'80vw'}
            footer={null}
            closeIcon={null}
            open={props.openModalImport}
        >
            <div className="justify-space-between">
                <h2>Nhập dữ liệu</h2>
                <div className="align-content">
                    <Button onClick={handleImportAuthor}>Nhập dữ liệu</Button>
                    <Button className="button-danger" danger onClick={() => onCancel()}>Hủy</Button>
                </div>
            </div>
            <div className="line-space"></div>
            <Row gutter={[4, 4]}>
                <Col {...cssResponsive(24, 24, 11, 11, 11, 11)}>
                    <Upload
                        listType="picture"
                        fileList={emptyFileList ? [] : undefined}
                        maxCount={1}
                        beforeUpload={(file) => {
                            handleFileUpload(file);
                            return false;
                        }}
                        onRemove={() => onRemoveFile()}
                    >
                        <Button icon={<UploadOutlined />}>Nhập file</Button>
                    </Upload>
                </Col>
                <Col {...cssResponsive(0, 0, 2, 2, 2, 2)} style={{ display: 'flex', justifyContent: 'center' }}><div className="line-space-2"></div></Col>
                <Col  {...cssResponsive(24, 24, 11, 11, 11, 11)}>
                    <h3><strong>Số hàng: {uploadedRowCount}</strong></h3>
                </Col>
            </Row>
            <TableAuthor
                columnImport={async (value) => await setColumn(value!)}
                datasource={datasource}
                isExportTable={true}
            />
        </Modal>
    )
}

export default ImportAuthor;