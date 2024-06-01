import { message } from "antd";
import { database } from "../firebase";

export interface PublisherDTO {
    pu_id: string,
    pu_short_name: string | null,
    pu_name: string | null,
    pu_address: string | null,
    pu_email: string | null,
    pu_phone: string | null,
    pu_website: string | null,
    pu_infor: string | null,
}

export const getPublisher = async (searchValue: string) => {
    try {
        const snapshot = await database.ref("publisher").once("value");
        const dataObj = snapshot.val();
        const dataArray: PublisherDTO[] = [];

        if (dataObj) {
            Object.keys(dataObj).forEach(key => {
                const publisher = dataObj[key];
                if (checkAnyField(publisher, searchValue)) {
                    dataArray.push({
                        pu_id: key,
                        pu_short_name: publisher.pu_short_name,
                        pu_name: publisher.pu_name,
                        pu_address: publisher.pu_address,
                        pu_email: publisher.pu_email,
                        pu_phone: publisher.pu_phone,
                        pu_infor: publisher.pu_infor,
                        pu_website: publisher.pu_website,
 
                    });
                }
            });
        }
        return dataArray;
    } catch (error) {
        message.error("Lỗi khi lấy dữ liệu!");
        console.error("Error fetching data:", error);
        throw error;
    }
}

const checkAnyField = (publisher: PublisherDTO, searchValue: string): boolean => {
    const publisherValues = Object.values(publisher);
    for (const value of publisherValues) {
        if (value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
    }
    return false;
}

export const createPublisher = (data: PublisherDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("publisher/").push().set(filteredData, function (error) {
        if (error) {
            console.error("Error create data:", error);
            message.error('Lỗi khi thêm mới dữ liệu!');
        }
    });
}

export const updatePublisher = (pu_id: string, data: PublisherDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("publisher/" + pu_id).set(filteredData, function (error) {
        if (error) {
            console.error("Error update data:", error);
            message.error('Lỗi khi cập nhật dữ liệu!');
        }
    });
}

export const deletePublisher = (pu_id: string[]) => {
    pu_id.forEach(pu_id => {
        database.ref("publisher/" + pu_id).remove(function (error) {
            if (error) {
                console.error("Error delete data:", error);
                message.error('Lỗi khi xóa dữ liệu!');
            }
        });
    })
}


