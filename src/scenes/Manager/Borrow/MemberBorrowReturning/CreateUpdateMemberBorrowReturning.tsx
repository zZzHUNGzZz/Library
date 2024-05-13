import { Button, Col, Form, FormProps, Input, Row, message } from "antd"
import { MemberBorrowReturningDTO, createMemberBorrowReturning, updateMemberBorrowReturning } from "../../../../stores/MemberBorrowReturningStore";
import { useEffect } from "react";

interface IProps {
    onCancelData: () => void;
    memberBorrowReturningSelected: MemberBorrowReturningDTO | undefined;
    onCreateOrUpdateSuccess: () => void;
}

export const CreateOrUpdateMemberBorrowReturning: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();

    const onCancel = () => { props.onCancelData(); }

    useEffect(() => {
        if (!!props.memberBorrowReturningSelected) {
            form.setFieldsValue(props.memberBorrowReturningSelected);
        }
        else {
            form.resetFields();
        }
    })

    const onCreateOrUpdateData = async (value: MemberBorrowReturningDTO) => {
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
    const onFinish: FormProps<MemberBorrowReturningDTO>['onFinish'] = (values) => {
        onCreateOrUpdateData(values)
    };

    const onFinishFailed: FormProps<MemberBorrowReturningDTO>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="div-form-data">
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row style={{ marginBottom: 15 }}>
                    <Col span={12}><h3>{!!props.memberBorrowReturningSelected ? 'Sửa tài liệu' : 'Thêm tài liệu'}</h3></Col>
                    <Col span={12} className="align-right">
                        <Button type="primary" htmlType="submit">Lưu</Button>
                        <Button className="button-danger" danger onClick={onCancel}>Hủy</Button>
                    </Col>
                </Row>
                <Form.Item
                    label="Mã phiếu mượn"
                    name="br_re_code"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Người mượn"
                    name="us_id_borrow"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ngày mượn"
                    name="br_re_start_at"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ngày trả"
                    name="br_re_end_at"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Số tài liệu"
                    name="br_re_nr_document"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="br_re_desc"
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}