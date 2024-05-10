import { Button, Col, Form, FormProps, Input, Row } from "antd"
import { SupplierDTO, createSupplier, updateSupplier } from "../../../../stores/SupplierStore";
import { useEffect } from "react";

interface IProps {
    onCancelData: () => void;
    supplierSelected: SupplierDTO | undefined;
    onCreateOrUpdateSuccess: () => void;
}

export const CreateOrUpdateSupplier: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();

    const onCancel = () => { props.onCancelData(); }

    useEffect(() => {
        if (!!props.supplierSelected) {
            form.setFieldsValue(props.supplierSelected);
        }
        else {
            form.resetFields();
        }
    })

    const onCreateOrUpdateData = async (value: SupplierDTO) => {
        if (!!props.supplierSelected) {
            await updateSupplier(props.supplierSelected.su_id, value);
        }
        else {
            await createSupplier(value);
        }
        props.onCreateOrUpdateSuccess();
    }
    const onFinish: FormProps<SupplierDTO>['onFinish'] = (values) => {
        onCreateOrUpdateData(values)
    };

    const onFinishFailed: FormProps<SupplierDTO>['onFinishFailed'] = (errorInfo) => {
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
                    <Col span={12}><h3>{!!props.supplierSelected ? 'Sửa nhà cung cấp' : 'Thêm nhà cung cấp'}</h3></Col>
                    <Col span={12} className="align-right">
                        <Button type="primary" htmlType="submit">Lưu</Button>
                        <Button className="button-danger" danger onClick={onCancel}>Hủy</Button>
                    </Col>
                </Row>
                <Form.Item
                    label="Tên viết tắt"
                    name="su_short_name"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên nhà cung cấp"
                    name="su_name"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên liên hệ"
                    name="su_contact_name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="su_contact_possition"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="su_contact_address">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="su_contact_phone"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Fax"
                    name="su_contact_fax"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="su_contact_email"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ghi chú"
                    name="su_contact_note"
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}