import { Col, Form, Input, Modal, Row, Upload, Image, message, Button, Space, Select } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { CalendarOutlined, DownOutlined, LockOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from 'antd';
import UploadAccountImage from "../../storage/UploadAccountImage";
import ImgCrop from 'antd-img-crop';
import { AccountDTO, changePassword, getAccount, getAccountWithNoPassword, updateAccountInfo, } from "../../stores/AccountStore";
import { AccountContext } from "../../components/context/AccountContext";
import { getFileNameFromUrl } from "../../utils/getFileNameFromUrl";
import moment from "moment";
import { DatePicker } from "../../antd";
import { cssResponsive } from "../../components/Manager/Responsive";

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
    const [data, setData] = useState<AccountDTO>();
    const [accountFormRef] = Form.useForm();
    const [accountInfoFormRef] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isUpload, setIsUpload] = useState(false);
    const [isChangeAccountInfo, setIsChangeAccountInfo] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);

    let urlImage: string = '';
    const account = useContext(AccountContext);

    useEffect(() => { fetchData(); }, [data])

    useEffect(() => {
        accountFormRef.setFieldsValue(data);
        accountInfoFormRef.setFieldsValue(data);

        if (!!account.account?.me_avatar) {
            urlImage = account.account?.me_avatar!;
            const fileName = getFileNameFromUrl(urlImage);
            setFileList([{ uid: '-1', name: fileName, status: 'done', url: urlImage }]);
        }
    }, [props.isVisible])

    const fetchData = async () => {
        const data = await getAccountWithNoPassword(account?.account?.username!);
        await setData(data);
    }

    const onAccountFormFinish = async (value: any) => {
        const hasAccount = await getAccount(value.username, value.password);
        if (!!hasAccount) {
            await changePassword(value.username, value.newPassword);
            setIsChangePassword(false);
        } else {
            message.error("Mật khẩu không chính xác!");
        }
    };
    const onAccountFormInfoFinish = async (value: any) => {
        console.log(value.me_sex);
        await updateAccountInfo(account.account?.username!, value);
        setIsChangeAccountInfo(false);
    }

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        await setFileList(newFileList);
        setIsUpload(true);
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
        accountFormRef.resetFields();
        accountInfoFormRef.resetFields();
        setFileList([]);
        setIsChangeAccountInfo(false);
        setIsChangePassword(false);
        props.setVisibleAccountInfo(false)
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên</div>
        </button>
    );

    const onSubmit = () => {
        if (isChangeAccountInfo) {
            accountInfoFormRef.submit();
        }
        if (isChangePassword) {
            accountFormRef.submit();
        }
    }

    const isChangeInfo = isChangeAccountInfo ? 'outlined' : 'borderless';

    return (
        <Modal
            closeIcon={null}
            open={props.isVisible}
            width={'80vw'}
            footer={null}
        >
            <Row gutter={[16, 16]}>
                <Col {...cssResponsive(24, 24, 24, 6, 6, 6)} className="account-info-left-col">
                    <Col {...cssResponsive(12, 12, 12, 24, 24, 24)}>
                        <h3 className="title-h3"><strong>Ảnh đại diện</strong></h3>
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
                    </Col>
                    <Col {...cssResponsive(12, 12, 12, 24, 24, 24)}>
                        <div className="action-account-info-div">
                            <h3 className="title-h3"><strong>Chức năng</strong></h3>
                            <Space wrap>
                                <Button onClick={() => setIsChangeAccountInfo(true)}>Cập nhật thông tin</Button>
                                <Button onClick={() => setIsChangePassword(true)}>Đổi mật khẩu</Button>
                            </Space>
                        </div>
                    </Col>
                </Col>
                <Col {...cssResponsive(24, 24, 24, 18, 18, 18)}>
                    <div className="div-form-data">
                        <Row>
                            <Col {...cssResponsive(24, 24, 11, 11, 11, 11)}>
                                <Form
                                    form={accountInfoFormRef}
                                    labelCol={{ span: 9 }}
                                    wrapperCol={{ span: 15 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onAccountFormInfoFinish}
                                >
                                    <h3 className="title-h3"><strong>Thông tin cá nhân</strong></h3>
                                    <Form.Item
                                        label="Họ và tên"
                                        name="me_name"
                                        rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                                    >
                                        <Input
                                            variant={isChangeInfo}
                                            placeholder="Nhập tên của bạn"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số CCCD"
                                        name="me_identify"
                                        rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                                    >
                                        <Input
                                            variant={isChangeInfo}
                                            placeholder="Nhập số CCCD"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Ngày sinh"
                                        name="me_birthday"
                                    >
                                        <DatePicker
                                            suffixIcon={isChangeAccountInfo && <CalendarOutlined />}
                                            variant={isChangeInfo}
                                            style={{ width: '100%' }}
                                            format={'DD/MM/YYYY'}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Giới tính"
                                        name="me_sex"
                                    >
                                        <Select
                                            suffixIcon={isChangeAccountInfo && <DownOutlined />}
                                            variant={isChangeInfo}
                                            allowClear
                                            options={[
                                                { value: '0', label: 'Nam' },
                                                { value: '1', label: 'Nữ' },
                                                { value: '2', label: 'Khác' },
                                            ]}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Địa chỉ"
                                        name="me_address"
                                    >
                                        <Input variant={isChangeInfo} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="me_phone"
                                    >
                                        <Input variant={isChangeInfo} />
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
                                        <Input
                                            variant={isChangeInfo}
                                            placeholder="Email"
                                        />
                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col {...cssResponsive(0, 0, 2, 2, 2, 2)}></Col>
                            <Col {...cssResponsive(24, 24, 11, 11, 11, 11)}>
                                <Form
                                    form={accountFormRef}
                                    labelCol={{ span: 9 }}
                                    wrapperCol={{ span: 15 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onAccountFormFinish}
                                >
                                    <h3 className="title-h3"><strong>Thông tin tài khoản</strong></h3>
                                    <Form.Item
                                        label="Tên tài khoản"
                                        name="username"
                                    >
                                        <Input
                                            className="font-weight-bold"
                                            disabled
                                            variant="borderless"
                                            placeholder="Tên tài khoản"
                                        />
                                    </Form.Item>
                                    {isChangePassword && <>
                                        <Form.Item
                                            label="Mật khẩu hiện tại"
                                            name="password"
                                            rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                                        >
                                            <Input.Password
                                                placeholder="Mật khẩu hiện tại"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Mật khẩu mới"
                                            name="newPassword"
                                            rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                                        >
                                            <Input.Password
                                                placeholder="Mật khẩu mới"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Xác nhận Mật khẩu"
                                            name="confirm"
                                            dependencies={['newPassword']}
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                    required: true,
                                                    message: 'Vui lòng xác nhận Mật khẩu!',
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('newPassword') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('Mật khẩu mới không trùng khớp!'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password
                                                placeholder="Xác nhận mật khẩu"
                                            />
                                        </Form.Item>
                                    </>}
                                </Form>
                            </Col>
                            <Col span={24} className="align-content-right">
                                <Button className="button-danger" danger onClick={onCancel}>Hủy</Button>
                                <Button type="primary" onClick={onSubmit}>Lưu</Button>
                            </Col>
                        </Row>
                    </div>
                </Col >
            </Row >
        </Modal >
    )
}

export default ModalAccountInfo