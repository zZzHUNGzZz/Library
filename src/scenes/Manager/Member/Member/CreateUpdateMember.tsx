import { Button, Col, Form, FormProps, Input, InputNumber, Row, message } from "antd"
import { MemberDTO, createMember, updateMember } from "../../../../stores/MemberStore";
import { useEffect } from "react";

interface IProps {
    onCancelData: () => void;
    memberSelected: MemberDTO | undefined;
    onCreateOrUpdateSuccess: () => void;
}

export const CreateOrUpdateMember: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();

    const onCancel = () => { props.onCancelData(); }

    useEffect(() => {
        if (!!props.memberSelected) {
            form.setFieldsValue(props.memberSelected);
        }
        else {
            form.resetFields();
        }
    })

    const onCreateOrUpdateData = async (value: MemberDTO) => {
        if (!!props.memberSelected) {
            await updateMember(props.memberSelected.me_id, value);
            message.success("Cập nhật dữ liệu thành công!");
        }
        else {
            await createMember(value);
            message.success("Thêm mới dữ liệu thành công!");
        }
        props.onCreateOrUpdateSuccess();
    }
    const onFinish: FormProps<MemberDTO>['onFinish'] = (values) => {
        onCreateOrUpdateData(values)
    };

    const onFinishFailed: FormProps<MemberDTO>['onFinishFailed'] = (errorInfo) => {
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
                    <Col span={12}><h3>{!!props.memberSelected ? 'Sửa thẻ độc giả' : 'Thêm thẻ độc giả'}</h3></Col>
                    <Col span={12} className="align-right">
                        <Button type="primary" htmlType="submit">Lưu</Button>
                        <Button className="button-danger" danger onClick={onCancel}>Hủy</Button>
                    </Col>
                </Row>
                <Form.Item
                    label="Ảnh đại diện"
                    name="me_avatar"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mã độc giả"
                    name="me_code"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên độc giả"
                    name="me_name"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Số CCCD"
                    name="me_identify"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ngày sinh"
                    name="me_birthday"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Giới tính"
                    name="me_sex"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="me_phone"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="me_address"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Thông tin thêm"
                    name="me_more_infor"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ghi chú"
                    name="me_note"
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}