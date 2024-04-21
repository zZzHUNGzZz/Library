import { Button, Col, Form, Input, Row } from "antd"

interface IProps {
    onCancelData: () => void;
}

export const CreateOrUpdateDocument: React.FC<IProps> = ({onCancelData}) => {
    const onCancel = () => onCancelData();  
    
    return (
        <div className="div-form-data">
            <Row style={{ marginBottom: 15 }}>
                <Col span={12}><h3>Thêm thông tin tài liệu</h3></Col>
                <Col span={12} className="align-right">
                    <Button type="primary">Lưu</Button>
                    <Button danger onClick={onCancel}>Hủy</Button>
                </Col>
            </Row>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item label="Tên tài liệu">
                    <Input />
                </Form.Item>
                <Form.Item label="Tác giả">
                    <Input />
                </Form.Item>
                <Form.Item label="Số lượng">
                    <Input />
                </Form.Item>
                <Form.Item label="Năm xuất bản">
                    <Input />
                </Form.Item>
                <Form.Item label="Mã đầu sách">
                    <Input />
                </Form.Item>
                <Form.Item label="Dịch giả">
                    <Input />
                </Form.Item>
                <Form.Item label="Nhà xuất bản">
                    <Input />
                </Form.Item>
                <Form.Item label="Ngôn ngữ">
                    <Input />
                </Form.Item>
                <Form.Item label="Chủ đề">
                    <Input />
                </Form.Item>
                <Form.Item label="Danh mục">
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}