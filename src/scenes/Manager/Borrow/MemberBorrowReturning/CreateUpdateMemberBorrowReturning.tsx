import { Button, Col, DatePicker, Form, FormProps, Input, InputNumber, Row, Select, Table, message } from "antd"
import { MemberBorrowReturningDTO, createMemberBorrowReturning, updateMemberBorrowReturning } from "../../../../stores/MemberBorrowReturningStore";
import { useEffect, useState } from "react";
import moment from "moment";
import { SelectedMember } from "../../../../components/Manager/SelectedMember";
import TableDocumentInfo from "../../DocumentInfo/TableDocumentInfo";
import { cssResponsive } from "../../../../components/Manager/Responsive";
import { DocumentInfoDTO, getDocumentInfo, updateDocumentInfo } from "../../../../stores/DocumentInfoStore";
import { getMemberNameById } from "../../../../stores/SessionStore";

interface IProps {
    onCancelData: () => void;
    memberBorrowReturningSelected: MemberBorrowReturningDTO | undefined;
    onCreateOrUpdateSuccess: () => void;
    isViewDocumentBorrowed: boolean;
    isReturnDocumentBorrowed: boolean;
}

export const CreateOrUpdateMemberBorrowReturning: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();
    const [documentInfoData, setDocumentInfoData] = useState<DocumentInfoDTO[]>([]);
    const [memberOption, setMemberOption] = useState([{}]);
    const [multiDocumentBorrowSelected, setMultiDocumentBorrowSelected] = useState<DocumentInfoDTO[]>([]);

    useEffect(() => {
        const fetchMember = async () => {
            const data = await SelectedMember();
            setMemberOption(data);
        }

        const fetchDocumentInfo = async () => {
            const infoArray = await getDocumentInfo('');
            if (props.isViewDocumentBorrowed || props.isReturnDocumentBorrowed) {
                const dataWithIndex = infoArray.filter(item => (item.do_in_status == 2 && item.do_in_me_name == props.memberBorrowReturningSelected?.us_id_borrow)).map((item, index) => ({ stt: index, ...item }));
                setDocumentInfoData(dataWithIndex);
            }
            else {
                const dataWithIndex = infoArray.filter(item => item.do_in_status == 1).map((item, index) => ({ stt: index, ...item }));
                setDocumentInfoData(dataWithIndex);
            }
        };

        fetchMember();
        fetchDocumentInfo();
    }, []);

    useEffect(() => {
        if (!!props.memberBorrowReturningSelected) {
            form.setFieldsValue(props.memberBorrowReturningSelected);
        }
        else {
            form.resetFields();
        }
    })

    const onCreateOrUpdateData = async (value: MemberBorrowReturningDTO) => {
        if (props.isReturnDocumentBorrowed) {
            multiDocumentBorrowSelected.map(async item => {
                const newDocumentInfo = { ...item, do_in_status: 1, do_in_me_name: null };
                await updateDocumentInfo(newDocumentInfo.do_in_id, newDocumentInfo);
            })
        }
        else {
            multiDocumentBorrowSelected.map(async item => {
                const newDocumentInfo = { ...item, do_in_status: 2, do_in_me_name: value.us_id_borrow };
                await updateDocumentInfo(newDocumentInfo.do_in_id, newDocumentInfo);
            })
        }
        if (!!props.memberBorrowReturningSelected) {
            await updateMemberBorrowReturning(props.memberBorrowReturningSelected.br_re_id, value);
            message.success("Cập nhật dữ liệu thành công!");
        }
        else {
            await createMemberBorrowReturning(value);
            message.success("Thêm mới dữ liệu thành công!");
        }
        props.onCreateOrUpdateSuccess();
    }

    const setMultiDocumentSelect = async (data: DocumentInfoDTO[]) => {
        await setMultiDocumentBorrowSelected(data);
    }

    const onCancel = () => { props.onCancelData(); }

    const onFinish: FormProps<MemberBorrowReturningDTO>['onFinish'] = (values) => {
        if (multiDocumentBorrowSelected?.length! < 1) {
            message.warning('Hãy chọn tôi thiểu 1 tài liệu!!');
            return;
        }
        onCreateOrUpdateData(values);
    };

    const titleForm = () => {
        if (props.isViewDocumentBorrowed) {
            return <h3>Thông tin phiếu mượn</h3>
        }
        else if (props.isReturnDocumentBorrowed) {
            return <h3>Trả tài liệu</h3>
        }
        else if (!!props.memberBorrowReturningSelected) {
            return <h3>Mượn thêm tài liệu</h3>
        }
        else {
            return <h3>Thêm phiếu mượn</h3>
        }
    }

    return (
        <>
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Row style={{ marginBottom: 15 }}>
                    <Col span={12}><h3>{titleForm()}</h3></Col>
                    <Col span={12} className="align-content-right">
                        {props.isViewDocumentBorrowed || props.isReturnDocumentBorrowed || <Button type="primary" htmlType="submit">Lưu</Button>}
                        {props.isReturnDocumentBorrowed && <Button type="primary" htmlType="submit">Trả tài liệu </Button>}
                        <Button className="button-danger" danger onClick={onCancel}>Hủy</Button>
                    </Col>
                </Row>
                <Row>
                    <Col {...cssResponsive(24, 24, 12, 12, 12, 12)}>
                        <Form.Item
                            label="Mã phiếu mượn"
                            name="br_re_code"
                            rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                        >
                            <Input disabled={props.isViewDocumentBorrowed || props.isReturnDocumentBorrowed} />
                        </Form.Item>
                    </Col>
                    <Col {...cssResponsive(24, 24, 12, 12, 12, 12)}>
                        <Form.Item
                            label="Ngày mượn"
                            name="br_re_start_at"
                            rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                disabled={props.isViewDocumentBorrowed || props.isReturnDocumentBorrowed}
                                format={'DD/MM/YYYY'}
                                placeholder=""
                                disabledDate={(current) => current < moment().subtract(1, 'day')}
                            />
                        </Form.Item>
                    </Col>
                    <Col {...cssResponsive(24, 24, 12, 12, 12, 12)}>
                        <Form.Item
                            label="Người mượn"
                            name="us_id_borrow"
                            rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                disabled={props.isViewDocumentBorrowed || props.isReturnDocumentBorrowed}
                                allowClear
                                options={memberOption}
                            />
                        </Form.Item>
                    </Col>
                    <Col {...cssResponsive(24, 24, 12, 12, 12, 12)}>
                        <Form.Item
                            label="Ngày trả"
                            name="br_re_end_at"
                            rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                disabled={props.isViewDocumentBorrowed || props.isReturnDocumentBorrowed}
                                format={'DD/MM/YYYY'}
                                placeholder=""
                                disabledDate={(current) => current < moment().subtract(1, 'day')}
                            />
                        </Form.Item>
                    </Col>
                    <Col {...cssResponsive(24, 24, 12, 12, 12, 12)}>
                        <Form.Item
                            label="Mô tả"
                            name="br_re_desc"
                        >
                            <Input disabled={props.isViewDocumentBorrowed || props.isReturnDocumentBorrowed} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <TableDocumentInfo
                isBorrowReturning={true}
                datasource={documentInfoData}
                setMultiDataSelected={setMultiDocumentSelect}
            />
        </>
    )
}