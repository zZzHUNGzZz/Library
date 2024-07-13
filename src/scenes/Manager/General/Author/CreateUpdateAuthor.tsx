import { Button, Col, DatePicker, Form, FormProps, Input, Row, message } from "antd"
import { AuthorDTO, createAuthor, updateAuthor } from "../../../../stores/AuthorStore";
import { useEffect } from "react";
import moment from "moment";

interface IProps {
    onCancelData: () => void;
    authorSelected: AuthorDTO | undefined;
    onCreateOrUpdateSuccess: () => void;
}

export const CreateOrUpdateAuthor: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();

    const onCancel = () => { props.onCancelData(); }

    useEffect(() => {
        if (!!props.authorSelected) {
            form.setFieldsValue(props.authorSelected);
        }
        else {
            form.resetFields();
        }
    })

    const onCreateOrUpdateData = async (value: AuthorDTO) => {
        if (!!props.authorSelected) {
            await updateAuthor(props.authorSelected.au_id, value);
            message.success("Cập nhật dữ liệu thành công!");
        }
        else {
            await createAuthor(value);
            message.success("Thêm mới dữ liệu thành công!");
        }
        props.onCreateOrUpdateSuccess();
    }
    const onFinish: FormProps<AuthorDTO>['onFinish'] = (values) => {
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
                    <Col span={12}><h3>{!!props.authorSelected ? 'Sửa tài liệu' : 'Thêm tài liệu'}</h3></Col>
                    <Col span={12} className="align-content-right">
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
                    <DatePicker
                        style={{ width: '100%' }}
                        format={'DD/MM/YYYY'}
                        placeholder=""
                    />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="au_address"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="au_email"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >

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