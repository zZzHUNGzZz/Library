import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { MemberDTO } from "../../../../stores/MemberStore";
interface IProps {
    onUpdate?: (value: MemberDTO) => void;
    onDelete?: (id: string) => void;
    setMultiDataSelected?: (data: MemberDTO[]) => void;
    datasource?: MemberDTO[];
    isExportTable?: boolean;
    columnImportExport?: (column: TableColumnsType<MemberDTO>) => void;
}
export const TableMember: React.FC<IProps> = (props) => {
    const [multiSelectMember, setMultiSelectMember] = useState<MemberDTO[]>([]);

    useEffect(() => {
        if (props.setMultiDataSelected) {
            const multiDataSelected = multiSelectMember.length > 0 ? multiSelectMember : props.datasource!;
            props.setMultiDataSelected(multiDataSelected);
        }
    }, [multiSelectMember, props.datasource, props.setMultiDataSelected]);

    useEffect(() => {
        if (props.columnImportExport) {
            props.columnImportExport!(columnData);
        }
    }, []);

    const columns: TableColumnsType<MemberDTO> = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', fixed: 'left', width: 60, render: (index: number) => index + 1 },
        { title: 'Ảnh đại diện', dataIndex: 'me_avatar', key: 'me_avatar' },
        { title: 'Mã độc giả', dataIndex: 'me_code', key: 'me_code' },
        { title: 'Tên độc giả', dataIndex: 'me_name', key: 'me_name' },
        { title: 'CCCD', dataIndex: 'me_identify', key: 'me_identify' },
        { title: 'Tình trạng', dataIndex: 'me_status', key: 'me_status' },
        { title: 'Tình trạng thẻ', dataIndex: 'me_has_card', key: 'me_has_card' },
        {
            title: 'Chức năng', dataIndex: 'do_action', fixed: 'right', width: 105,
            render: (text: any, record: MemberDTO) => (
                <div className="align-center">
                    <EditTwoTone twoToneColor="#52c41a" onClick={() => props.onUpdate!(record)} />
                    <DeleteTwoTone twoToneColor="#f5222d" onClick={() => props.onDelete!(record.me_id)} />
                </div>
            )
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: MemberDTO[]) => {
            setMultiSelectMember(selectedRows)
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
            onRow={(record) => {
                return {
                    onDoubleClick: () => props.onUpdate!(record)
                };
            }}
            rowSelection={props.isExportTable ? undefined : { ...rowSelection }}
        />
    )
}
export default TableMember;