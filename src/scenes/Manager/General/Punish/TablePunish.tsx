import { Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { PunishDTO } from "../../../../stores/PunishStore";

interface IProps {
    setMultiDataSelected?: (data: PunishDTO[]) => void;
    datasource?: PunishDTO[];
    isExportTable?: boolean;
    columnExport?: (column: TableColumnsType<PunishDTO>) => void;
}
export const TablePunish: React.FC<IProps> = (props) => {
    const [multiSelectPunish, setMultiSelectPunish] = useState<PunishDTO[]>([]);

    useEffect(() => {
        if (props.setMultiDataSelected) {
            const multiDataSelected = multiSelectPunish.length > 0 ? multiSelectPunish : props.datasource!;
            props.setMultiDataSelected(multiDataSelected);
        }
    }, [multiSelectPunish, props.datasource, props.setMultiDataSelected]);

    useEffect(() => {
        if (props.columnExport) {
            props.columnExport!(columnData);
        }
    }, []);

    const columns: TableColumnsType<PunishDTO> = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', fixed: 'left', width: 60, render: (index: number) => index + 1 },
        { title: 'Độc giả', dataIndex: 'us_id_borrow', key: 'us_id_borrow' },
        { title: 'Người phạt', dataIndex: 'us_id_create', key: 'us_id_create' },
        { title: 'Lí do phạt', dataIndex: 'pun_reason', key: 'pun_reason' },
        { title: 'Lỗi', dataIndex: 'pun_error', key: 'pun_error' },
        { title: 'Tiền phạt', dataIndex: 'pun_money', key: 'pun_money' },
        { title: 'Ngày phạt', dataIndex: 'pun_created_at', key: 'pun_created_at' },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: PunishDTO[]) => {
            setMultiSelectPunish(selectedRows)
        },
    };

    const columnData = columns.slice(0, 7);

    return (
        <Table
            bordered
            columns={props.isExportTable ? columnData : columns}
            dataSource={props.datasource}
            key={'stt'}
            rowKey="stt"
            scroll={{ x: 700 }}
            rowSelection={props.isExportTable ? undefined : { ...rowSelection }}
        />
    )
}
export default TablePunish;