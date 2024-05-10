import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { LanguageDTO } from "../../../../stores/LanguageStore";

interface IProps {
    onUpdate?: (value: LanguageDTO) => void;
    onDelete?: (id: string) => void;
    setMultiDataSelected?: (data: LanguageDTO[]) => void;
    datasource?: LanguageDTO[];
    isExportTable?: boolean;
    columnImportExport?: (column: TableColumnsType<LanguageDTO>) => void;
}
export const TableLanguage: React.FC<IProps> = (props) => {
    const [multiSelectLanguage, setMultiSelectLanguage] = useState<LanguageDTO[]>([]);

    useEffect(() => {
        if (props.setMultiDataSelected) {
            const multiDataSelected = multiSelectLanguage.length > 0 ? multiSelectLanguage : props.datasource!;
            props.setMultiDataSelected(multiDataSelected);
        }
    }, [multiSelectLanguage, props.datasource, props.setMultiDataSelected]);

    useEffect(() => {
        if (props.columnImportExport) {
            props.columnImportExport!(columnData);
        }
    }, []);

    const columns: TableColumnsType<LanguageDTO> = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', fixed: 'left', width: 60, render: (index: number) => index + 1 },
        { title: 'Ngôn ngữ', dataIndex: 'la_title', key: 'la_title' },
        { title: 'Ảnh', dataIndex: 'la_flag', key: 'la_flag' },
        {
            title: 'Chức năng', dataIndex: 'do_action', fixed: 'right', width: 105,
            render: (text: any, record: LanguageDTO) => (
                <div className="align-center">
                    <EditTwoTone twoToneColor="#52c41a" onClick={() => props.onUpdate!(record)} />
                    <DeleteTwoTone twoToneColor="#f5222d" onClick={() => props.onDelete!(record.la_id)} />
                </div>
            )
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: LanguageDTO[]) => {
            setMultiSelectLanguage(selectedRows)
        },
    };

    const columnData = columns.slice(0, 11);

    return (
        <Table
            bordered
            columns={props.isExportTable ? columnData : columns}
            dataSource={props.datasource}
            key={'stt'}
            rowKey="stt"
            onRow={(record) => {
                return {
                    onDoubleClick: () => props.onUpdate!(record)
                };
            }}
            rowSelection={props.isExportTable ? undefined : { ...rowSelection }}
        />
    )
}
export default TableLanguage;