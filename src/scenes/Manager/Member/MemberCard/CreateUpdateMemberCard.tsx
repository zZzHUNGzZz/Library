import { Button, Col, DatePicker, Form, FormProps, Input, InputNumber, Row, Select, message } from "antd"
import { MemberCardDTO, createMemberCard, updateMemberCard } from "../../../../stores/MemberCardStore";
import { useEffect, useState } from "react";
import moment from "moment";
import { SelectedMember } from "../../../../components/Manager/SelectedMember";

interface IProps {
    onCancelData: () => void;
    memberCardSelected: MemberCardDTO | undefined;
    onCreateOrUpdateSuccess: () => void;
}

export const CreateOrUpdateMemberCard: React.FC<IProps> = (props) => {
    const [form] = Form.useForm();
    const [memberOption, setMemberOption] = useState([{}]);

    useEffect(() => {
        const fetchMember = async () => {
            const data = await SelectedMember();
            setMemberOption(data);
        }

        fetchMember();
    }, []);

    const onCancel = () => { props.onCancelData(); }

    useEffect(() => {
        if (!!props.memberCardSelected) {
            form.setFieldsValue(props.memberCardSelected);
        }
        else {
            form.resetFields();
        }
    })

    const onCreateOrUpdateData = async (value: MemberCardDTO) => {
        console.log(value);
        
        if (!!props.memberCardSelected) {
            await updateMemberCard(props.memberCardSelected.me_ca_id, value);
            message.success("Cập nhật dữ liệu thành công!");
        }
        else {
            await createMemberCard(value);
            message.success("Thêm mới dữ liệu thành công!");
        }
        props.onCreateOrUpdateSuccess();
    }
    const onFinish: FormProps<MemberCardDTO>['onFinish'] = (values) => {
        onCreateOrUpdateData(values)
    };

    return (
        <div className="div-form-data">
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ rememberCard: true }}
                onFinish={onFinish}
            >
                <Row style={{ marginBottom: 15 }}>
                    <Col span={12}><h3>{!!props.memberCardSelected ? 'Sửa thẻ độc giả' : 'Thêm thẻ độc giả'}</h3></Col>
                    <Col span={12} className="align-content-right">
                        <Button type="primary" htmlType="submit">Lưu</Button>
                        <Button className="button-danger" danger onClick={onCancel}>Hủy</Button>
                    </Col>
                </Row>
                <Form.Item
                    label="Tên độc giả"
                    name="me_id"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Select
                        style={{ width: '100%' }}
                        allowClear
                        options={memberOption}
                    />
                </Form.Item>
                <Form.Item
                    label="Thời gian có hiệu lực"
                    name="me_ca_start_valid"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        format={'DD/MM/YYYY'}
                        placeholder=""
                        disabledDate={(current) => current < moment().subtract(1, 'day')}
                    />
                </Form.Item>
                <Form.Item
                    label="Thời gian hết hiệu lực"
                    name="me_ca_end_valid"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        format={'DD/MM/YYYY'}
                        placeholder=""
                        disabledDate={(current) => current < moment().subtract(1, 'day')}
                    />
                </Form.Item>
                <Form.Item
                    label="Thời gian nhận thẻ"
                    name="me_ca_get_card"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        format={'DD/MM/YYYY'}
                        placeholder=""
                        disabledDate={(current) => current < moment().add(6, 'day')}
                    />
                </Form.Item>


                {/* <Form.Item
                    label="Số tiền"
                    name="me_ca_money"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <InputNumber style={{ width: '100%' }} min={0} />
                </Form.Item> */}
            </Form>
        </div>
    )
}