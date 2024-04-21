import { Button, Col, Form, FormProps, Input, InputNumber, Row } from "antd"
import { DocumentStore, createDocument } from "../../../../stores/DocumentStore";
import { useState } from "react";

interface IProps {
    onCancelData: () => void;
}


export const CreateOrUpdateDocument: React.FC<IProps> = ({ onCancelData }) => {
    const [isLoadDone, setIsLoadDone] = useState(true);
    const onCancel = () => onCancelData();

    const onCreateOrUpdateData = (values: DocumentStore) => {
        createDocument(values);
        setIsLoadDone(!isLoadDone);
    }
    const onFinish: FormProps<DocumentStore>['onFinish'] = (values) => {
        onCreateOrUpdateData(values)
    };

    const onFinishFailed: FormProps<DocumentStore>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="div-form-data">
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row style={{ marginBottom: 15 }}>
                    <Col span={12}><h3>Thêm tài liệu</h3></Col>
                    <Col span={12} className="align-right">
                        <Button type="primary" htmlType="submit">Lưu</Button>
                        <Button danger onClick={onCancel}>Hủy</Button>
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
                    name="author"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Số lượng"
                    name="do_total"
                >
                    <InputNumber style={{ width: '100%'}}/>
                </Form.Item>
                <Form.Item
                    label="Năm xuất bản"
                    name="do_date_publish"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mã đầu sách"
                    name="do_identifier">
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
                    label="Chủ đề"
                    name="do_topic"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Danh mục"
                    name="do_category"
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}