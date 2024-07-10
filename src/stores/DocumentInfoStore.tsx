import { message } from "antd";
import { database } from "../firebase";
import { DocumentDTO, updateTotalBook } from "./DocumentStore";

export interface DocumentInfoDTO {
    do_in_id: string,
    do_id: string | null,
    do_in_dkcb: string | null,
    do_in_title: string | null,
    do_in_status: number | null,
    do_in_note: string | null,
    do_in_me_name: string | null,
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
                        do_in_title: documentInfo.do_in_title,
                        do_in_status: documentInfo.do_in_status,
                        do_in_note: documentInfo.do_in_note,
                        do_in_me_name: documentInfo.do_in_me_name,
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

export const createDocumentInfo = async (do_id: string, document: DocumentDTO) => {
    const do_total_book = Math.max(document.do_total_book || 0, 0);
    let last_dkcb = 'DKCB00000';
    await database.ref("documentInfo/").limitToLast(1).once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().do_in_dkcb) {
                last_dkcb = childSnapshot.val().do_in_dkcb;
            }
        });
    });
    for (let i = 0; i < do_total_book; i++) {
        const next_dkcb = parseInt(last_dkcb.replace('DKCB', ''), 10);
        const documentInfoData: DocumentInfoDTO = {
            do_in_id: '',
            do_id: do_id,
            do_in_dkcb: 'DKCB' + String(next_dkcb + i + 1).padStart(5, '0'),
            do_in_title: document.do_title,
            do_in_status: 1,
            do_in_note: null,
            do_in_me_name: null,
        };

        const newDocumentInfoRef = database.ref("documentInfo/").push();
        documentInfoData.do_in_id = newDocumentInfoRef.key || '';
        newDocumentInfoRef.set(documentInfoData, function (error) {
            if (error) {
                console.error("Error creating data:", error);
                message.error('Lỗi khi thêm mới dữ liệu!');
            }
        });
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

export const updateDocumentInfo = (do_in_id: string, data: DocumentInfoDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("documentInfo/" + do_in_id).set(filteredData, function (error) {
        if (error) {
            console.error("Error update data:", error);
            message.error('Lỗi khi cập nhật dữ liệu!');
        }
    });
}

export const deleteDocumentInfo = async (data: DocumentInfoDTO[]) => {
    data.forEach(async data => {
        await database.ref("documentInfo/" + data.do_in_id).remove(function (error) {
            if (error) {
                console.error("Error delete data:", error);
                message.error('Lỗi khi xóa dữ liệu!');
            }
            else {
                updateTotalBook(data.do_id!, 1);
            }
        });
    })
}



