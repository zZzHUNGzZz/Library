import { Col, Form, Input, Modal, Row, Upload, Image, message } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from 'antd';
import UploadAccountImage from "../../storage/UploadAccountImage";
import ImgCrop from 'antd-img-crop';

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

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        if (!!newFileList[0]) {
            await getBase64(newFileList[0].originFileObj as FileType);
        }
        // const url = await UploadAccountImage(newFileList[0].originFileObj);
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
            onCancel={() => props.setVisibleAccountInfo(false)}
        >
            <Row>
                <Col span={8}>
                    <ImgCrop rotationSlider>
                        <Upload
                            listType="picture-circle"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={beforeUpload}
                            style={{ width: 100 }}
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
                <Col span={16}>
                    <div className="div-form-data">
                        <Form
                            form={form}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            // onFinish={onFinish}

                        >
                            <Row>
                                <Col span={12}>
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
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Địa chỉ"
                                        name="me_address"
                                        rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}

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
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="me_note"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>

            </Row>
        </Modal >
    )
}

export default ModalAccountInfo