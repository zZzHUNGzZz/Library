import { Button, Col, Form, FormProps, Input, Row, message } from "antd"
import { PublisherDTO, createPublisher, updatePublisher } from "../../../../stores/PublisherStore";
import { useEffect } from "react";

interface IProps {
    onCancelData: () => void;
    publisherSelected: PublisherDTO | undefined;
    onCreateOrUpdateSuccess: () => void;
}

export const CreateOrUpdatePublisher: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();

    const onCancel = () => { props.onCancelData(); }

    useEffect(() => {
        if (!!props.publisherSelected) {
            form.setFieldsValue(props.publisherSelected);
        }
        else {
            form.resetFields();
        }
    })

    const onCreateOrUpdateData = async (value: PublisherDTO) => {
        if (!!props.publisherSelected) {
            await updatePublisher(props.publisherSelected.pu_id, value);
            message.success("Cập nhật dữ liệu thành công!");
        }
        else {
            await createPublisher(value);
            message.success("Thêm mới dữ liệu thành công!");
        }
        props.onCreateOrUpdateSuccess();
    }
    const onFinish: FormProps<PublisherDTO>['onFinish'] = (values) => {
        onCreateOrUpdateData(values)
    };

    return (
        <div className="div-form-data">
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Row style={{ marginBottom: 15 }}>
                    <Col span={12}><h3>{!!props.publisherSelected ? 'Sửa tài liệu' : 'Thêm tài liệu'}</h3></Col>
                    <Col span={12} className="align-content-right">
                        <Button type="primary" htmlType="submit">Lưu</Button>
                        <Button className="button-danger" danger onClick={onCancel}>Hủy</Button>
                    </Col>
                </Row>
                <Form.Item
                    label="Tên nhà xuất bản"
                    name="pu_name"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên viết tắt"
                    name="pu_short_name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="pu_address"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="pu_phone"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="pu_email"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Website"
                    name="pu_website"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Thông tin thêm"
                    name="pu_infor"
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}