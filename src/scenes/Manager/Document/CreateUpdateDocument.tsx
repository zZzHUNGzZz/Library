import { Button, Col, Form, FormProps, Input, InputNumber, Row, message } from "antd"
import { DocumentDTO, createDocument, updateDocument } from "../../../stores/DocumentStore";
import { useEffect } from "react";

interface IProps {
    onCancelData: () => void;
    documentSelected: DocumentDTO | undefined;
    onCreateOrUpdateSuccess: () => void;
}

export const CreateOrUpdateDocument: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();

    const onCancel = () => { props.onCancelData(); }

    useEffect(() => {
        if (!!props.documentSelected) {
            form.setFieldsValue(props.documentSelected);
        }
        else {
            form.resetFields();
        }
    })

    const onCreateOrUpdateData = async (value: DocumentDTO) => {
        if (!!props.documentSelected) {
            await updateDocument(props.documentSelected.do_id, value);
            message.success("Cập nhật dữ liệu thành công!");
        }
        else {
            await createDocument(value);
            message.success("Thêm mới dữ liệu thành công!");
        }
        props.onCreateOrUpdateSuccess();
    }
    const onFinish: FormProps<DocumentDTO>['onFinish'] = (values) => {
        onCreateOrUpdateData(values)
    };

    const onFinishFailed: FormProps<DocumentDTO>['onFinishFailed'] = (errorInfo) => {
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
                    <Col span={12}><h3>{!!props.documentSelected ? 'Sửa tài liệu' : 'Thêm tài liệu'}</h3></Col>
                    <Col span={12} className="align-right">
                        <Button type="primary" htmlType="submit">Lưu</Button>
                        <Button className="button-danger" danger onClick={onCancel}>Hủy</Button>
                    </Col>
                </Row>
                <Form.Item
                    label="Mã tác giả"
                    name="au_code"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên tác giả"
                    name="au_name"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ngày sinh"
                    name="au_date"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="au_address"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="au_email">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Học hàm"
                    name="academic_rank"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Học vị"
                    name="au_degree"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Bút danh"
                    name="au_pen_name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Thông tin thêm"
                    name="au_infor"
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}