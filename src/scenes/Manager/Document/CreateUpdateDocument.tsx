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
                    label="Tên tài liệu"
                    name="do_title"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tác giả"
                    name="do_author"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ngày khai thác"
                    name="do_date_available"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Số lượng"
                    name="do_total_book"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <InputNumber style={{width: "100%"}} min={0} max={999} disabled={!!props.documentSelected}/>
                </Form.Item>
                <Form.Item
                    label="Năm xuất bản"
                    name="do_date_publish"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mã đầu sách"
                    name="do_identifier"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Dịch giả"
                    name="do_translator"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Nhà xuất bản"
                    name="do_publisher"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ngôn ngữ"
                    name="do_language"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tình trạng"
                    name="do_status"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}