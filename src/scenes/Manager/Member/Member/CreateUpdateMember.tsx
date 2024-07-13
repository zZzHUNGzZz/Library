import { Button, Col, DatePicker, Form, FormProps, Image, Input, Row, Select, Upload, UploadFile, message } from "antd"
import { MemberDTO, createMember, updateMember } from "../../../../stores/MemberStore";
import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { UploadChangeParam } from "antd/es/upload";
import { validateImageSize } from "../../../../utils/validateImageSize";
import { getBase64 } from "../../../../utils/getBase64";
import { PlusOutlined } from "@ant-design/icons";
import UploadMemberImage from "../../../../storage/UploadMemberImage";
import { GENDER } from "../../../../components/Manager/AppConst";
import { getFileNameFromUrl } from "../../../../utils/getFileNameFromUrl";
import moment from "moment";

interface IProps {
    onCancelData: () => void;
    memberSelected: MemberDTO | undefined;
    onCreateOrUpdateSuccess: () => void;
}

export const CreateOrUpdateMember: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isUpload, setIsUpload] = useState(false);
    
    let urlImage: string = '';

    useEffect(() => {
        if (!!props.memberSelected) {
            form.setFieldsValue(props.memberSelected);
            if (!!props.memberSelected?.me_avatar) {
                urlImage = props.memberSelected?.me_avatar;
                const fileName = getFileNameFromUrl(urlImage);
                setFileList([{ uid: '-1', name: fileName, status: 'done', url: urlImage }]);
            }
            else {
                setFileList([]);
            }
        }
    }, [props.memberSelected]);

    const onCreateOrUpdateData = async (value: MemberDTO) => {
        if (!!props.memberSelected) {
            await updateMember(props.memberSelected.me_id, value);
            message.success("Cập nhật dữ liệu thành công!");
        }
        else {
            await createMember(value);
            message.success("Thêm mới dữ liệu thành công!");
        }
        props.onCreateOrUpdateSuccess();
        onCancel();
    }

    const onCancel = () => {
        form.resetFields();
        setFileList([]);
        setIsUpload(false);
        props.onCancelData();
    }

    const onFinish: FormProps<MemberDTO>['onFinish'] = async (values) => {
        if (isUpload) {
            if (fileList.length > 0) {
                urlImage = await UploadMemberImage(fileList[0].originFileObj);
            }
            else {
                urlImage = ''
            }
        }
        const data = { ...values, me_avatar: urlImage }
        onCreateOrUpdateData(data);
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
                    <Col span={12}><h3>{!!props.memberSelected ? 'Sửa độc giả' : 'Thêm độc giả'}</h3></Col>
                    <Col span={12} className="align-content-right">
                        <Button type="primary" htmlType="submit">Lưu</Button>
                        <Button className="button-danger" danger onClick={onCancel}>Hủy</Button>
                    </Col>
                </Row>
                <Form.Item
                    label="Ảnh đại diện"
                    name="me_avatar"
                >
                    <ImgCrop rotationSlider>
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
                <Form.Item
                    label="Mã độc giả"
                    name="me_code"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên độc giả"
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
                    <DatePicker
                        style={{ width: '100%' }}
                        format={'DD/MM/YYYY'}
                        placeholder=""
                        disabledDate={(current) => current > moment().subtract(18, 'year')}
                    />
                </Form.Item>
                <Form.Item
                    label="Giới tính"
                    name="me_sex"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Select
                        allowClear
                        options={GENDER}
                        style={{ width: '100%' }}
                        placeholder=""
                    />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="me_phone"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="me_address"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Thông tin thêm"
                    name="me_more_infor"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ghi chú"
                    name="me_note"
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}