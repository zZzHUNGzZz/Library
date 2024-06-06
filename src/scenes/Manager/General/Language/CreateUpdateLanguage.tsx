import { Button, Col, Form, FormProps, Input, Row, message } from "antd"
import { LanguageDTO, createLanguage, updateLanguage } from "../../../../stores/LanguageStore";
import { useEffect } from "react";

interface IProps {
    onCancelData: () => void;
    languageSelected: LanguageDTO | undefined;
    onCreateOrUpdateSuccess: () => void;
}

export const CreateOrUpdateLanguage: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();

    const onCancel = () => { props.onCancelData(); }

    useEffect(() => {
        if (!!props.languageSelected) {
            form.setFieldsValue(props.languageSelected);
        }
        else {
            form.resetFields();
        }
    })

    const onCreateOrUpdateData = async (value: LanguageDTO) => {
        if (!!props.languageSelected) {
            await updateLanguage(props.languageSelected.la_id, value);
            message.success("Cập nhật dữ liệu thành công!");
        }
        else {
            await createLanguage(value);
            message.success("Thêm mới dữ liệu thành công!");
        }
        props.onCreateOrUpdateSuccess();
    }
    const onFinish: FormProps<LanguageDTO>['onFinish'] = (values) => {
        onCreateOrUpdateData(values)
    };

    const onFinishFailed: FormProps<LanguageDTO>['onFinishFailed'] = (errorInfo) => {
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
                    <Col span={12}><h3>{!!props.languageSelected ? 'Sửa tài liệu' : 'Thêm tài liệu'}</h3></Col>
                    <Col span={12} className="align-content-right">
                        <Button type="primary" htmlType="submit">Lưu</Button>
                        <Button className="button-danger" danger onClick={onCancel}>Hủy</Button>
                    </Col>
                </Row>
                <Form.Item
                    label="Ngôn ngữ"
                    name="la_title"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ảnh"
                    name="la_flag"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}