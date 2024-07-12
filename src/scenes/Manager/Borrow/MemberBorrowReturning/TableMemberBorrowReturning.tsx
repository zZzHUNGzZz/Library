import { CheckCircleTwoTone, DeleteTwoTone, EditTwoTone, EyeTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { MemberBorrowReturningDTO } from "../../../../stores/MemberBorrowReturningStore";
import { DocumentInfoDTO } from "../../../../stores/DocumentInfoStore";
const dayjs = require('dayjs');

interface IProps {
    onView?: (value: MemberBorrowReturningDTO) => void;
    onReturn?: (value: MemberBorrowReturningDTO) => void;
    onUpdate?: (value: MemberBorrowReturningDTO) => void;
    onDelete?: (id: string) => void;
    setMultiDataSelected?: (data: MemberBorrowReturningDTO[]) => void;
    datasource?: MemberBorrowReturningDTO[];
    isExportTable?: boolean;
    columnImportExport?: (column: TableColumnsType<MemberBorrowReturningDTO>) => void;
}

export const TableMemberBorrowReturning: React.FC<IProps> = (props) => {
    const [multiSelectMemberBorrowReturning, setMultiSelectMemberBorrowReturning] = useState<MemberBorrowReturningDTO[]>([]);

    useEffect(() => {
        if (props.setMultiDataSelected) {
            props.setMultiDataSelected(multiSelectMemberBorrowReturning);
        }
    }, [multiSelectMemberBorrowReturning, props.datasource, props.setMultiDataSelected]);

    useEffect(() => {
        if (props.columnImportExport) {
            props.columnImportExport!(columnData);
        }
    }, []);

    const columns: TableColumnsType<MemberBorrowReturningDTO> = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', fixed: 'left', width: 60, render: (index: number) => index + 1 },
        { title: 'Mã phiếu mượn', dataIndex: 'br_re_code', key: 'br_re_code', width: 150 },
        { title: 'Người mượn', dataIndex: 'us_id_borrow', key: 'us_id_borrow', width: 150 },
        { title: 'Ngày mượn', dataIndex: 'br_re_start_at', key: 'br_re_start_at', width: 150, render: (text, record) => <>{!!record.br_re_start_at && dayjs(record.br_re_start_at)?.format('DD/MM/YYYY')}</> },
        { title: 'Ngày trả', dataIndex: 'br_re_end_at', key: 'br_re_end_at', width: 150, render: (text, record) => <>{!!record.br_re_end_at && dayjs(record.br_re_end_at)?.format('DD/MM/YYYY')}</> },
        { title: 'Mô tả', dataIndex: 'br_re_desc', key: 'br_re_desc', width: 150 },
        {
            title: 'Chức năng', dataIndex: 'do_action', fixed: 'right', width: 120,
            render: (text: any, record: MemberBorrowReturningDTO) => (
                <div className="align-content-center">
                    <EyeTwoTone title="Thông tin phiếu mượn" twoToneColor="#52c41a" onClick={() => props.onView!(record)} />
                    <PlusCircleTwoTone title="Mượn thêm sách" onClick={() => props.onUpdate!(record)} />
                    <CheckCircleTwoTone title="Trả sách đã mượn" twoToneColor="orange" onClick={() => props.onReturn!(record)} />
                    <DeleteTwoTone title="Xóa phiếu mượn" twoToneColor="#f5222d" onClick={() => props.onDelete!(record.br_re_id)} />
                </div>
            )
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: MemberBorrowReturningDTO[]) => {
            setMultiSelectMemberBorrowReturning(selectedRows);
        },
    };

    const columnData = columns.slice(0, 6);

    return (
        <Table
            className="center-table"
            bordered
            scroll={{ x: 1000 }}
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
export default TableMemberBorrowReturning;