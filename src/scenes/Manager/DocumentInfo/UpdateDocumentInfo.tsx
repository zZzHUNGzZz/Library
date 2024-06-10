import { Button, Col, Form, FormProps, Input, Row, message } from "antd"
import { DocumentInfoDTO, updateDocumentInfo } from "../../../stores/DocumentInfoStore";
import { useEffect } from "react";

interface IProps {
    onCancelData: () => void;
    documentInfoSelected: DocumentInfoDTO | undefined;
    onUpdateSuccess: () => void;
}

export const UpdateDocumentInfo: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();

    const onCancel = () => { props.onCancelData(); }

    useEffect(() => {
        if (!!props.documentInfoSelected) {
            form.setFieldsValue(props.documentInfoSelected);
        }
        else {
            form.resetFields();
        }
    })

    const onUpdateData = async (value: DocumentInfoDTO) => {
        await updateDocumentInfo(props.documentInfoSelected!.do_in_id, value);
        message.success("Cập nhật dữ liệu thành công!");
        props.onUpdateSuccess();
    }
    const onFinish: FormProps<DocumentInfoDTO>['onFinish'] = (values) => {
        onUpdateData(values)
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
                    <Col span={12}><h3>Sửa tài liệu</h3></Col>
                    <Col span={12} className="align-content-right">
                        <Button type="primary" htmlType="submit">Lưu</Button>
                        <Button className="button-danger" danger onClick={onCancel}>Hủy</Button>
                    </Col>
                </Row>
                <Form.Item
                    label="Số ĐKCB"
                    name="do_in_dkcb"
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    label="Tên tài liệu"
                    name="do_in_status"
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    label="Trạng thái"
                    name="do_in_status"
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    label="Ghi chú"
                    name="do_in_note"
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}