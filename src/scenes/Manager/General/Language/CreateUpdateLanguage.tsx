import { Button, Col, Form, FormProps, Image, Input, Row, Upload, UploadFile, message } from "antd"
import { LanguageDTO, createLanguage, updateLanguage } from "../../../../stores/LanguageStore";
import { useEffect, useState } from "react";
import { UploadChangeParam } from "antd/es/upload";
import { validateImageSize } from "../../../../utils/validateImageSize";
import { getBase64 } from "../../../../utils/getBase64";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import UploadLanguageImage from "../../../../storage/UploadLanguageImage";

interface IProps {
    onCancelData: () => void;
    languageSelected: LanguageDTO | undefined;
    onCreateOrUpdateSuccess: () => void;
}

export const CreateOrUpdateLanguage: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isUpload, setIsUpload] = useState(false);
    const onCancel = () => { props.onCancelData(); }

    let urlImage: string = '';
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

    const onFinish: FormProps<LanguageDTO>['onFinish'] = async (values) => {
        if (isUpload) {
            if (fileList.length > 0) {
                urlImage = await UploadLanguageImage(fileList[0].originFileObj);
            }
            else {
                urlImage = ''
            }
        }
        const data = { ...values, la_flag: urlImage }
        onCreateOrUpdateData(data)
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj!);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange = async (file: UploadChangeParam<UploadFile<any>>) => {
        await setFileList(validateImageSize(file.file) ? file.fileList : []);
        setIsUpload(true);
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên</div>
        </button>
    );

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
                    <ImgCrop rotationSlider aspect={16 / 9}>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length === 1 ? null : uploadButton}
                        </Upload>
                    </ImgCrop>
                    {!!previewImage &&
                        <Image
                            wrapperStyle={{ display: 'none' }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    }
                </Form.Item>
            </Form>
        </div>
    )
}