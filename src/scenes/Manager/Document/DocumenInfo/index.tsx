
import { Input, Table } from "antd";
import { useEffect, useState } from "react";
import { createDocumentInfo, getDocumentInfo } from "../../../../stores/DocumentInfoStore";

function DocumentInfo() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [data, setData] = useState<any[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const infoArray = await getDocumentInfo();
                setData(infoArray);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };
        fetchData();
    }, []);
    // const columns = [
    //     {
    //         title: 'ID',
    //         dataIndex: 'id',
    //         key: 'id',
    //     },
    //     {
    //         title: 'Tên',
    //         dataIndex: 'name',
    //         key: 'name',
    //     },
    //     {
    //         title: 'Tuổi',
    //         dataIndex: 'age',
    //         key: 'age',
    //     },
    // ];
    return (
        <>

            <Input value={name}
                onChange={async (e) => await setName(e.target.value)}
            />
            <Input placeholder="Enter your age" value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <button onClick={() => createDocumentInfo(name, age)}>PUSH</button>
            <div className="App">
                <h1>Dữ liệu từ Firebase</h1>
                {/* <Table columns={columns} dataSource={data} /> */}
            </div>

            {/* <Row>
                <Col span={12}>Thông tin tài liệu</Col>
                <Col span={12}>
                    <Button onClick={() => addData('1', "hung", "0348649677")}>Thêm </Button>
                    <Button onClick={readData}>Xuất dữ liệu</Button>
                    <Button>Nhập dữ liệu</Button>
                </Col>
            </Row> */}
            {/* <Table
                columns={columns}
                dataSource={ }
            /> */}
        </>
    );
}

export default DocumentInfo;