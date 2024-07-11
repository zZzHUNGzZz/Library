import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { MemberCardDTO } from "../../../../stores/MemberCardStore";
const dayjs = require('dayjs');
interface IProps {
    onUpdate?: (value: MemberCardDTO) => void;
    onDelete?: (id: string) => void;
    setMultiDataSelected?: (data: MemberCardDTO[]) => void;
    datasource?: MemberCardDTO[];
    isExportTable?: boolean;
    columnImportExport?: (column: TableColumnsType<MemberCardDTO>) => void;
}
export const TableMemberCard: React.FC<IProps> = (props) => {
    const [multiSelectMemberCard, setMultiSelectMemberCard] = useState<MemberCardDTO[]>([]);

    useEffect(() => {
        if (props.setMultiDataSelected) {
            const multiDataSelected = multiSelectMemberCard.length > 0 ? multiSelectMemberCard : props.datasource!;
            props.setMultiDataSelected(multiDataSelected);
        }
    }, [multiSelectMemberCard, props.datasource, props.setMultiDataSelected]);

    useEffect(() => {
        if (props.columnImportExport) {
            props.columnImportExport!(columnData);
        }
    }, []);
    // render: (text: any, item: MemberCardDTO, index: number) => <>{getMemberNameById(item.me_id!)}</>
    const columns: TableColumnsType<MemberCardDTO> = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', fixed: 'left', width: 60, render: (index: number) => index + 1 },
        { title: 'Độc giả', dataIndex: 'me_id', key: 'me_id', },
        { title: 'Số thẻ', dataIndex: 'me_ca_code', key: 'me_ca_code' },
        { title: 'Thời gian có hiệu lực', dataIndex: 'me_ca_start_valid', key: 'me_ca_start_valid', render: (text, record) => <>{!!record.me_ca_start_valid && dayjs(record.me_ca_start_valid)?.format('DD/MM/YYYY')}</>, },
        { title: 'Thời gian hết hiệu lực', dataIndex: 'me_ca_end_valid', key: 'me_ca_end_valid', render: (text, record) => <>{!!record.me_ca_end_valid && dayjs(record.me_ca_end_valid)?.format('DD/MM/YYYY')}</>, },
        { title: 'Thời gian nhận thẻ', dataIndex: 'me_ca_get_card', key: 'me_ca_get_card', render: (text, record) => <>{!!record.me_ca_get_card && dayjs(record.me_ca_get_card)?.format('DD/MM/YYYY')}</>, },
        {
            title: 'Chức năng', dataIndex: 'do_action', fixed: 'right', width: 105,
            render: (text: any, record: MemberCardDTO) => (
                <div className="align-content-center">
                    <EditTwoTone twoToneColor="#52c41a" onClick={() => props.onUpdate!(record)} />
                    <DeleteTwoTone twoToneColor="#f5222d" onClick={() => props.onDelete!(record.me_ca_id)} />
                </div>
            )
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: MemberCardDTO[]) => {
            setMultiSelectMemberCard(selectedRows)
        },
    };

    const columnData = columns.slice(0, 6);

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
export default TableMemberCard;