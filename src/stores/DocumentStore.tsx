import { message } from "antd";
import { database } from "../firebase";
import { createDocumentInfo } from "./DocumentInfoStore";
export interface DocumentDTO {
    do_id: string,
    do_title: string | null,
    do_author: string | null,
    do_date_available: string | null,
    do_total_book: number | null,
    do_date_publish: string | null,
    do_identifier: string | null,
    do_translator: string | null,
    do_publisher: string | null,
    do_language: string | null,
    do_status: string | null,
}

export const createDocument = (data: DocumentDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    const newDocumentRef = database.ref("document/").push()
    newDocumentRef.set(filteredData, function (error) {
        if (error) {
            console.error("Error create data:", error);
            message.error('Lỗi khi thêm mới dữ liệu!');
        }
        else {
            createDocumentInfo(newDocumentRef.key!, data);
        }
    });
}

export const getDocument = async (searchValue: string) => {
    try {
        const snapshot = await database.ref("document").once("value");
        const dataObj = snapshot.val();
        const dataArray: DocumentDTO[] = [];

        if (dataObj) {
            Object.keys(dataObj).forEach(key => {
                const document = dataObj[key];
                if (checkAnyField(document, searchValue)) {
                    dataArray.push({
                        do_id: key,
                        do_title: document.do_title,
                        do_author: document.do_author,
                        do_date_available: document.do_date_available,
                        do_total_book: document.do_total_book,
                        do_date_publish: document.do_date_publish,
                        do_identifier: document.do_identifier,
                        do_translator: document.do_translator,
                        do_publisher: document.do_publisher,
                        do_status: document.do_status,
                        do_language: document.do_language,
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

const checkAnyField = (document: DocumentDTO, searchValue: string): boolean => {
    const documentValues = Object.values(document);
    for (const value of documentValues) {
        if (value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
    }
    return false;
}



export const updateDocument = (do_id: string, data: DocumentDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    database.ref("document/" + do_id).set(filteredData, function (error) {
        if (error) {
            console.error("Error update data:", error);
            message.error('Lỗi khi cập nhật dữ liệu!');
        }
    });
}

export const deleteDocument = (do_id: string[]) => {
    do_id.forEach(do_id => {
        database.ref("document/" + do_id).remove(function (error) {
            if (error) {
                console.error("Error delete data:", error);
                message.error('Lỗi khi xóa dữ liệu!');
            }
        });
    })
}

export const updateTotalBook = (do_id: string, do_total_book: number) => {
    const docRef = database.ref("document/" + do_id);
    docRef.once('value').then((snapshot) => {
        const currentData = snapshot.val();
        if (currentData && currentData.do_total_book != null) {
            const currentTotalBook = currentData.do_total_book;
            const updatedTotalBook = currentTotalBook - do_total_book;
            docRef.update({ do_total_book: updatedTotalBook }) 
        } else {
            console.error("Error: Invalid data or do_total_book is null.");
            message.error('Dữ liệu không hợp lệ.');
        }
    }).catch((error) => {
        console.error("Error fetching document data:", error);
        message.error('Lỗi khi lấy dữ liệu tài liệu!');
    });
}




