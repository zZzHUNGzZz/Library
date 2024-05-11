import { message } from "antd";
import database from "../firebase";

export interface DocumentInfoDTO {
    do_in_id: string,
    do_id: string | null,
    do_in_dkcb: string | null
    do_in_status: string | null,
    do_in_note: string | null,
}

export const getDocumentInfo = async (searchValue: string) => {
    try {
        const snapshot = await database.ref("documentInfo").once("value");
        const dataObj = snapshot.val();
        const dataArray: DocumentInfoDTO[] = [];

        if (dataObj) {
            Object.keys(dataObj).forEach(key => {
                const documentInfo = dataObj[key];
                if (checkAnyField(documentInfo, searchValue)) {
                    dataArray.push({
                        do_in_id: key,
                        do_id: documentInfo.do_id,
                        do_in_dkcb: documentInfo.do_in_dkcb,
                        do_in_status: documentInfo.do_in_status,
                        do_in_note: documentInfo.do_in_note,
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

const checkAnyField = (documentInfo: DocumentInfoDTO, searchValue: string): boolean => {
    const documentInfoValues = Object.values(documentInfo);
    for (const value of documentInfoValues) {
        if (value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
    }
    return false;
}

export const createDocumentInfo = (data: DocumentInfoDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("documentInfo/").push().set(filteredData, function (error) {
        if (error) {
            console.error("Error create data:", error);
            message.error('Lỗi khi thêm mới dữ liệu!');
        }
    });
}

export const updateDocumentInfo = (do_id: string, data: DocumentInfoDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("documentInfo/" + do_id).set(filteredData, function (error) {
        if (error) {
            console.error("Error update data:", error);
            message.error('Lỗi khi cập nhật dữ liệu!');
        }
    });
}

export const deleteDocumentInfo = (do_id: string[]) => {
    do_id.forEach(do_id => {
        database.ref("documentInfo/" + do_id).remove(function (error) {
            if (error) {
                console.error("Error delete data:", error);
                message.error('Lỗi khi xóa dữ liệu!');
            }
        });
    })
}


