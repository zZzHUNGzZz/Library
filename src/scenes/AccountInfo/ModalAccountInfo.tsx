import { Col, Form, Input, Modal, Row, Upload, Image, message, Button, Space, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { CalendarOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from 'antd';
import UploadAccountImage from "../../storage/UploadAccountImage";
import ImgCrop from 'antd-img-crop';
import { AccountDTO, changeAccountAvatar, changePassword, getAccount, getAccountWithNoPassword, updateAccountInfo, } from "../../stores/AccountStore";
import { AccountContext } from "../../components/context/AccountContext";
import { getFileNameFromUrl } from "../../utils/getFileNameFromUrl";
import { DatePicker } from "../../antd";
import { cssResponsive } from "../../components/Manager/Responsive";
import { getBase64 } from "../../utils/getBase64";
import { UploadChangeParam } from "antd/es/upload";
import { validateImageSize } from "../../utils/validateImageSize";
import { GENDER } from "../../components/Manager/AppConst";

interface IProps {
    isVisible: boolean
    setVisibleAccountInfo: (isVisible: boolean) => void;
}

const ModalAccountInfo: React.FC<IProps> = (props) => {
    const [data, setData] = useState<AccountDTO>();
    const [isRefreshData, setIsRefreshData] = useState(false);
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

    useEffect(() => { fetchData(); }, [data, isRefreshData])

    useEffect(() => {
        accountFormRef.setFieldsValue(data);
        accountInfoFormRef.setFieldsValue(data);

        if (!!data?.me_avatar) {
            urlImage = data?.me_avatar;
            const fileName = getFileNameFromUrl(urlImage);
            setFileList([{ uid: '-1', name: fileName, status: 'done', url: urlImage }]);
        }
    }, [props.isVisible, isRefreshData])

    const fetchData = async () => {
        const data = await getAccountWithNoPassword(account?.account?.username!);
        await setData(data);
        await account.setAccount(data);
    }

    const onAccountFormFinish = async (value: any) => {
        const hasAccount = await getAccount(value.username, value.password);
        if (!!hasAccount) {
            await changePassword(value.username, value.newPassword);
            onCancel();
        } else {
            message.error("Mật khẩu không chính xác!");
        }
    };

    const onAccountFormInfoFinish = async (value: any) => {
        await updateAccountInfo(account.account?.username!, value);
        onCancel();
    }

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

    const onCancel = () => {
        setIsRefreshData(!isRefreshData);
        setIsUpload(false);
        setIsChangeAccountInfo(false);
        setIsChangePassword(false);
    }

    const onExit = () => {
        props.setVisibleAccountInfo(false)
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên</div>
        </button>
    );

    const onSave = async () => {
        if (isChangeAccountInfo) {
            accountInfoFormRef.submit();
        }
        if (isChangePassword) {
            accountFormRef.submit();
        }
        if (isUpload) {
            if (fileList.length > 0) {
                urlImage = await UploadAccountImage(fileList[0].originFileObj);
            }
            else {
                urlImage = ''
            }
            await changeAccountAvatar(account.account?.username!, urlImage);
            onCancel();
        }
    }

    const isChangeInfo = isChangeAccountInfo ? 'outlined' : 'borderless';

    return (
        <Modal
            closeIcon={null}
            open={props.isVisible}
            width={window.innerWidth < 992 ? '100vw' : '80vw'}
            footer={null}
        >
            <Row gutter={[15, 15]}>
                <Col {...cssResponsive(24, 24, 24, 6, 6, 6)} className="account-info-left-col">
                    <Col {...cssResponsive(0, 0, 0, 24, 24, 24)} className="avatar-account-info-div">
                        <h3 className="title-h3"><strong>Ảnh đại diện</strong></h3>
                        <ImgCrop rotationSlider>
                            <Upload
                                listType="picture-circle"
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
                    </Col>
                    <Col {...cssResponsive(0, 0, 0, 24, 24, 24)} className="action-account-info-div">
                        <h3 className="title-h3"><strong>Chức năng</strong></h3>
                        <Space wrap direction="vertical">
                            <Button type={isChangeAccountInfo ? 'primary' : 'default'} onClick={() => setIsChangeAccountInfo(true)}>Cập nhật thông tin</Button>
                            <Button type={isChangePassword ? 'primary' : 'default'} onClick={() => setIsChangePassword(true)}>Đổi mật khẩu</Button>
                        </Space>
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
                                            disabled={!isChangeAccountInfo}
                                            className={isChangeAccountInfo ? '' : 'disable-text'}
                                            variant={isChangeInfo}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số CCCD"
                                        name="me_identify"
                                        rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                                    >
                                        <Input
                                            disabled={!isChangeAccountInfo}
                                            className={isChangeAccountInfo ? '' : 'disable-text'}
                                            variant={isChangeInfo}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Ngày sinh"
                                        name="me_birthday"
                                    >
                                        <DatePicker
                                            disabled={!isChangeAccountInfo}
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
                                            disabled={!isChangeAccountInfo}
                                            suffixIcon={isChangeAccountInfo && <DownOutlined />}
                                            variant={isChangeInfo}
                                            allowClear
                                            options={GENDER}
                                            style={{ width: '100%' }}
                                            placeholder=""
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Địa chỉ"
                                        name="me_address"
                                    >
                                        <Input
                                            disabled={!isChangeAccountInfo}
                                            className={isChangeAccountInfo ? '' : 'disable-text'}
                                            variant={isChangeInfo}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="me_phone"
                                    >
                                        <Input
                                            disabled={!isChangeAccountInfo}
                                            className={isChangeAccountInfo ? '' : 'disable-text'}
                                            variant={isChangeInfo}
                                        />
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
                                            disabled={!isChangeAccountInfo}
                                            className={isChangeAccountInfo ? '' : 'disable-text'}
                                            variant={isChangeInfo}
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
                                        />
                                    </Form.Item>
                                    {isChangePassword && <>
                                        <Form.Item
                                            label="Mật khẩu hiện tại"
                                            name="password"
                                            rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item
                                            label="Mật khẩu mới"
                                            name="newPassword"
                                            rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                                        >
                                            <Input.Password />
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
                                            <Input.Password />
                                        </Form.Item>
                                    </>}
                                </Form>
                            </Col>
                            <Col span={24} className="align-content-right">
                                {isChangeAccountInfo || isChangePassword || isUpload ?
                                    <>
                                        <Button className="button-danger" type="primary" danger onClick={onCancel}>Hủy</Button>
                                        <Button type="primary" onClick={onSave}>Lưu</Button>
                                    </>
                                    :
                                    <Button className="button-danger" danger onClick={onExit}>Thoát</Button>
                                }
                            </Col>
                        </Row>
                    </div>
                </Col >
            </Row >
        </Modal >
    )
}

export default ModalAccountInfo