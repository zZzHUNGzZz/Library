import { Col, Form, Input, Modal, Row, Upload, Image, message, Button } from "antd";
import { useContext, useEffect, useState } from "react";
import { LockOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from 'antd';
import UploadAccountImage from "../../storage/UploadAccountImage";
import ImgCrop from 'antd-img-crop';
import { cssResponsive } from "../../components/Manager/AppConst";
import { updateAccount } from "../../stores/AccountStore";
import { AccountContext } from "../../components/context/AccountContext";

interface IProps {
    isVisible: boolean
    setVisibleAccountInfo: (isVisible: boolean) => void;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const ModalAccountInfo: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    let urlImage = undefined;
    const account = useContext(AccountContext);
    useEffect(() => {
        form.setFieldValue(form, account);
    }, [])
    const onFinish = async (values: any) => {
        if (fileList.length > 0) {
            urlImage = await UploadAccountImage(fileList[0].originFileObj);
        }

        const { confirm, ac_username, ...newInfo} = values
        // updateAccount(ac_username, newInfo);
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        await setFileList(newFileList);
    }

    const beforeUpload = (file: FileType) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Ảnh phải nhỏ hơn 2MB!');
            return !!isLt2M;
        }
        return true;
    };

    const onCancel = () => {

        props.setVisibleAccountInfo(false)
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên</div>
        </button>
    );

    return (
        <Modal
            closeIcon={null}
            open={props.isVisible}
            width={'80vw'}
            footer={null}
        >
            <Row>
                <Col {...cssResponsive(24, 24, 24, 6, 6, 6)}>
                    <h3 style={{ margin: "15px 0 10px 0" }}><strong>Ảnh đại diện</strong></h3>
                    <ImgCrop rotationSlider>
                        <Upload
                            listType="picture-circle"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={beforeUpload}
                        >
                            {fileList.length == 1 ? null : uploadButton}
                        </Upload>
                    </ImgCrop>
                    {previewImage && (
                        <Image
                            wrapperStyle={{ display: 'none' }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                </Col>
                <Col {...cssResponsive(24, 24, 24, 18, 18, 18)}>
                    <div className="div-form-data">
                        <Form
                            form={form}
                            labelCol={{ span: 9 }}
                            wrapperCol={{ span: 15 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Row>
                                <Col span={11}>
                                    <h3 style={{ marginBottom: 10 }}><strong>Thông tin cá nhân</strong></h3>
                                    <Form.Item
                                        label="Tên"
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
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Giới tính"
                                        name="me_sex"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Địa chỉ"
                                        name="me_address"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="me_phone"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="me_email"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'Email không hợp lệ!',
                                            },
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập Email!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>
                                </Col>
                                <Col span={2}></Col>
                                <Col span={11}>
                                    <h3 style={{ marginBottom: 10 }}><strong>Thông tin tài khoản</strong></h3>
                                    <Form.Item
                                        label="Tên tài khoản"
                                        name="ac_username"
                                    // rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                                    >
                                        <Input
                                            disabled
                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                            placeholder="Tên tài khoản"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Mật khẩu"
                                        name="ac_password"
                                        rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu!' }]}
                                    >
                                        <Input.Password
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            placeholder="Mật khẩu"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Xác nhận Mật khẩu"
                                        name="confirm"
                                        dependencies={['password']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng xác nhận Mật khẩu!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('ac_password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Mật khẩu mới không trùng khớp!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            placeholder="Mật khẩu"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Col span={24} className="align-right">
                                <Button className="button-danger" danger onClick={onCancel}>Hủy</Button>
                                <Button type="primary" htmlType="submit">Lưu</Button>
                            </Col>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Modal >
    )
}

export default ModalAccountInfo