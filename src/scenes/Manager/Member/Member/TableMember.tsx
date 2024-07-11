import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Avatar, Space, Table, TableColumnsType, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { MemberDTO } from "../../../../stores/MemberStore";
import { getColorFromChar } from "../../../../utils/getColorFromChar";
import { getFirstCharOfLastName } from "../../../../utils/getFirstCharOfLastName";
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
        {
            title: 'Ảnh đại diện', dataIndex: 'me_avatar', key: 'me_avatar', render: (text, record) => <>
                {
                    !!record.me_avatar
                        ?
                        <Avatar size={45} src={record.me_avatar} />
                        :
                        <Avatar size={45} style={{ backgroundColor: getColorFromChar(getFirstCharOfLastName(record.me_name!)) }}>{getFirstCharOfLastName(record.me_name!)}</Avatar>
                }
            </>
        },
        { title: 'Mã độc giả', dataIndex: 'me_code', key: 'me_code' },
        { title: 'Tên độc giả', dataIndex: 'me_name', key: 'me_name' },
        { title: 'CCCD', dataIndex: 'me_identify', key: 'me_identify' },
        // { title: 'Tình trạng', dataIndex: 'me_status', key: 'me_status' },
        {
            title: 'Tình trạng thẻ', dataIndex: 'me_has_card', key: 'me_has_card',
            render: (text: string, record: MemberDTO) => <>
                {
                    !!record.me_has_card
                    ?
                    <Tag color="green">Đã có thẻ</Tag>
                    :
                    <Tag color="red">Chưa có thẻ</Tag>
                }
            </>
        },
        {
            title: 'Chức năng', dataIndex: 'do_action', fixed: 'right', width: 105,
            render: (text: any, record: MemberDTO) => (
                <Space>
                    <EditTwoTone twoToneColor="#52c41a" onClick={() => props.onUpdate!(record)} />
                    <DeleteTwoTone twoToneColor="#f5222d" onClick={() => props.onDelete!(record.me_id)} />
                </Space>
            )
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: MemberDTO[]) => {
            setMultiSelectMember(selectedRows)
        },
    };

    const columnData = columns.slice(0, 6);

    return (
        <Table
            className="center-table"
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